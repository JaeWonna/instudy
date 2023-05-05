package instudy.instudy.service;

import instudy.instudy.domain.Todo;
import instudy.instudy.repository.TodoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }
    public boolean join(Todo newTodo) {
        todoRepository.save(newTodo);
        return true;
    }

    public List<Todo> findAllTodo() {
        return todoRepository.findAll();
    }

    public void deleteTodo(Todo todo) {
        todoRepository.delete(todo);
    }
}
