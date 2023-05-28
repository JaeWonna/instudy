package instudy.instudy.service;

import instudy.instudy.domain.Timer;
import instudy.instudy.repository.TimerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class TimerService {

    private final TimerRepository timerRepository;

    public TimerService(TimerRepository timerRepository) {
        this.timerRepository = timerRepository;
    }


    public void create(Timer timer) {
        timerRepository.save(timer);
    }

    public void delete(Timer timer) {
    }

    public void update(Timer timer) {
        // 타이머 업데이트 로직 구현
        // 예시: JPA를 사용하여 타이머 업데이트
        if (timer.getDayTime() == null) {
            timer.setDayTime(0L); // null인 경우 기본값으로 설정
        }
        if (timer.getEndTime() == null) {
            timer.setEndTime(0L); // null인 경우 기본값으로 설정
        }
        if (timer.getTotalTime() == null) {
            timer.setTotalTime(0L); // null인 경우 기본값으로 설정
        }
        timerRepository.save(timer);
    }

    public Timer findByTimerId(Long timerId) {
        return timerRepository.findByTimerId(timerId);
    }
}
