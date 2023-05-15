package instudy.instudy.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "timer")
@Getter @Setter
public class Timer {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long timerId;

    private int count = 0;

    private int hour, minute, second; // 시분초, 이걸로 카운트 다운 및 업

    @Enumerated(EnumType.STRING)
    private TimerStatus timerStatus; // run, stop

    private LocalDateTime localDateTime; // 현재 시간!!
}
