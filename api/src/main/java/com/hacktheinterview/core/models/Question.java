package com.hacktheinterview.core.models;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Question {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotNull
	private String name;
	
	@NotNull
	private String content;
	
	@NotNull
	private String correctAnswer;
	
	@NotNull
	private int difficulty;
	
	@OneToMany(mappedBy = "question")
	private List<Choice> choices = new ArrayList<>();
	
	@ManyToMany(mappedBy = "questions")
	private List<User> users = new ArrayList<>();
}
