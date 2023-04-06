package instudy.instudy.repository;

import instudy.instudy.domain.StudyGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GroupJpaRepository extends JpaRepository<StudyGroup, Long>, GroupRepository {

    Optional<StudyGroup> findByGroupName(String groupName);

}
