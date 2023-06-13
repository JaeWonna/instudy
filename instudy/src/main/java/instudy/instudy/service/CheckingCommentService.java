package instudy.instudy.service;

import instudy.instudy.domain.CheckingComment;
import instudy.instudy.repository.CheckingCommentRepository;

import java.util.List;

public class CheckingCommentService {

    private final CheckingCommentRepository checkingCommentRepository;

    public CheckingCommentService(CheckingCommentRepository checkingCommentRepository) {
        this.checkingCommentRepository = checkingCommentRepository;
    }

    public String create(String userId, Long checkingId, String comment) {
        CheckingComment createComment = new CheckingComment(userId, checkingId, comment);
        checkingCommentRepository.save(createComment);
        return "create";
    }

    public String delete(Long checkingCommentId) {
        CheckingComment deleteComment = checkingCommentRepository.findByCheckingCommentId(checkingCommentId);
        checkingCommentRepository.delete(deleteComment);
        return "delete";
    }

    public List<CheckingComment> read(Long checkingId) {
        return checkingCommentRepository.findByCheckingId(checkingId);
    }
}
