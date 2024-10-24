package com.project.project.entities.post.api.dto;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper()
public interface PostMapper {
    PostMapper INSTANCE = Mappers.getMapper(PostMapper.class);

//    @Mapping(source = "email", target = "email")
//    @Mapping(source = "password", target = "password")
//    User userDtoToUser(RequestPostDto requestCustomerDto);
//
//    @Mapping(source = "id", target = "id")
//    @Mapping(source = "firstName", target = "firstName")
//    @Mapping(source = "lastName", target = "lastName")
//    @Mapping(source = "email", target = "email")
//    @Mapping(source = "gender", target = "gender")
//    @Mapping(source = "dateOfBirth", target = "dateOfBirth")
//    @Mapping(source = "avatar", target = "avatar")
//    @Mapping(source = "phones", target = "phones")
//    @Mapping(source = "photoData", target = "photoData")
//    @Mapping(source = "createdDate", target = "createdDate")
//    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
//    ResponsePostDto userToUserDto(User user);
}
