package instudy.instudy.repository;

import instudy.instudy.domain.Todo;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TodoRepository extends JpaRepository<Todo, Long> {
    Todo save(Todo todo);

    Todo findByTodoText(String todo_text);
}