package com.example.backend.config;

import com.example.backend.model.Product;
import com.example.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

        private final ProductRepository productRepository;

        public DataInitializer(ProductRepository productRepository) {
                this.productRepository = productRepository;
        }

        @Override
        public void run(String... args) throws Exception {
                if (productRepository.count() == 0) {
                        Product p1 = new Product(
                                        "Classic Cotton T-Shirt",
                                        "Premium weighted cotton tee in charcoal grey. Features a comfortable crew neck and a modern slim fit.",
                                        24.99,
                                        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
                                        150);

                        Product p2 = new Product(
                                        "Raw Denim Jeans",
                                        "Authentic Japanese selvedge denim. These slim-straight jeans will develop a unique character over time.",
                                        129.50,
                                        "https://images.unsplash.com/photo-1542272454315-4c01d7afdf4a?auto=format&fit=crop&q=80&w=800",
                                        45);

                        Product p3 = new Product(
                                        "Minimalist Leather Sneakers",
                                        "Clean aesthetic meeting luxury comfort. Handcrafted in Italy with buttery soft calfskin leather.",
                                        185.00,
                                        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800",
                                        32);

                        Product p4 = new Product(
                                        "Canvas Weekend Bag",
                                        "A versatile companion for short trips. Made from durable water-resistant canvas with brushed brass hardware.",
                                        75.25,
                                        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
                                        68);

                        Product p5 = new Product(
                                        "Polarized Sunglasses",
                                        "Classic wayfarer silhouette with modern polarized lenses. Maximum UVA/UVB protection for daily wear.",
                                        49.99,
                                        "https://images.unsplash.com/photo-1511499767350-a45a1bb9057b?auto=format&fit=crop&q=80&w=800",
                                        110);

                        Product p6 = new Product(
                                        "Stainless Steel Watch",
                                        "Precision automatic movement with a sapphire crystal face. Water-resistant and sophisticated.",
                                        350.00,
                                        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800",
                                        15);

                        productRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5, p6));
                        System.out.println(">> Database seeded with 6 products.");
                }
        }
}
