package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.demo.repository.PosterRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.repoModels.RepoPoster;
import com.example.demo.repository.repoModels.RepoUser;
import com.example.demo.repository.repoModels.RepoRole;
import java.util.Arrays;
import java.util.Set;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.demo.repository")
@EntityScan("com.example.demo.repository.repoModels") // <- include all your entity packages
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, RoleRepository roleRepository, PosterRepository posterRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("admin@enjoytransport.com").isEmpty()) {
                RepoRole adminRole = roleRepository.findByName("ADMIN")
                        .orElseThrow(() -> new IllegalStateException("ADMIN role not found"));
                RepoUser adminUser = new RepoUser();
                adminUser.setEmail("admin@enjoytransport.com");
                adminUser.setPassword(passwordEncoder.encode("password123"));
                adminUser.setName("Admin");
                adminUser.setUsername("admin");
                adminUser.setRoles(Set.of(adminRole));
                userRepository.save(adminUser);
            }

            if (posterRepository.count() == 0) {
                RepoPoster poster1 = RepoPoster.builder()
                        .title("Toyota Hilux 2020")
                        .description("Reliable pickup truck")
                        .fullDescription("A sturdy and reliable Toyota Hilux 2020 model, perfect for heavy-duty tasks.")
                        .price("$25,000")
                        .type("For Sale")
                        .category("Heavy Duty")
                        .image("https://example.com/image1.jpg")
                        .images(Arrays.asList("https://example.com/image1.jpg"))
                        .likes(10)
                        .saved(false)
                        .location("Sofia")
                        .phone("+359123456789")
                        .email("seller1@example.com")
                        .build();

                RepoPoster poster2 = RepoPoster.builder()
                        .title("BMW X5 Rental")
                        .description("Luxury SUV for rent")
                        .fullDescription("Experience luxury with this BMW X5 rental, ideal for city trips.")
                        .price("$100/day")
                        .type("For Rent")
                        .category("Commercial")
                        .image("https://example.com/image2.jpg")
                        .images(Arrays.asList("https://example.com/image2.jpg"))
                        .likes(5)
                        .saved(false)
                        .location("Plovdiv")
                        .phone("+359987654321")
                        .email("seller2@example.com")
                        .build();

                RepoPoster poster3 = RepoPoster.builder()
                        .title("Land Plot in Varna")
                        .description("Beautiful land for sale")
                        .fullDescription("Prime location land plot in Varna, perfect for building your dream home.")
                        .price("$50,000")
                        .type("For Sale")
                        .category("Land")
                        .image("https://example.com/image3.jpg")
                        .images(Arrays.asList("https://example.com/image3.jpg"))
                        .likes(8)
                        .saved(false)
                        .location("Varna")
                        .phone("+359555666777")
                        .email("seller3@example.com")
                        .build();

                posterRepository.saveAll(Arrays.asList(poster1, poster2, poster3));
            }
        };
    }
}
