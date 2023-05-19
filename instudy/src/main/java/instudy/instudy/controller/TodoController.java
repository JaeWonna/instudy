package instudy.instudy.controller;

import instudy.instudy.domain.StudyStatus;
import instudy.instudy.domain.Todo;
import instudy.instudy.domain.User;
import instudy.instudy.repository.TodoRepository;
import instudy.instudy.service.TodoService;
import instudy.instudy.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class TodoController {

    private final TodoService todoService;
    private final UserService userService;

    public TodoController(TodoService todoService, UserService userService) {
        this.todoService = todoService;
        this.userService = userService;
    }

    // 프론트 부분에서 axios로 받을것 정리
    // 현재 접속 유저 아이디 : userId (manager: props.manager 처럼 매니저 받은것처럼)
    @RequestMapping(value = "/todo", method = RequestMethod.POST)   // todo create
    public boolean postCreateForm(@RequestBody Map<String, String> paramMap) {
        System.out.println(paramMap);
        String todoText = paramMap.get("todoText");
        Todo newTodo = new Todo(todoText, StudyStatus.READY);

        String userId = paramMap.get("userId");
        User user = userService.findOne(userId);
        newTodo.setUser(user); // 생성자 연관관계 메서드 호출 !!

        return todoService.join(newTodo);    //정상적으로 저장되면 true return 합니다!!
    }


//    // 전체 투두 보기
//    @RequestMapping(value = "/todo/read", method = RequestMethod.POST)
//    public List<Todo> postReadTodo() {
//        List<Todo> allTodo = todoService.findAllTodo();
//        return allTodo;
//    }


    // 내 투두 보기
    // 프론트에서 userId값 필요함 // 이부분 진행중
    @RequestMapping(value = "/todo/read", method = RequestMethod.POST)
    public List<Todo> readMyTodo(@RequestBody Map<String, String> paramMap) {
        String userId = paramMap.get("userId");
        System.out.println("현재 사용자의 아이디는?! userId = " + userId);
        List<Todo> myTodos = userService.findOne(userId).getTodos();
        return myTodos;
    }


    @RequestMapping(value = "/todo/delete", method = RequestMethod.POST)
    public String postDeleteTodo(@RequestBody Map<String, String> paramMap) {
        String todoText = paramMap.get("todoText");
        todoService.deleteTodoByTodoText(todoText);
        return "delete";
    }

    @RequestMapping(value = "/todo/updateStatus", method = RequestMethod.POST)
    public StudyStatus postUpdateStatus(@RequestBody Map<String, String> paramMap) {
        String todoText = paramMap.get("todoText");
//        Todo finishTodo = new Todo(todoText, StudyStatus.READY);
        Todo finishTodo = todoService.findByTodoText(todoText);
        todoService.updateStatus(finishTodo);
        return StudyStatus.FINISH;
    }
}