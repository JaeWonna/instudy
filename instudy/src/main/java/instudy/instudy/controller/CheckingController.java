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
    private final TimerService timerService;
    private final GroupService groupService;
    private final UserService userService;

    public CheckingController(CheckingService checkingService, TodoService todoService, TimerService timerService, GroupService groupService, UserService userService){
        this.checkingService = checkingService;
        this.todoService = todoService;
        this.timerService = timerService;
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

    // 각각의 인증 폼 보고 사용자는 인정을 누를 수 있고 / 인정안함을 누를 수 있다
    // 반환 값은 Checking

    // 공부 인증의 마지막 : 인정이 될 수도 있고 인정아 안될 수도 있다
    // 반환 값은 String

}
