package instudy.instudy.repository;

import instudy.instudy.domain.Check;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CheckRepository extends JpaRepository<Check, Long> {

    Check save(Check check); // 생
    Optional<Check> findByCheckId(Long checkId); // 삭
    List<Check> findByGroupId(Long groupId); // 읽
}
