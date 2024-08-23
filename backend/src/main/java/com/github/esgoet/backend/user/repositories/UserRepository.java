package com.github.esgoet.backend.user.repositories;

import com.github.esgoet.backend.user.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByGitHubId(String gitHubId);
}
