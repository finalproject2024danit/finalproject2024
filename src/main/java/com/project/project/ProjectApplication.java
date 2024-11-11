package com.project.project;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.sql.SQLException;


@SpringBootApplication
@EnableJpaAuditing
public class ProjectApplication implements ApplicationRunner {

    public static void main(String[] args) {
        SpringApplication.run(ProjectApplication.class, args);
    }

    @Override
    public void run(ApplicationArguments args) throws SQLException {
        System.out.println("http://localhost:9000");
        System.out.println("http://134.209.246.21:9000");
        System.out.println("https://finalproject2024.vercel.app");
        System.out.println("https://finalproject2024-description.vercel.app");
    }
}
