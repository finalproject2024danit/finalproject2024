package com.project.project.entities.user.api.dto;

import com.project.project.entities.user.User;
import com.project.project.entities.user.model.AddUserModel;
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

    @Mapping(source = "id", target = "id")
    @Mapping(source = "firstName", target = "firstName")
    @Mapping(source = "lastName", target = "lastName")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "gender", target = "gender")
    @Mapping(source = "dateOfBirth", target = "dateOfBirth")
    @Mapping(source = "avatar", target = "avatar")
    @Mapping(source = "phones", target = "phones")
    @Mapping(source = "workplace.name", target = "workplace")
    @Mapping(source = "residence.planet", target = "residence.planet")
    @Mapping(source = "residence.country", target = "residence.country")
    @Mapping(source = "residence.city", target = "residence.city")
    @Mapping(source = "hobby.language", target = "hobby.language")
    @Mapping(source = "hobby.pet", target = "hobby.pet")
    @Mapping(source = "hobby.interest", target = "hobby.interest")
    @Mapping(source = "photoData", target = "photoData")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
    ResponseUserAllDataDto userToUserAllDataDto(User user);


    @Mapping(source = "firstName", target = "firstName")
    @Mapping(source = "lastName", target = "lastName")
    @Mapping(source = "email", target = "email")
    @Mapping(source = "password", target = "password")
    @Mapping(source = "gender", target = "gender")
    @Mapping(source = "dateOfBirth", target = "dateOfBirth")
    @Mapping(source = "avatar", target = "avatar")
    @Mapping(source = "phones", target = "phones")
    @Mapping(source = "photoData", target = "photoData")
    User registationDtoTOUser(AddUserModel addUserModel);

}
