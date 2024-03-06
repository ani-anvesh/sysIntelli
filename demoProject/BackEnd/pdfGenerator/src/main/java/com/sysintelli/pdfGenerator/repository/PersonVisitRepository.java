package com.sysintelli.pdfGenerator.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sysintelli.pdfGenerator.model.PersonVisit;
@Repository
public interface PersonVisitRepository extends JpaRepository<PersonVisit, Integer> {
    @Query("SELECT pv.receiptId, pv.visitAddress, pv.proName, pv.proQty, pv.proRate, pv.proConsession, pv.refName, pv.refQty, pv.refRate, pv.refConsession, pv.timeStamp FROM PersonVisit pv WHERE pv.personalDetails.personId = :personId AND pv.vistId = :vistId")
    List<Object[]> findDetailsByPersonIdAndVisitId(@Param("personId") Integer personId, @Param("vistId") Integer vistId);
}