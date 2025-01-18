package com.delivery.api.config;

import static com.delivery.api.entities.enums.OrderStatus.CANCELED;
import static com.delivery.api.entities.enums.OrderStatus.DELIVERED;
import static com.delivery.api.entities.enums.OrderStatus.PAID;
import static com.delivery.api.entities.enums.OrderStatus.SHIPPED;
import static com.delivery.api.entities.enums.OrderStatus.WAITING_PAYMENT;

import java.time.Instant;
import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.delivery.api.entities.domain.Category;
import com.delivery.api.entities.domain.Order;
import com.delivery.api.entities.domain.OrderItem;
import com.delivery.api.entities.domain.Payment;
import com.delivery.api.entities.domain.Product;
import com.delivery.api.entities.domain.User;
import com.delivery.api.repositories.CategoryRepository;
import com.delivery.api.repositories.OrderItemRepository;
import com.delivery.api.repositories.OrderRepository;
import com.delivery.api.repositories.ProductRepository;
import com.delivery.api.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Configuration
@Profile("test")
@RequiredArgsConstructor
public class TestConfig implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {

        Category cat1 = new Category(null, "Redes");
        Category cat2 = new Category(null, "Mantas");
        Category cat3 = new Category(null, "Cama, Mesa e Banho");
        Category cat4 = new Category(null, "Acessórios");

        categoryRepository.saveAll(Arrays.asList(cat1, cat2, cat3, cat4));

        // TODO Auto-generated method stub
        Product p1 = new Product(null, "Rede de Dormir Solteiro", "Rede de algodão 100% com design tradicional",
                "https://m.media-amazon.com/images/I/61yYDknwSkL._AC_UL320_.jpg", 20,
                129.00);
        Product p2 = new Product(null, "Rede de Dormir Casal", "Rede extra-larga para maior conforto",
                "https://m.media-amazon.com/images/I/81g8Gqy+1WL._AC_UL320_.jpg", 15, 189.90);
        Product p3 = new Product(null, "Manta de Algodão", "Manta leve e macia, ideal para climas frios",
                "https://m.media-amazon.com/images/I/71pUdKHKpcL._AC_UL320_.jpg", 30, 89.10);
        Product p4 = new Product(null, "Jogo de Lençóis Queen", "Lençóis 300 fios com fronha e elástico",
                "https://m.media-amazon.com/images/I/51Mh+0H7fzL._AC_UL320_.jpg", 25, 98.00);
        Product p5 = new Product(null, "Toalha de Banho Luxo", "Toalha felpuda de alta absorção",
                "https://m.media-amazon.com/images/I/71jpfivGAlL._AC_UL320_.jpg", 40, 74.90);
        Product p6 = new Product(null, "Toalha de Mesa Retangular", "Toalha decorativa com estampas florais",
                "https://m.media-amazon.com/images/I/81fIOEQu3uL._AC_UL320_.jpg", 18,
                69.00);
        Product p7 = new Product(null, "Extensor de Rede Universal", "Extensor ajustável para qualquer tipo de rede",
                "https://m.media-amazon.com/images/I/51WTGoIipeL._AC_UL320_.jpg",
                50, 45.00);
        Product p8 = new Product(null, "Redutor de Rede Infantil",
                "Redutor para redes, garantindo segurança para crianças",
                "https://m.media-amazon.com/images/I/51OcLQzADOL._AC_UL320_.jpg", 35, 40.00);
        Product p9 = new Product(null, "Cobertor de Microfibra", "Cobertor ultraleve com toque suave",
                "https://m.media-amazon.com/images/I/51pkqKdqjnL._AC_UL320_.jpg", 22, 64.90);
        Product p10 = new Product(null, "Travesseiro Anatômico",
                "Travesseiro com suporte cervical ideal para noites confortáveis",
                "https://m.media-amazon.com/images/I/61T9MO3ik6L._AC_UL320_.jpg", 28, 79.90);
        productRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10));

        p1.getCategories().add(cat1);
        p2.getCategories().add(cat1);
        p3.getCategories().add(cat2);
        p3.getCategories().add(cat4);
        p4.getCategories().add(cat3);
        p5.getCategories().add(cat3);
        p5.getCategories().add(cat4);
        p5.getCategories().add(cat1);
        p5.getCategories().add(cat2);
        p6.getCategories().add(cat3);
        p7.getCategories().add(cat4);
        p7.getCategories().add(cat1);
        p8.getCategories().add(cat4);
        p9.getCategories().add(cat3);
        p9.getCategories().add(cat4);
        p10.getCategories().add(cat3);

        productRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10));

        User u1 = new User(null, "Benedita Malu Clarice da Conceição", "maria@gmail.com", "(91) 99379-7980",
                "186.425.996-50", "123456");
        User u2 = new User(null, "Leonardo Enrico Nelson da Cunha", "alex@gmail.com", "(63) 98484-0855",
                "650.020.239-24",
                "123456");

        Order o1 = new Order(null, Instant.parse("2025-01-06T19:53:17Z"), PAID, u1);
        Order o2 = new Order(null, Instant.parse("2024-12-29T09:53:27Z"), WAITING_PAYMENT, u2);
        Order o3 = new Order(null, Instant.parse("2024-12-29T11:14:37Z"), CANCELED, u2);
        Order o4 = new Order(null, Instant.parse("2024-12-27T10:10:47Z"), DELIVERED, u1);
        Order o5 = new Order(null, Instant.parse("2024-12-27T09:51:57Z"), SHIPPED, u1);

        userRepository.saveAll(Arrays.asList(u1, u2));
        orderRepository.saveAll(Arrays.asList(o1, o2, o3, o4, o5));

        OrderItem oi1 = new OrderItem(o1, p1, 2, p1.getPrice());
        OrderItem oi2 = new OrderItem(o1, p2, 4, p2.getPrice());
        OrderItem oi3 = new OrderItem(o1, p2, 1, p2.getPrice());
        OrderItem oi4 = new OrderItem(o2, p3, 5, p3.getPrice());
        OrderItem oi5 = new OrderItem(o3, p1, 3, p1.getPrice());
        OrderItem oi6 = new OrderItem(o4, p1, 2, p1.getPrice());
        OrderItem oi7 = new OrderItem(o5, p7, 2, p7.getPrice());
        orderItemRepository.saveAll(Arrays.asList(oi1, oi2, oi3, oi4, oi5, oi6, oi7));

        Payment pay1 = new Payment(null, Instant.parse("2025-01-06T20:01:17Z"), o1);
        o1.setPayment(pay1);

        orderRepository.save(o1);
    }

}
