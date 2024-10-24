package com.project.project.entities.like.api.dto;

import com.project.project.entities.like.Like;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper()
public interface LikeMapper {
    LikeMapper INSTANCE = Mappers.getMapper(LikeMapper.class);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "post.id", target = "postId")
    @Mapping(source = "userId", target = "userId")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
    ResponseLikeDto likeToResponseLikeDto(Like like);
}
