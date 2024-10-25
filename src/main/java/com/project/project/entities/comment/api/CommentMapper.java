package com.project.project.entities.comment.api;

import com.project.project.entities.comment.Comment;
import com.project.project.entities.like.Like;
import com.project.project.entities.like.api.dto.LikeMapper;
import com.project.project.entities.like.api.dto.ResponseLikeDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper()
public interface CommentMapper {
    CommentMapper INSTANCE = Mappers.getMapper(CommentMapper.class);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "post.id", target = "postId")
    @Mapping(target = "likes", expression = "java(mapLikes(comment.getLikedByUsers()))")
    @Mapping(source = "userId", target = "userId")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
    ResponseCommentDto commentToResponseCommentDto(Comment comment);

    default Set<ResponseLikeDto> mapLikes(Set<Like> likes) {
        return likes.stream()
                .map(LikeMapper.INSTANCE::likeToResponseLikeDto)
                .collect(Collectors.toSet());
    }
}
