package com.sysintelli.pdfGenerator.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sysintelli.pdfGenerator.model.PersonalDetails;
@Repository
public interface PersonalDetailsRepository extends JpaRepository<PersonalDetails, Integer>{

}
