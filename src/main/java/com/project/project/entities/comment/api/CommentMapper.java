package com.project.project.entities.comment.api;

import com.project.project.entities.comment.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper()
public interface CommentMapper {
    CommentMapper INSTANCE = Mappers.getMapper(CommentMapper.class);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "post.id", target = "postId")
    @Mapping(source = "userId", target = "userId")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "lastModifiedDate", target = "lastModifiedDate")
    ResponseCommentDto commentToResponseCommentDto(Comment comment);
}
