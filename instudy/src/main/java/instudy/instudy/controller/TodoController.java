package instudy.instudy.controller;

import instudy.instudy.domain.StudyStatus;
import instudy.instudy.domain.Todo;
import instudy.instudy.repository.TodoRepository;
import instudy.instudy.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @RequestMapping(value = "/todo", method = RequestMethod.POST)   // todo create
    public boolean postCreateForm(@RequestBody Map<String, String> paramMap) {
        System.out.println(paramMap);
        String todoText = paramMap.get("todoText");
        Todo newTodo = new Todo(todoText, StudyStatus.READY);
        return todoService.join(newTodo);    //정상적으로 저장되면 true return 합니다!!
    }

    @RequestMapping(value = "/todo/read", method = RequestMethod.POST)
    public List<Todo> postReadTodo() {
        List<Todo> allTodo = todoService.findAllTodo();
        return allTodo;
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