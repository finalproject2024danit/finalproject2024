package com.project.project.entities.news.api.dto;

import com.project.project.entities.news.News;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class NewsMapperTest {

    private News news;

    @BeforeEach
    public void setUp() {
        news = new News();
        news.setId(1L);
        news.setName("Test News");
        news.setText("Test news content");
        news.setPhoto("Test photo");
        news.setCreatedDate(LocalDateTime.of(2024, 12, 22, 10, 0, 0));
        news.setLastModifiedDate(LocalDateTime.of(2024, 12, 22, 10, 0, 0));
    }

    @Test
    public void testNewsToNewsDto() {
        ResponseNewsDto dto = NewsMapper.INSTANCE.newsToNewsDto(news);

        assertNotNull(dto);
        assertEquals(1L, dto.getId());
        assertEquals("Test News", dto.getName());
        assertEquals("Test news content", dto.getText());
        assertEquals("Test photo", dto.getPhoto());
        assertEquals(LocalDateTime.of(2024, 12, 22, 10, 0, 0), dto.getCreatedDate());
        assertEquals(LocalDateTime.of(2024, 12, 22, 10, 0, 0), dto.getLastModifiedDate());
    }
}
