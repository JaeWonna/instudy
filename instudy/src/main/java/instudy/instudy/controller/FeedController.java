package instudy.instudy.controller;

import instudy.instudy.domain.Feed;
import instudy.instudy.repository.FeedRepository;
import instudy.instudy.service.FeedService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class FeedController {

    private final FeedService feedService;
    private final FeedRepository feedRepository;

    public FeedController(FeedService feedService, FeedRepository feedRepository) {
        this.feedService = feedService;
        this.feedRepository = feedRepository;
    }

    //feed 추가
    @RequestMapping(value = "/feed/create", method = RequestMethod.POST)
    public String createFeed(@RequestBody Map<String, String> paramMap) {
        String userId = paramMap.get("userId");
        System.out.println("test userId : " + userId);
        String content = paramMap.get("content");
        System.out.println("test content : " + content);
        Feed newFeed = new Feed(userId, content);
        System.out.println(newFeed.toString());
        feedService.create(newFeed);
        return "create";
    }

    //feed 삭제
    @RequestMapping(value = "/feed/delete", method = RequestMethod.POST)
    public String deleteFeed(@RequestBody Map<String, String> paramMap) {
        Long feedId = Long.parseLong(paramMap.get("feedId"));
        Optional<Feed> deleteFeed = feedRepository.findById(feedId);
        feedService.delete(deleteFeed);
        return "delete";
    }
}
