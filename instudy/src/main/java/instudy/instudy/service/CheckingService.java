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
            checking.setCheckUser(checkUser); // 체크유저 추가후 저장

            List<String> comment = checking.getComment();
            comment.add(userComment);
            checking.setComment(comment); // 코멘트 추가 후 저장

            int goodNum = checking.getGoodNum();
            goodNum += 1;
            checking.setGoodNum(goodNum); // 좋은값 1증가

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


    // 좋아요 눌렀을때 좋아요와 구독 부탁드립니다 ~ !! ^^ + 변경후 무조건 save
    public Checking updateLike(Checking checking, String userId, Boolean good) {

        // 일단 검사후
        List<String> checkUser = checking.getCheckUser();
        List<String> goodUser = checking.getGoodUser();
        List<String> badUser = checking.getBadUser();
        int goodNum = checking.getGoodNum();
        int badNum = checking.getBadNum();

        if(!checkUser.contains(userId)) { // checkUser안에 없을경우
            checkUser.add(userId);
            checking.setCheckUser(checkUser); // 사람추가

            goodNum += 1;
            checking.setGoodNum(goodNum); // 좋아요 한개 추가 갑니다잉~~!

            goodUser.add(userId);
            checking.setGoodUser(goodUser); // 좋아요 누른 당신은 착한사람 ^^

        } else { // 이미 눌렀을 경우 1) 동일한거 눌렀는지 2) 싫어요 눌렀는지

            if(goodUser.contains(userId)) {
                System.out.println("좋아요를 2번 이상 누를 수 없습니다");
            } else{
                goodNum -= 1;
                checking.setGoodNum(goodNum);

                goodUser.remove(userId);
                checking.setGoodUser(goodUser);

                badNum += 1;
                checking.setBadNum(badNum);

                badUser.add(userId);
                checking.setBadUser(badUser);
            }
        }

        checkingRepository.save(checking);
        return checking;
    }


    // 싫어요 눌렀을때 ㅠㅠㅠ
    public Checking updateDislike(Checking checking, String userId, Boolean bad) {

        // 일단 검사후
        List<String> checkUser = checking.getCheckUser();
        List<String> goodUser = checking.getGoodUser();
        List<String> badUser = checking.getBadUser();
        int goodNum = checking.getGoodNum();
        int badNum = checking.getBadNum();

        if(!checkUser.contains(userId)) { // checkUser안에 없을경우
            checkUser.add(userId);
            checking.setCheckUser(checkUser); // 사람추가

            badNum += 1;
            checking.setBadNum(badNum); // 싫어요 한개 추가 갑니다잉~~!

            badUser.add(userId);
            checking.setBadUser(badUser); // 싫어요 누른 당신은 나쁜사람 ㅠ

        } else { // 이미 눌렀을 경우 1) 동일한 시러요 눌렀는지 2) 조아요 눌렀는지

            if(badUser.contains(userId)) {
                System.out.println("싫어요를 2번 이상 누를 수 없습니다");
            } else{
                badNum -= 1;
                checking.setBadNum(badNum);

                badUser.remove(userId);
                checking.setBadUser(badUser);

                goodNum += 1;
                checking.setGoodNum(goodNum);

                goodUser.add(userId);
                checking.setGoodUser(goodUser);
            }
        }

        checkingRepository.save(checking);
        return checking;
    }

    // 댓글 남기기
    public String updateComment(Checking checking, String userId, String message) {

        List<String> comment = checking.getComment();
        comment.add(message);
        checking.setComment(comment);

        List<String> messageUser = checking.getMessageUser();
        messageUser.add(userId);
        checking.setMessageUser(messageUser);

        checkingRepository.save(checking);

        return "comment";
    }
}
