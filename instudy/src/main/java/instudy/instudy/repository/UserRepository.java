package instudy.instudy.repository;

import instudy.instudy.domain.User;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    User save(User user);
    Optional<User> findById(Long id);
//    Optional<User> findByName(String name);
//    List<User> findAll(); //저장된 모든 user 정보를 반환해줌
    boolean existsByUserId(String userId);
    Optional<User> findByUserId(String userId);
    Optional<User> findByEmail(String email);
}
