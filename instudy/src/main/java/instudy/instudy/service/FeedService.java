package instudy.instudy.service;

import instudy.instudy.domain.Feed;
import instudy.instudy.domain.StudyStatus;
import instudy.instudy.repository.FeedRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FeedService {

    private final FeedRepository feedRepository;
    public FeedService(FeedRepository feedRepository) {
        this.feedRepository = feedRepository;
    }

    public void create(Feed feed) {
        feedRepository.save(feed);
    }

    public void delete(Optional<Feed> feed) {
        feed.ifPresent(feedRepository::delete);
    }

    public List<Feed> findByGroupId(Long groupId) {
        return feedRepository.findByGroupId(groupId);
    }

    public int updateHeartNum(Feed updateFeed, boolean isHeart, String userId) {
//        updateFeed.setHeart(userId.equals(updateFeed.getUserId())); // 하트 누른 유저와 피드 생성한 유저가 같을 때 heart true
        int num = updateFeed.getHeartNum();
        if (isHeart) {
            updateFeed.setHeartNum(num+1);
            // heartUser에 userId 추가
            List<String> heartUser = updateFeed.getHeartUser();
            heartUser.add(userId);
            updateFeed.setHeartUser(heartUser);
            feedRepository.save(updateFeed);
            return num+1;
        } else {
            updateFeed.setHeartNum(num-1);
            // heartUser에 있던 userId 삭제
            List<String> heartUser = updateFeed.getHeartUser();
            heartUser.remove(userId);
            updateFeed.setHeartUser(heartUser);
            feedRepository.save(updateFeed);
            return num-1;
        }
    }
}
