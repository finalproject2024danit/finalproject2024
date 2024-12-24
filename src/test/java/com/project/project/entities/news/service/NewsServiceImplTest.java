package com.project.project.entities.news.service;

import com.project.project.entities.news.News;
import com.project.project.entities.news.db.NewsRepository;
import com.project.project.entities.news.status.NewsStatus;
import com.project.project.exceptions.NewsNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NewsServiceImplTest {

    @Mock
    private NewsRepository newsRepository;

    @InjectMocks
    private NewsServiceImpl newsService;

    private News news;

    @BeforeEach
    public void setUp() {
        news = new News();
        news.setId(1L);
        news.setName("Test News");
        news.setText("Test news content");
        news.setPhoto("Test photo");
        news.setCreatedDate(java.time.LocalDateTime.now());
        news.setLastModifiedDate(java.time.LocalDateTime.now());
    }

    @Test
    public void getNewsById_Success() {
        when(newsRepository.findById(1L)).thenReturn(Optional.of(news));

        News result = newsService.getNewsById(1L);

        assertNotNull(result);
        assertEquals("Test News", result.getName());
        verify(newsRepository, times(1)).findById(1L);
    }

    @Test
    public void getNewsById_NewsNotFound() {
        when(newsRepository.findById(1L)).thenReturn(Optional.empty());

        NewsNotFoundException exception = assertThrows(NewsNotFoundException.class, () -> {
            newsService.getNewsById(1L);
        });

        assertEquals(NewsStatus.NEWS_NOT_FOUND.getMessage(), exception.getMessage());
        verify(newsRepository, times(1)).findById(1L);
    }

    @Test
    public void findAllFiltered_Success() {
        PageRequest pageable = PageRequest.of(0, 2);
        Page<News> newsPage = new PageImpl<>(List.of(news), pageable, 1);
        when(newsRepository.findAll(pageable)).thenReturn(newsPage);

        Page<News> result = newsService.findAllFiltered(pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("Test News", result.getContent().get(0).getName());
        verify(newsRepository, times(1)).findAll(pageable);
    }
}
