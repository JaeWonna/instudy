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

    private int count;

    private int total;

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
                ", count = '" + count + '\'' +
                ", total = '" + total + '\'' +
                '}';
    }
}
