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
        timerRepository.save(timer);
    }

    public Timer findByTimerId(Long timerId) {
        return timerRepository.findByTimerId(timerId);
    }
}
