package instudy.instudy.controller;

import instudy.instudy.domain.Feed;
import instudy.instudy.service.CommentService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // 댓글 생성
    @RequestMapping(value = "/comment/create", method = RequestMethod.POST)
    public String createComment(@RequestBody Map<String, String> paramMap) {
        Long feedId = Long.parseLong(paramMap.get("feedId"));
        Long userId = Long.parseLong(paramMap.get("userId"));
        String comment = paramMap.get("comment");
        return commentService.createComment(userId, feedId, comment);
    }

    // 댓글 삭제
    @RequestMapping(value = "/comment/delete", method = RequestMethod.POST)
    public String deleteComment(@RequestBody Map<String, String> paramMap) {
        Long commentId = Long.parseLong(paramMap.get("commentId"));
        return commentService.deleteComment(commentId);
    }
}
