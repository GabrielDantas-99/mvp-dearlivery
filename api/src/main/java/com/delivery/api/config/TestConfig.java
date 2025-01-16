package com.delivery.api.config;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.delivery.api.entities.domain.Product;
import com.delivery.api.repositories.ProductRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@Profile("test")
@RequiredArgsConstructor
public class TestConfig implements CommandLineRunner {

  private final ProductRepository productRepository;

  @Override
  public void run(String... args) throws Exception {
    // TODO Auto-generated method stub
    Product p1 = new Product(null, "Rede de Dormir Solteiro", "Rede de algodão 100% com design tradicional", null, 20);
    Product p2 = new Product(null, "Rede de Dormir Casal", "Rede extra-larga para maior conforto", null, 15);
    Product p3 = new Product(null, "Manta de Algodão", "Manta leve e macia, ideal para climas frios", null, 30);
    Product p4 = new Product(null, "Jogo de Lençóis Queen", "Lençóis 300 fios com fronha e elástico", null, 25);
    Product p5 = new Product(null, "Toalha de Banho Luxo", "Toalha felpuda de alta absorção", null, 40);
    Product p6 = new Product(null, "Toalha de Mesa Retangular", "Toalha decorativa com estampas florais", null, 18);
    Product p7 = new Product(null, "Extensor de Rede Universal", "Extensor ajustável para qualquer tipo de rede", null,
        50);
    Product p8 = new Product(null, "Redutor de Rede Infantil", "Redutor para redes, garantindo segurança para crianças",
        null, 35);
    Product p9 = new Product(null, "Cobertor de Microfibra", "Cobertor ultraleve com toque suave", null, 22);
    Product p10 = new Product(null, "Travesseiro Anatômico",
        "Travesseiro com suporte cervical ideal para noites confortáveis", null, 28);
    productRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10));
  }

}
