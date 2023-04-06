package instudy.instudy.service;

import instudy.instudy.domain.StudyGroup;
import instudy.instudy.repository.GroupRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Transactional
public class GroupService {

    private final GroupRepository groupRepository;

    public GroupService(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    /**
     * 그룹 가입
     */
    public String groupJoin(StudyGroup studyGroup) {
        //같은 이름의 회원 존재x
        validateDuplicateGroup(studyGroup);//중복 회원 검증
        groupRepository.save(studyGroup);
        return studyGroup.getGroupName();
    }

    private void validateDuplicateGroup(StudyGroup studyGroup) {
        groupRepository.findByGroupName(studyGroup.getGroupName())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 그룹명입니다.");
                });
    }

    /**
     * 전체 그룹 조회
     */
    public List<StudyGroup> findGroups() {
        return groupRepository.findAll();
    }

    public Optional<StudyGroup> findOne(String groupName) {
        return groupRepository.findByGroupName(groupName);
    }



}
