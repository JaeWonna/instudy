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

    @Column
    private String userId; //
    @Column
    private Long groupId; //

    private Long startTime;
    private Long endTime;

    private boolean running;

    private Long countTime;
    private Long dayTime;
    private Long totalTime;

//    @Enumerated(EnumType.STRING)
//    private TimerStatus timerStatus; // run, stop

    // 이부분 추가해봄
//    @ManyToOne
//    @JoinColumn(name = "id")
//    @JsonBackReference
//    private User user;
//
//    // 연관관계 메서드
//    public void setUser(User user) {
//        this.user = user;
//        user.getTimers().add(this);
//    }

    public Timer() {}

    public Timer(String userId, Long groupId){
        this.userId = userId;
        this.groupId = groupId;
    }

    @Override
    public String toString() {
        return "Timer{" +
                "timerId='" + timerId + '\'' +
                ", dayTime = '" + dayTime + '\'' +
                ", totalTime = '" + totalTime + '\'' +
                '}';
    }

    public void create() { // 처음 생성시
        running = false; // 처음 시작할때
    }

    public void start() {
        if (!running) {
            startTime = System.currentTimeMillis();
            running = true;
        } else {
            System.out.println("이미 작동중입니다");
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
        running = false; // 상태멈춤
    }
}