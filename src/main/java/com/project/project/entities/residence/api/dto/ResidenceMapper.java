package com.project.project.entities.residence.api.dto;

import com.project.project.entities.residence.Residence;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper()
public interface ResidenceMapper {
    ResidenceMapper INSTANCE = Mappers.getMapper(ResidenceMapper.class);

    @Mapping(source = "planet", target = "planet")
    @Mapping(source = "country", target = "country")
    @Mapping(source = "city", target = "city")
    Residence requestResidenceDtoToResidence(RequestResidenceDto requestResidenceDto);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "planet", target = "planet")
    @Mapping(source = "country", target = "country")
    @Mapping(source = "city", target = "city")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
    ResponseResidenceDto residenceToResponseResidenceDto(Residence residence);

}
