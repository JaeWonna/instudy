package instudy.instudy.service;

import instudy.instudy.domain.StudyGroup;
import instudy.instudy.domain.User;
import instudy.instudy.repository.GroupRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

//    public boolean userJoinGroup() {
//
//    }
//    public String groupJoin(StudyGroup studyGroup) {
//        //같은 이름의 회원 존재x
//        validateDuplicateGroup(studyGroup);//중복 회원 검증
//        groupRepository.save(studyGroup);
//        return studyGroup.getGroupName();
//    }
//
//    private void validateDuplicateGroup(StudyGroup studyGroup) {
//        groupRepository.findByGroupName(studyGroup.getGroupName())
//                .ifPresent(m -> {
//                    throw new IllegalStateException("이미 존재하는 그룹명입니다.");
//                });
//    }

    public boolean groupJoin(StudyGroup studyGroup) {
        groupRepository.save(studyGroup);
        return true;
    }

    /**
     * 전체 그룹 조회
     */
    public List<StudyGroup> findGroups() {
        return groupRepository.findAll();
    }

    //해당 유저가 포함된 그룹 리스트 조회
    public List<StudyGroup> findUserGroups(String userId) {
        List<StudyGroup> userStudyGroups = new ArrayList<>(); // 빈 리스트를 만들고
        List<StudyGroup> allGroups = groupRepository.findAll(); // 전체 리스트를 찾고

        for (StudyGroup group : allGroups) { // 전체 리스트에서 contains(loginUser)가 있으면 빈 리스트에 추가
            if (group.getMember().contains(userId)) {
                userStudyGroups.add(group);
            }
        }
        return userStudyGroups;
    }

    // 그룹 이름으로 하나 찾기 !!
    public StudyGroup findOne(String groupName) {
        return groupRepository.findByGroupName(groupName)
                .orElse(null);
    }

    public StudyGroup findByGroupId(Long groupId) {
        return groupRepository.findByGroupId(groupId);
    }
    


    // 그룹 검색
    public List<StudyGroup> search(String groupName) {
        List<StudyGroup> searchList = groupRepository.findByGroupNameContaining(groupName);
        return searchList;
    }

    // 스터디 그룹 검색




}
