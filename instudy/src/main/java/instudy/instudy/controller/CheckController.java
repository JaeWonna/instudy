package instudy.instudy.controller;

import instudy.instudy.domain.*;
import instudy.instudy.repository.CheckRepository;
import instudy.instudy.service.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class CheckController {

    private final CheckService checkService;
    private final TodoService todoService;
    private final TimerService timerService;
    private final GroupService groupService;
    private final UserService userService;

    public CheckController(CheckService checkService, TodoService todoService, TimerService timerService, GroupService groupService, UserService userService){
        this.checkService = checkService;
        this.todoService = todoService;
        this.timerService = timerService;
        this.groupService = groupService;
        this.userService = userService;
    }

    // 이제부터 C,R,U,D 시작
    // create 생 / delete 삭 / read 읽 / update 업

    // 생성
    @RequestMapping(value = "/check/create", method = RequestMethod.POST)
    public String createCheck(@RequestBody Map<String, String> paramMap) {
        String userId = paramMap.get("userId");
        Long groupId = Long.parseLong(paramMap.get("groupId"));
        String content = paramMap.get("content");
        Check newCheck = new Check(userId, groupId, content);
        System.out.println(newCheck.toString());
        checkService.create(newCheck);
        return "create";
    }

    // 삭제
    @RequestMapping(value = "/check/delete", method = RequestMethod.POST)
    public String deleteCheck(@RequestBody Map<String, String> paramMap) {
        Long checkId = Long.parseLong(paramMap.get("checkId"));
        Optional<Check> deleteCheck = checkService.findByCheckId(checkId);
        checkService.delete(deleteCheck);
        return "delete";
    }

    // 그룹 안에서 전체 Check 읽기
    @RequestMapping(value = "/check/read", method = RequestMethod.POST)
    public List<Check> readCheck(@RequestBody Map<String, String> paramMap) {
        Long groupId = Long.parseLong(paramMap.get("groupId"));
        System.out.println(checkService.findByGroupId(groupId));
        return checkService.findByGroupId(groupId);
    }

    // 전체 Check중 개인 Check보기
    @RequestMapping(value = "/check/read/{checkId}", method = RequestMethod.POST)
    public Optional<Check> readMyCheck(@RequestBody Map<String, String> paramMap, @PathVariable("checkId") Long checkId) {
        Optional<Check> check = checkService.findByCheckId(checkId);
        return check;
    }

    // 그룹원 읽기
    @RequestMapping(value = "/check/read/{checkId}/groupUser", method = RequestMethod.POST)
    public List<User> readMyCheckGroupUser(@RequestBody Map<String, String> paramMap) {
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
    @RequestMapping(value = "/check/read/{checkId}/todo", method = RequestMethod.POST)
    public List<Todo> readMyCheckTodo(@RequestBody Map<String, String> paramMap) {
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
