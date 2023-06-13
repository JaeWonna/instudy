package instudy.instudy.controller;

import instudy.instudy.domain.CheckingComment;
import instudy.instudy.service.CheckingCommentService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Map;

public class CheckingCommentController {

    private final CheckingCommentService checkingCommentService;

    public CheckingCommentController(CheckingCommentService checkingCommentService) {
        this.checkingCommentService = checkingCommentService;
    }

    // 댓글 생성
    @RequestMapping(value = "/checkingComment/create", method = RequestMethod.POST)
    public String createCheckingComment(@RequestBody Map<String, String> paramMap) {
        Long checkingId = Long.parseLong(paramMap.get("checkingId"));
        String userId = paramMap.get("userId");
        String comment = paramMap.get("comment");
        return checkingCommentService.create(userId, checkingId, comment);
    }

    // 댓글 삭제
    @RequestMapping(value = "/checkingComment/delete", method = RequestMethod.POST)
    public String deleteCheckingComment(@RequestBody Map<String, String> paramMap) {
        Long checkingCommentId = Long.parseLong(paramMap.get("checkingCommentId"));
        return checkingCommentService.delete(checkingCommentId);
    }

    // 댓글 읽어오기
    @RequestMapping(value = "/checkingComment/read", method = RequestMethod.POST)
    public List<CheckingComment> readCheckingComment(@RequestBody Map<String, String> paramMap) {
        Long checkingId = Long.parseLong(paramMap.get("checkingId"));
        return checkingCommentService.read(checkingId);
    }
}
