package com.delivery.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.delivery.api.domain.entities.User;
import com.delivery.api.repositories.UserRepository;
import com.delivery.api.services.exceptions.DatabaseException;
import com.delivery.api.services.exceptions.ResourceNotFoundException;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  public List<User> findAll() {
    return userRepository.findAll();
  }

  public User findById(Long id) {
    Optional<User> obj = userRepository.findById(id);
    return obj.orElseThrow(() -> new ResourceNotFoundException(id));
  }

  public User create(User obj) {
    return userRepository.save(obj);
  }

  public void delete(Long id) {
    try {
      userRepository.deleteById(id);
    } catch (EmptyResultDataAccessException e) {
      throw new ResourceNotFoundException(id);
    } catch (DataIntegrityViolationException e) {
      throw new DatabaseException(e.getMessage());
    }
  }

  public User update(Long id, User obj) {
    try {
      User entity = userRepository.getReferenceById(id);
      updateData(entity, obj);
      return userRepository.save(entity);
    } catch (EntityNotFoundException e) {
      throw new ResourceNotFoundException(id);
    }
  }

  private void updateData(User entity, User obj) {
    entity.setName(obj.getName());
    entity.setEmail(obj.getEmail());
    entity.setPhone(obj.getPhone());
  }

  public User findByEmail(String email) {
    Optional<User> obj = userRepository.findByEmail(email);
    return obj.orElseThrow(() -> new ResourceNotFoundException("User not found!"));
  }

}
