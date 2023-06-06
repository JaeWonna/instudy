package instudy.instudy.service;

import instudy.instudy.domain.Comment;
import instudy.instudy.domain.Feed;
import instudy.instudy.repository.CommentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public String createComment(String userId, Long feedId, String comment) {
        Comment createComment = new Comment(userId, feedId, comment);
        commentRepository.save(createComment);
        return "create";
    }

    public String deleteComment(Long commentId) {
        Comment deleteComment = commentRepository.findByCommentId(commentId);
        commentRepository.delete(deleteComment);
        return "delete";
    }

    public List<Comment> findByfeedId(Long feedId) {
        return commentRepository.findByFeedId(feedId);
    }
}
