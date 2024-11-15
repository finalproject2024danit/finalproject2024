package com.project.project.entities.message.api.dto;

import com.project.project.entities.message.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

@Mapper()
public interface MessageMapper {
    MessageMapper INSTANCE = Mappers.getMapper(MessageMapper.class);

    @Mapping(source = "userFrom.id", target = "userFromId")
    @Mapping(source = "content", target = "content")
    ResponseMessageDto messageToResponseMessageDto(Message message);

    @Mapping(source = "content", target = "content")
    Message requestMessageDtoToMessage(RequestMessageDto requestMessageDto);

    @Mapping(source = "userFrom.id", target = "userFromId")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "messageTime", target = "messageTime")
    ResponseMessageForConversationDto messageToResponseMessageForConversationDto(Message message);

    default ResponseConversationDto messagesToResponseConversationDto(Long user1Id, Long user2Id, List<Message> messages) {
        List<ResponseMessageForConversationDto> responseMessageForConversationsDto = messages.stream()
                .map(INSTANCE::messageToResponseMessageForConversationDto)
                .collect(Collectors.toList());

        return new ResponseConversationDto(user1Id, user2Id, responseMessageForConversationsDto);
    }
}
