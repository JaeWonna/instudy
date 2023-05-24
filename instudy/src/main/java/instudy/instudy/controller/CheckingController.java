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
        Optional<Checking> deleteCheck = checkingService.findByCheckId(checkId);
        checkingService.delete(deleteCheck);
        return "delete";
    }

    // 그룹 안에서 전체 Check 읽기
    @RequestMapping(value = "/checking/read", method = RequestMethod.POST)
    public List<Checking> readChecking(@RequestBody Map<String, String> paramMap) {
        Long groupId = Long.parseLong(paramMap.get("groupId"));
        System.out.println(checkingService.findByGroupId(groupId));
        return checkingService.findByGroupId(groupId);
    }

    // 전체 Check중 개인 Check보기
    @RequestMapping(value = "/checking/read/{checkingId}", method = RequestMethod.POST)
    public Optional<Checking> readMyChecking(@RequestBody Map<String, String> paramMap, @PathVariable("checkingId") Long checkId) {
        Optional<Checking> check = checkingService.findByCheckId(checkId);
        return check;
    }

    // 그룹원 읽기
    @RequestMapping(value = "/checking/read/{checkingId}/groupUser", method = RequestMethod.POST)
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
    @RequestMapping(value = "/checking/read/{checkingId}/todo", method = RequestMethod.POST)
    public List<Todo> readMyCheckingTodo(@RequestBody Map<String, String> paramMap) {
        String userId = paramMap.get("userId");
        System.out.println("현재 사용자의 아이디는?! userId = " + userId);
        List<Todo> myTodos = userService.findOne(userId).getTodos();
        return myTodos;
    }

    // 과반수 이상이 인정하면 공부한날로 생각함 작성중
//    @RequestMapping(value = "/check/read/{checkId}/agree", method = RequestMethod.POST)
//    public Check agreeStudy(@RequestBody Map<String, String> paramMap) {
//        Long checkId = Long.parseLong(paramMap.get("checkId"));
//        Boolean isStudy = Boolean.parseBoolean(paramMap.get("isStudy"));
//        String userId = paramMap.get("userId");
//        Optional<Check> check = checkService.findByCheckId(checkId);
//        return checkService.agreeStudy(check, isStudy, userId).orElse(null);
//    }

}
