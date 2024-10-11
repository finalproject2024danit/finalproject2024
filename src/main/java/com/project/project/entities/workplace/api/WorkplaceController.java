package com.project.project.entities.workplace.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.entities.user.api.dto.View;
import com.project.project.entities.workplace.Workplace;
import com.project.project.entities.workplace.api.dto.ResponseWorkplaceDto;
import com.project.project.entities.workplace.api.dto.WorkplaceMapper;
import com.project.project.entities.workplace.model.AddWorkplaceModel;
import com.project.project.entities.workplace.service.WorkplaceServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/api/v1/workplace")
@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://localhost:3001",
}, allowedHeaders = "*")
@RequiredArgsConstructor
public class WorkplaceController {
    private final WorkplaceServiceImpl workplaceService;

    @GetMapping("/{id}")
    @JsonView(View.Admin.class)
    public ResponseEntity<ResponseWorkplaceDto> getWorkplaceById(@PathVariable long id) {
        log.info("Trying to get workplace by id: {}", id);

        Workplace workplace = workplaceService.getWorkplaceById(id);

        ResponseWorkplaceDto responseWorkplaceDto = WorkplaceMapper.INSTANCE.workplaceToResponseWorkplaceDto(workplace);

        return ResponseEntity.ok(responseWorkplaceDto);
    }

    @GetMapping("/create")
    @JsonView(View.Admin.class)
    public ResponseEntity<ResponseWorkplaceDto> addWorkplace(@Valid @RequestBody AddWorkplaceModel addWorkplaceModel) {
        log.info("Trying to add workplace");
        Workplace workplace = new Workplace();
        workplace.setName(addWorkplaceModel.name());

        workplaceService.addWorkplace(workplace);

        ResponseWorkplaceDto responseWorkplaceDto = WorkplaceMapper.INSTANCE.workplaceToResponseWorkplaceDto(workplace);

        return ResponseEntity.ok(responseWorkplaceDto);
    }
}
