package instudy.instudy.service;

import instudy.instudy.domain.Checking;
import instudy.instudy.domain.StudyGroup;
import instudy.instudy.repository.CheckingRepository;
import instudy.instudy.repository.GroupRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CheckingService {

    private final CheckingRepository checkingRepository;
    private final GroupRepository groupRepository;

    public CheckingService(CheckingRepository checkingRepository, GroupRepository groupRepository) {
        this.checkingRepository = checkingRepository;
        this.groupRepository = groupRepository;
    }

    public void create(Checking newChecking) {
        checkingRepository.save(newChecking);
    }

    public void delete(Checking checking) {
        checkingRepository.delete(checking);
    }

    public Checking findByCheckingId(Long checkingId) {
        return checkingRepository.findByCheckingId(checkingId);
    }

    public List<Checking> findByGroupId(Long groupId) {
        return checkingRepository.findByGroupId(groupId);
    }

    public Checking updateClick(Checking checking, String userId, Boolean good, Boolean bad, String userComment) {

        Boolean flag = true;
        Boolean finish = false;

        if(good == true && finish == false) { // 해당 사용자는 인정하였고 체킹 그룹 리스트에 추가한다 & 댓글도 저장
            List<String> checkUser = checking.getCheckUser();
            checkUser.add(userId);
            checking.setCheckUser(checkUser);

            List<String> comment = checking.getComment();
            comment.add(userComment);
            checking.setComment(comment);

            int goodNum = checking.getGoodNum();
            goodNum += 1;
            checking.setGoodNum(goodNum);

            if (flag == false) {
                int badNum = checking.getBadNum();
                badNum -= 1;
                checking.setBadNum(badNum);
                flag = true;
            }

            finish = true;
            checkingRepository.save(checking);
        }

        if(bad == true && finish == false) { // 체킹 그룹 리스트에 추가하지 않는다, 그럼 사용자를 리스트에 저장안함, 왜 인정 안했는지 댓글 저장
            List<String> comment = checking.getComment();
            comment.add(userComment);
            checking.setComment(comment);

            int badNum = checking.getBadNum();
            badNum += 1;
            checking.setBadNum(badNum);
            flag = false;

            checkingRepository.save(checking);
        }
        return checking;
    }

    public String updateGrass(Checking checking, String userId, Long groupId, String inputPeriod) {

        StudyGroup studyGroup = groupRepository.findByGroupId(groupId);
        List<String> member = studyGroup.getMember();
        int size = member.size();

        int goodNum = checking.getGoodNum();

        double percentage = (double) goodNum / size;

        if(percentage >= 0.5) {
            List<String> period = checking.getPeriod();
            period.add(inputPeriod);
            checking.setPeriod(period);
            checkingRepository.save(checking);
            return "grass";
        } else {
            return "not";
        }

    }
}
