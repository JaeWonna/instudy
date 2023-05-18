package instudy.instudy.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "timer")
@Getter @Setter
public class Timer {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long timerId;

    private Long startTime;
    private Long endTime;
    private Long countTime;
    private boolean running;

    private Long dayTime;
    private Long totalTime;

    @Enumerated(EnumType.STRING)
    private TimerStatus timerStatus; // run, stop

    @OneToOne
    @JoinColumn(name = "id")
    @JsonBackReference
    private User user;

    // 연관관계 메서드
    public void setUser(User user) {
        this.user = user;
        user.setTimer(this);
    }

    public Timer() {}

    @Override
    public String toString() {
        return "Timer{" +
                "timerId='" + timerId + '\'' +
                ", dayTime = '" + dayTime + '\'' +
                ", totalTime = '" + totalTime + '\'' +
                '}';
    }

    public void start() {
        if (!running) {
            startTime = System.currentTimeMillis();
            running = true;
        }
    }

    public void stop() { // 시간측정중
        if (running) {
            endTime = System.currentTimeMillis();
            running = false;
        }
        countTime += endTime - startTime;
    }

    public void save() { // 공부시간저장
        if (running) { // start상태 (1)시간계산
            totalTime += countTime + System.currentTimeMillis() - startTime;
            countTime = 0L;
        } else { // stop상태
            totalTime += countTime;
            countTime = 0L;
        }
    }
}
