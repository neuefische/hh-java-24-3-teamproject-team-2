package com.github.esgoet.backend.user.services;

import com.github.esgoet.backend.book.services.IdService;
import com.github.esgoet.backend.user.dto.UserDto;
import com.github.esgoet.backend.user.models.User;
import com.github.esgoet.backend.user.models.UserNotFoundException;
import com.github.esgoet.backend.user.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final IdService idService;

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("No user found with id: " + id));

    }

    public User saveUser(UserDto userDto) {
        User userToSave = new User(idService.randomId(), userDto.userName(), userDto.readingGoal(), userDto.goalDate(), userDto.readBooks(), userDto.gitHubId(), userDto.role());
        return userRepository.save(userToSave);
    }

    public User updateUser(String id, UserDto updatedUser) {
        User user = getUserById(id)
                .withUserName(updatedUser.userName())
                .withGoalDate(updatedUser.goalDate())
                .withReadBooks(updatedUser.readBooks())
                .withReadingGoal(updatedUser.readingGoal());

        return userRepository.save(user);
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public User getUserByGitHubId(String gitHubId) {
        return userRepository.findByGitHubId(gitHubId);
    }
}
