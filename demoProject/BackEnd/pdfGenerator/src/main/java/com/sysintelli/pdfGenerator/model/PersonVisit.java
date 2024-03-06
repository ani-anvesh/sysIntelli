package com.sysintelli.pdfGenerator.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PersonVisit {
	@Id
	private int vistId;
	@ManyToOne
    @JoinColumn(name = "personId", referencedColumnName = "personId")
	private PersonalDetails personalDetails;
	private int receiptId;
	private String visitAddress;
	private String proName;
	private int proQty;
	private int proRate;
	private int proConsession;
	private String refName;
	private int refQty;
	private int refRate;
	private int refConsession;
	private String timeStamp;
}