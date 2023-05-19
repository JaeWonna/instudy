package instudy.instudy.repository;

import instudy.instudy.domain.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface TodoRepository extends JpaRepository<Todo, Long> {
    Todo save(Todo todo);

    Todo findByTodoText(String todo_text);

    
    // 유저 아이디로 투두 리스트로 반환받기 -> 이게 되는가? 안될것같은데?

}