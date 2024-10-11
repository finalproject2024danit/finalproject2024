package com.project.project.entities.workplace.api.dto;

import com.project.project.entities.workplace.Workplace;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper()
public interface WorkplaceMapper {
    WorkplaceMapper INSTANCE = Mappers.getMapper(WorkplaceMapper.class);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "users", target = "users")
    ResponseWorkplaceDto workplaceToResponseWorkplaceDto(Workplace workplace);

    @Mapping(source = "id", target = "id")
    Workplace requestWorkplaceDtoToWorkplace(RequestWorkplaceDto requestWorkplaceDto);
}
