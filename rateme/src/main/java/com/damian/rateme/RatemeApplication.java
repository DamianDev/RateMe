package com.damian.rateme;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.damian.rateme.dao")
//@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
@SpringBootApplication
public class RatemeApplication {



	public static void main(String[] args) {
		SpringApplication.run(RatemeApplication.class, args);
	}
}
