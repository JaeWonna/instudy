package instudy.instudy.controller;

import instudy.instudy.domain.*;
import instudy.instudy.service.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class CheckingController {

    private final CheckingService checkingService;
    private final TodoService todoService;
//    private final TimerService timerService;
    private final GroupService groupService;
    private final UserService userService;

    public CheckingController(CheckingService checkingService, TodoService todoService, GroupService groupService, UserService userService){
        this.checkingService = checkingService;
        this.todoService = todoService;
        this.groupService = groupService;
        this.userService = userService;
    }

    // 이제부터 C,R,U,D 시작
    // create 생 / delete 삭 / read 읽 / update 업

    // 생성
    @RequestMapping(value = "/checking/create", method = RequestMethod.POST)
    public Checking createChecking(@RequestBody Map<String, String> paramMap) {
        String userId = paramMap.get("userId");
        Long groupId = Long.parseLong(paramMap.get("groupId"));
        String content = paramMap.get("content");
        Checking newChecking = new Checking(userId, groupId, content);

        newChecking.setGoodNum(0); // 커밋용!!
        newChecking.setBadNum(0);

        System.out.println(newChecking.toString());
        checkingService.create(newChecking);
        return newChecking;
    }

    // 삭제
    @RequestMapping(value = "/checking/delete", method = RequestMethod.POST)
    public String deleteChecking(@RequestBody Map<String, String> paramMap) {
        Long checkId = Long.parseLong(paramMap.get("checkingId"));
        Checking deleteCheck = checkingService.findByCheckingId(checkId);
        checkingService.delete(deleteCheck);
        return "delete";
    }

    // 그룹 안에서 전체 Check 읽기
    @RequestMapping(value = "/checking/groupRead", method = RequestMethod.POST)
    public List<Checking> readChecking(@RequestBody Map<String, String> paramMap) {
        Long groupId = Long.parseLong(paramMap.get("groupId"));
        System.out.println(checkingService.findByGroupId(groupId));
        return checkingService.findByGroupId(groupId);
    }

    // 전체 Check중 개인 Check보기
    @RequestMapping(value = "/checking/read", method = RequestMethod.POST)
    public Checking readMyChecking(@RequestBody Map<String, String> paramMap) {
        Long checkingId = Long.parseLong(paramMap.get("checkingId"));
        return checkingService.findByCheckingId(checkingId);
    }

    // 그룹원 읽기
    @RequestMapping(value = "/checking/read/groupUser", method = RequestMethod.POST)
    public List<User> readMyCheckingGroupUser(@RequestBody Map<String, String> paramMap) {
        Long groupId = Long.parseLong(paramMap.get("groupId"));
        System.out.println("현재 그룹 아이디는?! groupId = " + groupId);
        StudyGroup studyGroup = groupService.findByGroupId(groupId);
        List<String> member = studyGroup.getMember();
        List<User> users = new ArrayList<>();

        for (String name : member) {
            User findUser = userService.findOne(name);
            users.add(findUser);
        }
        return users;
    }

    // Todo읽기
    @RequestMapping(value = "/checking/read/todo", method = RequestMethod.POST)
    public List<Todo> readMyCheckingTodo(@RequestBody Map<String, String> paramMap) {
        String userId = paramMap.get("userId");
        System.out.println("현재 사용자의 아이디는?! userId = " + userId);
        List<Todo> myTodos = userService.findOne(userId).getTodos();
        return myTodos;
    }

    // 각각의 인증 폼 보고 사용자는 인정을 누를 수 있고 / 인정안함을 누를 수 있다 -> 내가 전체 화면에서 다른사람을 해줌
    // 반환 값은 Checking
    // 댓글도 String 값으로 받을 수 있음
    @RequestMapping(value = "/checking/update/click", method = RequestMethod.POST)
    public Checking updateCheckingClick(@RequestBody Map<String, String> paramMap) {
        Boolean good = Boolean.parseBoolean(paramMap.get("good"));
        Boolean bad = Boolean.parseBoolean(paramMap.get("bad"));
        String userId = paramMap.get("userId");
        Long checkingId = Long.parseLong(paramMap.get("checkingId"));
        String userComment = paramMap.get("comment");
        Checking checking = checkingService.findByCheckingId(checkingId);
        return checkingService.updateClick(checking, userId, good, bad, userComment);
    }

    // 좋아요 눌렀을때 -> 좋아요 후 댓글 남기는 기능은 없음
    @RequestMapping(value = "/checking/update/like", method = RequestMethod.POST)
    public Checking Checkinglike(@RequestBody Map<String, String> paramMap) {
        Boolean good = Boolean.parseBoolean(paramMap.get("good"));
        String userId = paramMap.get("userId");
        Long checkingId = Long.parseLong(paramMap.get("checkingId"));
        Checking checking = checkingService.findByCheckingId(checkingId);
        return checkingService.updateLike(checking, userId, good);
    }


    // 싫어요 눌렀을때 -> 싫어요 후 댓글 남기는 기능은 없음
    @RequestMapping(value = "/checking/update/dislike", method = RequestMethod.POST)
    public Checking CheckingDislike(@RequestBody Map<String, String> paramMap) {
        Boolean bad = Boolean.parseBoolean(paramMap.get("bad"));
        String userId = paramMap.get("userId");
        Long checkingId = Long.parseLong(paramMap.get("checkingId"));
        Checking checking = checkingService.findByCheckingId(checkingId);
        return checkingService.updateDislike(checking, userId, bad);
    }

    // 댓글만 남기기 기능 구현
    @RequestMapping(value = "/checking/update/comment", method = RequestMethod.POST)
    public String CheckingComment(@RequestBody Map<String, String> paramMap) {
        String userId = paramMap.get("userId");
        Long checkingId = Long.parseLong(paramMap.get("checkingId"));
        String message = paramMap.get("message");
        Checking checking = checkingService.findByCheckingId(checkingId);
        return checkingService.updateComment(checking, userId, message);
    }

    // 댓글만 읽기
    @RequestMapping(value = "/checking/comment/read", method = RequestMethod.POST)
    public List<String> CheckingCommentRead(@RequestBody Map<String, String> paramMap) {
        Long checkingId = Long.parseLong(paramMap.get("checkingId"));
        Checking checking = checkingService.findByCheckingId(checkingId);
        return checkingService.readComment(checking);
    }


    // 반환값 double 퍼센트 ex) 0.2 .. 0.4 ..
    @RequestMapping(value = "/checking/percent", method = RequestMethod.POST)
    public double CheckingPercent(@RequestBody Map<String, String> paramMap) {
        Long checkingId = Long.parseLong(paramMap.get("checkingId"));
        Checking checking = checkingService.findByCheckingId(checkingId);
        return checkingService.updatePercent(checking);
    }


}
