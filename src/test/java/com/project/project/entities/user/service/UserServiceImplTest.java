package com.project.project.entities.user.service;

import com.project.project.entities.hobby.service.HobbyServiceImpl;
import com.project.project.entities.residence.service.ResidenceServiceImpl;
import com.project.project.entities.user.api.dto.patch.*;
import com.project.project.entities.workplace.service.WorkplaceService;
import com.project.project.entities.workplace.service.WorkplaceServiceImpl;
import com.project.project.util.Gender;
import org.junit.jupiter.api.Test;
import com.project.project.entities.hobby.Hobby;
import com.project.project.entities.residence.Residence;
import com.project.project.entities.user.User;
import com.project.project.entities.user.db.UserRepository;
import com.project.project.entities.workplace.Workplace;
import com.project.project.exceptions.UserNotFoundException;
import com.project.project.entities.user.status.UserStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private Residence residence;

    @Mock
    private Hobby hobby;

    @Mock
    private Workplace workplace;

    @Mock
    private WorkplaceServiceImpl workplaceService;
    @Mock
    private HobbyServiceImpl hobbyService;
    @Mock
    private ResidenceServiceImpl residenceService;

    @InjectMocks
    private UserServiceImpl userService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setFirstName("Alice");
        user.setLastName("Smith");
        user.setEmail("alice.smith@example.com");
        user.setPassword("password123");
        user.setGender(Gender.FEMALE);
        user.setDateOfBirth(1234567890L);
        user.setAvatar("avatarUrl");
        user.setPhones("123-456-7890");
        user.setPhotoData("photoData");
        user.setEnabled(true);
        user.setCreatedDate(LocalDateTime.now());
        user.setLastModifiedDate(LocalDateTime.now());
        user.setWorkplace(workplace);
        user.setResidence(residence);
        user.setHobby(hobby);
    }

    @Test
    void findAllFiltered() {
        PageRequest pageable = PageRequest.of(0, 10);
        Page<User> page = mock(Page.class);
        when(userRepository.findAll(pageable)).thenReturn(page);

        Page<User> result = userService.findAllFiltered(pageable);

        assertNotNull(result);
        verify(userRepository, times(1)).findAll(pageable);
    }

    @Test
    void getUserById_Success() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User result = userService.getUserById(1L);

        assertNotNull(result);
        assertEquals("Alice", result.getFirstName());
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void getUserById_UserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> userService.getUserById(1L));
        assertEquals(UserStatus.USER_NOT_FOUND.getMessage(), exception.getMessage());
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void addUser() {
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.addUser(user);

        assertNotNull(result);
        assertEquals("Alice", result.getFirstName());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testPatchUserGeneralInformation() throws IllegalAccessException {
        RequestPatchUserGeneralInformationDto patchDto = new RequestPatchUserGeneralInformationDto(
                "Alice", "Johnson", "alice.johnson@example.com", Gender.FEMALE, 1234567890L, "123-456-7890");

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User updatedUser = userService.patchUser(1L, patchDto);

        assertEquals("Alice", updatedUser.getFirstName());
        assertEquals("Johnson", updatedUser.getLastName());
        assertEquals("alice.johnson@example.com", updatedUser.getEmail());
        assertEquals(Gender.FEMALE, updatedUser.getGender());
        assertEquals("123-456-7890", updatedUser.getPhones());
        verify(userRepository).save(updatedUser);
    }

    // the next three tests all fail, because patchUser() does not yet deconstruct complex fields like Hobby, and ignores them
    @Test
    void testPatchUserHobby() throws IllegalAccessException {
        RequestPatchUserHobbyDto patchDto = new RequestPatchUserHobbyDto("English", "Dog", "Reading");

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User updatedUser = userService.patchUser(1L, patchDto);

        assertEquals("English", updatedUser.getHobby().getLanguage());
        assertEquals("Dog", updatedUser.getHobby().getPet());
        assertEquals("Reading", updatedUser.getHobby().getInterest());

        verify(userRepository).save(updatedUser);
    }


    @Test
    void testPatchUserPlaceOfResidence() throws IllegalAccessException {
        RequestPatchUserPlaceOfResidenceDto patchDto = new RequestPatchUserPlaceOfResidenceDto(
                "Earth", "USA", "New York");

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User updatedUser = userService.patchUser(1L, patchDto);

        assertEquals("Earth", updatedUser.getResidence().getPlanet());
        assertEquals("USA", updatedUser.getResidence().getCountry());
        assertEquals("New York", updatedUser.getResidence().getCity());
        verify(userRepository).save(updatedUser);
    }

    @Test
    void testPatchUserWorkplace() throws IllegalAccessException {
        RequestPatchUserWorkplaceDto patchDto = new RequestPatchUserWorkplaceDto("Acme Corp");

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User updatedUser = userService.patchUser(1L, patchDto);

        assertEquals("Acme Corp", updatedUser.getWorkplace().getName());
        verify(userRepository).save(updatedUser);
    }

    @Test
    void searchByFirstName() {
        when(userRepository.searchByFirstName("Alice")).thenReturn(List.of(user));

        List<User> result = userService.searchByFirstName("Alice");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Alice", result.get(0).getFirstName());
        verify(userRepository, times(1)).searchByFirstName("Alice");
    }

    @Test
    void searchByFirstNameAndLastName() {
        when(userRepository.searchByFirstNameAndLastName("Alice", "Smith")).thenReturn(List.of(user));

        List<User> result = userService.searchByFirstNameAndLastName("Alice", "Smith");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Alice", result.get(0).getFirstName());
        assertEquals("Smith", result.get(0).getLastName());
        verify(userRepository, times(1)).searchByFirstNameAndLastName("Alice", "Smith");
    }

    @Test
    void findAllById() {
        when(userRepository.findAllById(List.of(1L))).thenReturn(List.of(user));

        List<User> result = userService.findAllById(List.of(1L));

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(userRepository, times(1)).findAllById(List.of(1L));
    }

    @Test
    void getFriendsByUserId() {
        PageRequest pageable = PageRequest.of(0, 10);
        Page<User> page = mock(Page.class);
        when(userRepository.findFriendsByUserId(1L, pageable)).thenReturn(page);

        Page<User> result = userService.getFriendsByUserId(1L, pageable);

        assertNotNull(result);
        verify(userRepository, times(1)).findFriendsByUserId(1L, pageable);
    }

    @Test
    void getUserByEmail_Success() {
        when(userRepository.findByUserEmail("alice.smith@example.com")).thenReturn(Optional.of(user));

        User result = userService.getUserByEmail("alice.smith@example.com");

        assertNotNull(result);
        assertEquals("alice.smith@example.com", result.getEmail());
        verify(userRepository, times(1)).findByUserEmail("alice.smith@example.com");
    }

    @Test
    void getUserByEmail_UserNotFound() {
        when(userRepository.findByUserEmail("alice.smith@example.com")).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> userService.getUserByEmail("alice.smith@example.com"));
        verify(userRepository, times(1)).findByUserEmail("alice.smith@example.com");
    }

    @Test
    void updateUserResidence() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);
        when(residenceService.getResidenceById(1L)).thenReturn(residence);

        User result = userService.updateUserResidence(1L, 1L);

        assertNotNull(result);
        assertEquals(residence, result.getResidence());
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void updateUserHobbies() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);
        when(hobbyService.getHobbyById(1L)).thenReturn(hobby);

        User result = userService.updateUserHobbies(1L, 1L);

        assertNotNull(result);
        assertEquals(hobby, result.getHobby());
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void updateUserWorkplace() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);
        when(workplaceService.getWorkplaceById(1L)).thenReturn(workplace);

        User result = userService.updateUserWorkplace(1L, 1L);

        assertNotNull(result);
        assertEquals(workplace, result.getWorkplace());
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(user);
    }
}