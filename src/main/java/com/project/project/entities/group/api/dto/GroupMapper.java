package com.project.project.entities.group.api.dto;

import com.project.project.entities.group.Group;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper()
public interface GroupMapper {
    GroupMapper INSTANCE = Mappers.getMapper(GroupMapper.class);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "isOpen", target = "isOpen")
    @Mapping(source = "photo", target = "photo")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
    ResponseGroupDto groupToResponseGroupDTO(Group group);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "isOpen", target = "isOpen")
    @Mapping(source = "photo", target = "photo")
    @Mapping(source = "posts", target = "posts")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
    ResponseGroupFullInfoDto groupToResponseGroupFullInfoDTO(Group group);

    @Mapping(source = "name", target = "name")
    @Mapping(source = "isOpen", target = "isOpen")
    Group requestGroupDtoToGroup(RequestGroupDto requestGroupDto);
}
