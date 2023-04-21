package instudy.instudy.controller;

import instudy.instudy.domain.Todo;
import instudy.instudy.domain.User;
import instudy.instudy.service.TodoService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @RequestMapping(value = "/todo", method = RequestMethod.POST)
    public boolean postCreateForm(@RequestBody Map<String, String> paramMap) {

        System.out.println(paramMap);

        String todo_text = paramMap.get("todo_text");
        String status = paramMap.get("status");

        Todo newTodo = new Todo(todo_text, status);

        return todoService.join(newTodo);    //정상적으로 저장되면 true return 합니다!!

    }
}

//커밋 !!!