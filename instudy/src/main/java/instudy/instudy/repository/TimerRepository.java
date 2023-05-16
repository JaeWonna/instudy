package instudy.instudy.repository;

import instudy.instudy.domain.Timer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimerRepository extends JpaRepository<Timer, Long> {

    Timer save(Timer timer);

    Timer findByTimerId(Long timerId);

    // 커밋용

}
