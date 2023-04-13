package instudy.instudy.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity(name = "todo") // 테이블 명 todo
@Getter @Setter
public class Todo {

    @Id @GeneratedValue
    @Column(name = "todo_id")
    private Long id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private StudyStatus status; // 공부 상태

    private LocalDateTime studydate; // 공부한 시간 날짜 측정변수

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}

//
//    id (기본키) Long
//
//title: String
//        description : String
//        status : Status (시작전 / 진행중 / 완료)
//        studydate : LocalDateTime (시간날짜측정변수)

