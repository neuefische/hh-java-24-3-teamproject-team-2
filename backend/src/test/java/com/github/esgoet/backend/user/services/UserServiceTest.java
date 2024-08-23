package com.github.esgoet.backend.user.services;


import com.github.esgoet.backend.book.services.IdService;
import com.github.esgoet.backend.user.dto.UserDto;
import com.github.esgoet.backend.user.models.User;
import com.github.esgoet.backend.user.models.UserNotFoundException;
import com.github.esgoet.backend.user.repositories.UserRepository;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {
    private final UserRepository userRepo = mock(UserRepository.class);
    private final IdService idService = mock(IdService.class);
    private final UserService userService = new UserService(userRepo, idService);
    private final LocalDate goalDate = LocalDate.parse("2024-12-31");
    @Test
    void getUsers_Test() {
        List<User> users = List.of(
                new User("1","user1", 6, goalDate, 0,"123", "USER"),
                new User("2","user2", 22, goalDate, 5, "123", "USER")
           );

        List<User> expectedUsers = List.of(
                new User("1","user1", 6, goalDate, 0, "123", "USER"),
                new User("2","user2", 22, goalDate, 5, "123", "USER")
        );

        when(userRepo.findAll()).thenReturn(users);
        List<User> actualUsers = userService.getUsers();

        verify(userRepo).findAll();
        assertEquals(expectedUsers, actualUsers);
    }

    @Test
    void getUsersTest_whenEmpty_thenReturnEmptyList() {
        List<User> expectedUsers = new ArrayList<>();
        List<User> actualUsers = userService.getUsers();

        assertEquals(expectedUsers, actualUsers);
    }

    @Test
    void getUserByIdTest_whenUserExists_thenReturnUser() {
        //GIVEN
        User user = new User("1","user1", 6, goalDate, 0, "123", "USER");
        when(userRepo.findById("1")).thenReturn(Optional.of(user));
        //WHEN
        User actual = userService.getUserById("1");
        //THEN
        User expected = new User("1","user1", 6, goalDate, 0, "123", "USER");
        verify(userRepo).findById("1");
        assertEquals(expected, actual);
    }

    @Test
    void getUserByIdTest_whenUserDoesNotExists_thenThrow() {
        //GIVEN
        when(userRepo.findById("1")).thenReturn(Optional.empty());
        //WHEN
        //THEN
        assertThrows(UserNotFoundException.class, () -> userService.getUserById("1"));
        verify(userRepo).findById("1");
    }

    @Test
    void addUserTest_whenNewUserAsInput_thenReturnNewUser() {
        // GIVEN
        UserDto userDto =  new UserDto("user1", 6, goalDate, 0, "123", "USER");
        User userToSave = new User("1","user1", 6, goalDate, 0, "123", "USER");
        when(idService.randomId()).thenReturn("1");
        when(userRepo.save(userToSave)).thenReturn(userToSave);

        // WHEN
        User actual = userService.saveUser(userDto);

        // THEN
        User expected = new User("1","user1", 6, goalDate, 0, "123", "USER");
        verify(idService).randomId();
        verify(userRepo).save(userToSave);
        assertEquals(expected, actual);
    }

    @Test
    void deleteUserTest() {
        doNothing().when(userRepo).deleteById("1");
        userService.deleteUser("1");
        verify(userRepo).deleteById("1");
    }

    @Test
    void updateUserTest_whenUserExists() {

        // Given
        String id = "1";
        User existingUser = new User("1","user1", 6, goalDate, 0, "123", "USER");
        UserDto updatedUserDto = new UserDto("user1", 6, goalDate, 1, "123", "USER");
        User updatedUser = new User("1","user1", 6, goalDate, 1, "123", "USER");

        // When
        when(userRepo.findById(id)).thenReturn(Optional.of(existingUser));
        when(userRepo.save(updatedUser)).thenReturn(updatedUser);

        User actual = userService.updateUser(id, updatedUserDto);

        // Then
        User expected = new User("1","user1", 6, goalDate, 1,"123", "USER");
        assertNotNull(actual);
        assertEquals(expected, actual);
        verify(userRepo).findById(id);
        verify(userRepo).save(updatedUser);
    }

    @Test
    void updateUserTest_whenUserNotFound() {

        // Given
        String id = "1";
        UserDto updatedUserDto = new UserDto("user1", 6, goalDate, 1,"123", "USER");
        User updatedUser = new User("1","user1", 6, goalDate, 1,"123", "USER");
        //When
        when(userRepo.findById(id)).thenReturn(Optional.empty());

        //Then
        UserNotFoundException thrown = assertThrows(
                UserNotFoundException.class,
                () -> userService.updateUser(id, updatedUserDto)
        );
        assertEquals("No user found with id: " + id, thrown.getMessage());
        verify(userRepo).findById(id);
        verify(userRepo, never()).save(updatedUser);
    }
}