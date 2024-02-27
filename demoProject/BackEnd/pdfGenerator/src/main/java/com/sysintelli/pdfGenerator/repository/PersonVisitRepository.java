package com.sysintelli.pdfGenerator.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sysintelli.pdfGenerator.model.PersonVisit;
@Repository
public interface PersonVisitRepository extends JpaRepository<PersonVisit, Integer> {
    @Query("SELECT pv.proQty FROM PersonVisit pv WHERE pv.personId = :personId AND pv.visitId = :visitId")
    Integer findProQtyByPersonIdAndVisitId(@Param("personId") Integer personId, @Param("visitId") Integer visitId);
    
    
    @Query("SELECT pv.receiptId FROM PersonVisit pv WHERE pv.personId = :personId AND pv.visitId = :visitId")
    Integer findReceiptIdByPersonIdAndVisitId(@Param("personId") Integer personId, @Param("visitId") Integer visitId);
    
    @Query("SELECT pv.visitAddress FROM PersonVisit pv WHERE pv.personId = :personId AND pv.visitId = :visitId")
    String findVisitAddressByPersonIdAndVisitId(@Param("personId") Integer personId, @Param("visitId") Integer visitId);
    
    @Query("SELECT pv.receiptId, pv.visitAddress, pv.product.proName, pv.proQty, pv.proRate, pv.proConsession, pv.refName, pv.refQty, pv.refRate, pv.refConsession, pv.timeStamp FROM PersonVisit pv WHERE pv.personId = :personId AND pv.visitId = :visitId")
    List<Object[]> findDetailsByPersonIdAndVisitId(@Param("personId") Integer personId, @Param("visitId") Integer visitId);
}

