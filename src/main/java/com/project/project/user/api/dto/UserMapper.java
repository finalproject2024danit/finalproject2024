package com.project.project.user.api.dto;

import com.project.project.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper()
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(source = "email", target = "email")
    @Mapping(source = "password", target = "password")
    User userDtoToUser(RequestUserDto requestCustomerDto);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "firstName", target = "firstName")
    @Mapping(source = "lastName", target = "lastName")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "gender", target = "gender")
    @Mapping(source = "dateOfBirth", target = "dateOfBirth")
    @Mapping(source = "avatar", target = "avatar")
    @Mapping(source = "phones", target = "phones")
    @Mapping(source = "photoData", target = "photoData")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
    ResponseUserDto userToUserDto(User user);
}
