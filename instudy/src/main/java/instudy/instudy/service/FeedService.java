package instudy.instudy.service;

import instudy.instudy.repository.FeedRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FeedService {

    private final FeedRepository feedRepository;


    public FeedService(FeedRepository feedRepository) {
        this.feedRepository = feedRepository;
    }
}
