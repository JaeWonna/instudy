package instudy.instudy.repository;

import instudy.instudy.domain.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository extends JpaRepository<Feed, Long> {

}
