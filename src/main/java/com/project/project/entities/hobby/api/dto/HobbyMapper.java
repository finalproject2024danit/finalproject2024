package com.project.project.entities.hobby.api.dto;

import com.project.project.entities.hobby.Hobby;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper()
public interface HobbyMapper {
    HobbyMapper INSTANCE = Mappers.getMapper(HobbyMapper.class);

    @Mapping(source = "language", target = "language")
    @Mapping(source = "pet", target = "pet")
    @Mapping(source = "interest", target = "interest")
    Hobby requestHobbyDtoToHobby(RequestHobbyDto requestHobbyDto);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "language", target = "language")
    @Mapping(source = "pet", target = "pet")
    @Mapping(source = "interest", target = "interest")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
    ResponseHobbyDto hobbyToResponseHobbyDto(Hobby hobby);

}
