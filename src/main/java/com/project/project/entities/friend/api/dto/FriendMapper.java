package com.project.project.entities.friend.api.dto;

import com.project.project.entities.friend.Friend;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface FriendMapper {
    FriendMapper INSTANCE = Mappers.getMapper(FriendMapper.class);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "userFromId", target = "userFromId")
    @Mapping(source = "userToId", target = "userToId")
    ResponseFriendDto friendToFriendDto(Friend friend);
}
