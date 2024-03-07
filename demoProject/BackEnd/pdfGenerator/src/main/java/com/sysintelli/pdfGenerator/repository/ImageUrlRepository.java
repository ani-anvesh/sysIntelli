package com.sysintelli.pdfGenerator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sysintelli.pdfGenerator.model.ImageUrl;

@Repository
public interface ImageUrlRepository extends JpaRepository<ImageUrl, Integer> {
    @Query("SELECT url FROM ImageUrl i WHERE i.id = :id")
    String findUrlByPersonId(@Param("id") Integer id);
}