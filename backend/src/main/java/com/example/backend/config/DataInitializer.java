package com.example.backend.config;

import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

        @Bean
        public CommandLineRunner loadData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
                return args -> {
                        if (userRepository.findByUsername("admin").isEmpty()) {
                                User admin = new User("admin", passwordEncoder.encode("admin123"), "ADMIN");
                                userRepository.save(admin);
                        }

                        if (userRepository.findByUsername("user").isEmpty()) {
                                User user = new User("user", passwordEncoder.encode("user123"), "USER");
                                userRepository.save(user);
                        }
                };
        }
}
