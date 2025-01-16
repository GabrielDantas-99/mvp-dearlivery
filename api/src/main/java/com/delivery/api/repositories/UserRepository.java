package com.delivery.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.delivery.api.entities.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
