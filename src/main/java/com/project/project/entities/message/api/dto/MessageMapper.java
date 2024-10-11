package com.project.project.entities.message.api.dto;

import com.project.project.entities.message.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper()
public interface MessageMapper {
    MessageMapper INSTANCE = Mappers.getMapper(MessageMapper.class);

    @Mapping(source = "userFrom", target = "userFrom")
    @Mapping(source = "content", target = "content")
    ResponseMessageDto messageToResponseMessageDto(Message message);

    @Mapping(source = "content", target = "content")
    Message requestMessageDtoToMessage(RequestMessageDto requestMessageDto);
}
