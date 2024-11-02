package com.project.project.dto.globalSearch.api;


import com.project.project.dto.globalSearch.GlobalSearch;
import com.project.project.dto.globalSearch.service.GlobalSearchServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/v1/search")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:3001",
}, allowedHeaders = "*")
@RequiredArgsConstructor
public class GlobalSearchController {
    private final GlobalSearchServiceImpl globalSearchService;

    @GetMapping
    public ResponseEntity<List<Object>> searchAll(@RequestParam String keyword) {
        GlobalSearch globalSearch = new GlobalSearch(keyword);
        List<Object> result = globalSearchService.search(globalSearch);
        return ResponseEntity.ok(result);
    }
}