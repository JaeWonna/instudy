package instudy.instudy.repository;

import instudy.instudy.domain.Comment;
import instudy.instudy.domain.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Comment findByCommentId(Long commentId);

    List<Comment> findByFeedId(Long feedId);
}
