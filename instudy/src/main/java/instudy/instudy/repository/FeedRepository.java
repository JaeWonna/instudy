package instudy.instudy.repository;

import instudy.instudy.domain.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Long> {

    List<Feed> findByGroupId(Long groupId);
}
