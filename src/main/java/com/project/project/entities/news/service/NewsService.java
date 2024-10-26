package com.project.project.entities.news.service;

import com.project.project.entities.news.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsService {
    News getNewsById(long id);

    Page<News> findAllFiltered(Pageable pageable);

}
