package com.project.project.entities.news.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.entities.news.News;
import com.project.project.entities.news.api.dto.NewsMapper;
import com.project.project.entities.news.api.dto.ResponseNewsDto;
import com.project.project.entities.news.api.dto.View;
import com.project.project.entities.news.service.NewsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/v1/news")
@RequiredArgsConstructor
public class NewsController {
    private final NewsServiceImpl newsService;

    @GetMapping("/filter")
    @JsonView(View.Admin.class)
    public ResponseEntity<List<ResponseNewsDto>> findAllFiltered(@RequestParam(defaultValue = "0") int startPage,
                                                                 @RequestParam(defaultValue = "10") int perPage,
                                                                 @RequestParam(defaultValue = "id") String sortBy,
                                                                 @RequestParam(defaultValue = "asc") String sortDirection) {
        log.info("Trying to get all news with parameters");
        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        Pageable pageable = PageRequest.of(startPage, perPage, Sort.by(direction, sortBy));

        List<ResponseNewsDto> news = newsService.findAllFiltered(pageable).stream()
                .map(NewsMapper.INSTANCE::newsToNewsDto).toList();
        if (news.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(news);
        }
    }

    @GetMapping("/{id}")
    @JsonView(View.Admin.class)
    public ResponseEntity<ResponseNewsDto> getNewsById(@PathVariable long id) {
        log.info("Trying to get news by id: {}", id);

        News news = newsService.getNewsById(id);

        ResponseNewsDto responseNewsDto = NewsMapper.INSTANCE.newsToNewsDto(news);

        return ResponseEntity.ok(responseNewsDto);
    }

}