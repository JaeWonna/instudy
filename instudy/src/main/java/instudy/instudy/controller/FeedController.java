package instudy.instudy.controller;

import instudy.instudy.domain.Feed;
import instudy.instudy.domain.StudyStatus;
import instudy.instudy.domain.Todo;
import instudy.instudy.repository.FeedRepository;
import instudy.instudy.service.FeedService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
        Long groupId = Long.parseLong(paramMap.get("groupId"));
        Long imageId = Long.parseLong(paramMap.get("imageId"));
        Feed newFeed = new Feed(userId, content, groupId, imageId);
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

    //그룹에 해당하는 feed 읽어오기
    @RequestMapping(value = "/feed/read", method = RequestMethod.POST)
    public List<Feed> readFeed(@RequestBody Map<String, String> paramMap) {
        Long groupId = Long.parseLong(paramMap.get("groupId"));
        System.out.println(feedService.findByGroupId(groupId));
        return feedService.findByGroupId(groupId);
    }

    // feed 하트 수 업데이트
    @RequestMapping(value = "/feed/update/heartNum", method = RequestMethod.POST)
    public Feed updateFeed(@RequestBody Map<String, String> paramMap) {
        boolean isHeart = Boolean.parseBoolean(paramMap.get("isHeart")); // 하트 눌렀을 때는 true, 하트 삭제했을 떄는 false
        String userId = paramMap.get("userId");
        Long feedId = Long.parseLong(paramMap.get("feedId"));
        Feed updateFeed = feedRepository.findByFeedId(feedId);
        return feedService.updateHeartNum(updateFeed, isHeart, userId);
    }

}
