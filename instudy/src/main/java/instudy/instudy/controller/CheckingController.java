package instudy.instudy.controller;

import instudy.instudy.domain.*;
import instudy.instudy.service.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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
    public String createChecking(@RequestBody Map<String, String> paramMap) {
        String userId = paramMap.get("userId");
        Long groupId = Long.parseLong(paramMap.get("groupId"));
        String content = paramMap.get("content");
        Checking newChecking = new Checking(userId, groupId, content);

        newChecking.setGoodNum(0); // 커밋용!!
        newChecking.setBadNum(0);

        System.out.println(newChecking.toString());
        checkingService.create(newChecking);
        return "create";
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

    // 공부 인증의 마지막 : 인정이 될 수도 있고 인정아 안될 수도 있다 -> 내 화면에서 인정 됐는지 안됐는지
    // 과반수 이상이면 인정
    // 반환 값은 String : 성공시 grass, 안됐을시 not리턴
    @RequestMapping(value = "/checking/update/grass", method = RequestMethod.POST)
    public String updateCheckingGrass(@RequestBody Map<String, String> paramMap) {
        String inputPeriod = paramMap.get("period");
        String userId = paramMap.get("userId");
        Long groupId = Long.parseLong(paramMap.get("groupId"));
        Long checkingId = Long.parseLong(paramMap.get("checkingId"));
        Checking checking = checkingService.findByCheckingId(checkingId);
        return checkingService.updateGrass(checking, userId, groupId, inputPeriod);
    }


}
