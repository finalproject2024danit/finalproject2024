package com.project.project.entities.group.db;

import com.project.project.entities.group.Group;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class GroupRepositoryTest {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private GroupRepository groupRepository;

    private Group group1;
    private Group group2;

    @BeforeEach
    void setUp() {
        group1 = new Group();
        group1.setName("Test Group 1");
        group1.setIsOpen(true);
        group1.setCreatedDate(LocalDateTime.now());
        group1.setLastModifiedDate(LocalDateTime.now());
        groupRepository.save(group1);

        group2 = new Group();
        group2.setName("Test Group 2");
        group2.setIsOpen(false);
        group2.setCreatedDate(LocalDateTime.now());
        group2.setLastModifiedDate(LocalDateTime.now());
        groupRepository.save(group2);
    }

    @Test
    void findByName() {
        Optional<Group> foundGroup = groupRepository.findByName(group1.getName());

        assertTrue(foundGroup.isPresent());
        assertEquals(group1.getName(), foundGroup.get().getName());
        assertEquals(group1.getIsOpen(), foundGroup.get().getIsOpen());
    }

    @Test
    void findByNameContaining() {
        List<Group> test = groupRepository.findByNameContaining("Test");

        assertNotNull(test);
        assertFalse(test.isEmpty());
        assertTrue(test.stream().anyMatch(group -> group.getName().contains("Test")));
    }

    @Test
    void deleteGroupById() {
        Long groupId = group1.getId();
        assertNotNull(groupId);
        assertTrue(groupRepository.findById(groupId).isPresent());

        groupRepository.deleteById(groupId);

        entityManager.flush();
        entityManager.clear();

        assertFalse(groupRepository.findById(groupId).isPresent());
    }
}
