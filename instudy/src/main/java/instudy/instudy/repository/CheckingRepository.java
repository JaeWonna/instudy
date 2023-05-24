package instudy.instudy.repository;

import instudy.instudy.domain.Checking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CheckingRepository extends JpaRepository<Checking, Long> {

    Checking save(Checking checking); // 생
    Optional<Checking> findByCheckingId(Long checkingId); // 삭
    List<Checking> findByGroupId(Long groupId); // 읽
}
