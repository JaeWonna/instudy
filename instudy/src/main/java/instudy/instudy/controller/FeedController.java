package instudy.instudy.controller;

import instudy.instudy.domain.Feed;
import instudy.instudy.domain.StudyStatus;
import instudy.instudy.domain.Todo;
import instudy.instudy.service.FeedService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class FeedController {

    private final FeedService feedService;

    public FeedController(FeedService feedService) {
        this.feedService = feedService;
    }

    //feed 추가
    @RequestMapping(value = "/feed/create", method = RequestMethod.POST)
    public String createFeed(@RequestBody Map<String, String> paramMap) {
        String userId = paramMap.get("userId");
        String content = paramMap.get("content");
        Feed newFeed = new Feed(userId, content);
//        Feed newFeed = new Feed("ss", "게시물 내용");
        feedService.create(newFeed);
        return "";
    }
}
