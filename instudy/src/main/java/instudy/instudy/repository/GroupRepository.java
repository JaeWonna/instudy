package instudy.instudy.repository;

import instudy.instudy.domain.StudyGroup;

import java.util.List;
import java.util.Optional;

public interface GroupRepository {

    StudyGroup save(StudyGroup studyGroup);
    Optional<StudyGroup> findByGroupId(Long groupId);

    Optional<StudyGroup> findByGroupName(String groupName);

    Optional<StudyGroup> findByFixedNumber(Long fixedNumber);
    Optional<StudyGroup> findByCurrentNumber(Long currentNumber);

    List<StudyGroup> findAll();
}
