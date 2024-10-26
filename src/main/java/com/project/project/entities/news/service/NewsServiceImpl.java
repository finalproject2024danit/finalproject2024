package com.project.project.entities.news.service;

import com.project.project.entities.news.News;
import com.project.project.entities.news.db.NewsRepository;
import com.project.project.entities.news.status.NewsStatus;
import com.project.project.exceptions.NewsNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService {

    private final NewsRepository newsRepository;


    @Override
    public News getNewsById(long id) {
        return newsRepository.findById(id)
                .orElseThrow(() -> new NewsNotFoundException(NewsStatus.NEWS_NOT_FOUND.getMessage()));
    }

    @Override
    public Page<News> findAllFiltered(Pageable pageable) {
        return newsRepository.findAll(pageable);
    }
}
