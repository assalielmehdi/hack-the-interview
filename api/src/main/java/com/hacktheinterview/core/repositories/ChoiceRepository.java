package com.hacktheinterview.core.repositories;


import com.hacktheinterview.core.models.Choice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "choice", path = "choices")
public interface ChoiceRepository extends JpaRepository<Choice, Long> {
}
