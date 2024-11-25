package com.project.project.entities.workplace.api;

import com.fasterxml.jackson.annotation.JsonView;
import com.project.project.entities.workplace.api.dto.RequestUpdateWorkplaceDto;
import com.project.project.entities.workplace.api.dto.View;
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

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/api/v1/workplace")
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

    @PostMapping("/create")
    @JsonView(View.Admin.class)
    public ResponseEntity<ResponseWorkplaceDto> addWorkplace(@Valid @RequestBody AddWorkplaceModel addWorkplaceModel) {
        log.info("Trying to create new workplace");

        Workplace workplace = workplaceService.addWorkplace(addWorkplaceModel.name());

        ResponseWorkplaceDto responseWorkplaceDto = WorkplaceMapper.INSTANCE.workplaceToResponseWorkplaceDto(workplace);

        return ResponseEntity.ok(responseWorkplaceDto);
    }

    @GetMapping("")
    @JsonView(View.Admin.class)
    public ResponseEntity<List<ResponseWorkplaceDto>> getAllWorkplaces() {
        log.info("Trying to get all workplaces");

        List<Workplace> allWorkplaces = workplaceService.getAllWorkplaces();

        List<ResponseWorkplaceDto> workplacesDto = allWorkplaces.stream()
                .map(WorkplaceMapper.INSTANCE::workplaceToResponseWorkplaceDto)
                .toList();

        return ResponseEntity.ok(workplacesDto);
    }

    @PutMapping("/update")
    @JsonView(View.Admin.class)
    public ResponseEntity<ResponseWorkplaceDto> updateWorkplace(@Valid @RequestBody RequestUpdateWorkplaceDto requestUpdateWorkplaceDto) {
        log.info("Trying to update workplace");

        Workplace workplace = workplaceService.updateWorkplace(requestUpdateWorkplaceDto.getUserId(), requestUpdateWorkplaceDto.getId(), requestUpdateWorkplaceDto.getName());

        ResponseWorkplaceDto responseWorkplaceDto = WorkplaceMapper.INSTANCE.workplaceToResponseWorkplaceDto(workplace);

        return ResponseEntity.ok(responseWorkplaceDto);
    }

}
