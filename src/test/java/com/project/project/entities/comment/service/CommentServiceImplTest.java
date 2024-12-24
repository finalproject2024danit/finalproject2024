package com.project.project.entities.comment.service;

import com.project.project.entities.comment.Comment;
import com.project.project.entities.comment.db.CommentRepository;
import com.project.project.entities.comment.status.CommentStatus;
import com.project.project.entities.like.Like;
import com.project.project.entities.like.db.LikeRepository;
import com.project.project.entities.post.Post;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import com.project.project.exceptions.CommentNotFoundException;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

@ExtendWith(MockitoExtension.class)
class CommentServiceImplTest {
    @Mock
    private CommentRepository commentRepository;

    @Mock
    private LikeRepository likeRepository;

    @InjectMocks
    private CommentServiceImpl commentService;

    private Comment comment;
    private Like like;
    @BeforeEach
    public void setUp() {
        Post post = new Post();
        post.setId(3L);
        comment = new Comment();
        comment.setId(1L);
        comment.setContent("Test Comment");
        comment.setPost(post);
        like = new Like();
        like.setId(1L);
        like.setComment(comment);
        like.setUserId(1L);
    }

    @Test
    public void getCommentById_Success() {
        when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));

        Comment result = commentService.getCommentById(1L);

        assertNotNull(result);
        assertEquals("Test Comment", result.getContent());
        verify(commentRepository, times(1)).findById(1L);
    }

    @Test
    public void getCommentById_CommentNotFound() {
        when(commentRepository.findById(1L)).thenReturn(Optional.empty());

        CommentNotFoundException exception = assertThrows(CommentNotFoundException.class, () -> {
            commentService.getCommentById(1L);
        });

        assertEquals(CommentStatus.COMMENT_NOT_FOUND.getMessage(), exception.getMessage());
        verify(commentRepository, times(1)).findById(1L);
    }

    @Test
    public void createComment() {
        when(commentRepository.save(comment)).thenReturn(comment);

        Comment result = commentService.createComment(comment);

        assertNotNull(result);
        assertEquals("Test Comment", result.getContent());
        verify(commentRepository, times(1)).save(comment);
    }

    @Test
    public void deleteCommentById() {
        doNothing().when(commentRepository).deleteCommentByIdNew(1L);
        when(commentRepository.existsById(1L)).thenReturn(true);

        commentService.deleteCommentById(1L);

        verify(commentRepository, times(1)).deleteCommentByIdNew(1L);
        verify(commentRepository, times(1)).existsById(1L);
    }

    @Test
    public void likeComment_AlreadyLiked() {
        when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));
        when(likeRepository.findByCommentIdAndUserId(1L, 1L)).thenReturn(like);
        doNothing().when(likeRepository).delete(like);

        commentService.likeComment(1L, 1L);

        verify(likeRepository, times(1)).delete(like);
    }

    @Test
    public void likeComment_NotLiked() {
        when(commentRepository.findById(1L)).thenReturn(Optional.of(comment));
        when(likeRepository.findByCommentIdAndUserId(1L, 1L)).thenReturn(null);
        when(likeRepository.save(any(Like.class))).thenReturn(like);

        commentService.likeComment(1L, 1L);

        verify(likeRepository, times(1)).save(any(Like.class));
    }

    @Test
    public void getCommentsByPostId() {
        PageRequest pageable = PageRequest.of(0, 2);
        Page<Comment> commentsPage = new PageImpl<>(List.of(comment), pageable, 1);
        when(commentRepository.findByPostId(1L, pageable)).thenReturn(commentsPage);

        Page<Comment> result = commentService.getCommentsByPostId(1L, pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("Test Comment", result.getContent().get(0).getContent());
        verify(commentRepository, times(1)).findByPostId(1L, pageable);
    }
}