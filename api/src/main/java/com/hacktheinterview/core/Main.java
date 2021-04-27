package com.hacktheinterview.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@ConfigurationPropertiesScan(basePackages = "com.hacktheinterview.core.properties")
public class Main {

  public static void main(String[] args) {
    SpringApplication.run(Main.class, args);
  }

}
