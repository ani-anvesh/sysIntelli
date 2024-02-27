const router = require("express").Router();
const config = require("../../config/auth.config");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const { dbConfig } = require("../../utils/db");

async function fetchUser(email) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);
    const query = `SELECT au.email, au.pass, au.JWTtoken FROM Auth au WHERE au.email = ?`;
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        reject(err);
      } else {
        resolve(results);
      }
      connection.end();
    });
  });
}

async function saveTokentoDB(token, email) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);
    const query = `UPDATE Auth SET JWTtoken = ? WHERE email = ?`;
    connection.query(query, [token, email], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        reject(err);
      } else {
        resolve(results);
      }
      connection.end();
    });
  });
}

async function signin(req, res) {
  try {
    const data = await fetchUser(req.body.email);
    const email = data && data[0] && req.body.email == data[0].email;

    if (!email) {
      return res.status(404).send({ message: "email Not found." });
    }

    const passwordIsValid =
      data && data[0] && data[0].pass && req.body.password == data[0].pass;

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ email: email }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 120,
    });

    req.session.token = token;
    await saveTokentoDB(token, req.body.email);

    return res.status(200).send({
      email: req.body.email,
      Auth: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
}

async function signout(req, res) {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
}

router.post("/login", async (req, res) => {
  try {
    return await signin(req, res);
  } catch (error) {
    console.log(error);
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    return await signout(req, res);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/token", async (req, res) => {
  const { email } = req.query;
  try {
    const data = await fetchUser(email);
    return res.json(data && data[0] && data[0].JWTtoken);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/refreshToken", async (req, res) => {
  const { email } = req.query;
  try {
    const token = jwt.sign({ email: email }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 120,
    });

    req.session.token = token;
    await saveTokentoDB(token, email);

    return res.status(200).send({
      email: email,
      Auth: true,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/clearToken", async (req, res) => {
  const { email } = req.query;
  try {
    await saveTokentoDB("", email);
    req.session.token = null;
    return res.status(200).send({
      state: "logOut",
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
