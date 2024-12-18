package com.project.project.entities.post.api.dto;

import com.project.project.entities.post.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PostMapper {
    PostMapper INSTANCE = Mappers.getMapper(PostMapper.class);

    @Mapping(source = "userId", target = "userId")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "groupId", target = "group.id")
    Post requestPostDtoToPost(RequestPostDto requestPostDto);


    @Mapping(source = "id", target = "id")
    @Mapping(source = "userId", target = "userId")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "group.id", target = "groupId")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
    ResponsePostDto postToPostDto(Post post);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "userId", target = "userId")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "group.id", target = "groupId")
    @Mapping(target = "totalLikes", expression = "java(post.getLikes().size())")
    @Mapping(target = "totalComments", expression = "java(post.getComments().size())")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
    ResponsePostWithLikeCommentsSumDto postToPostWithLikesCommentsSumDto(Post post);

}
