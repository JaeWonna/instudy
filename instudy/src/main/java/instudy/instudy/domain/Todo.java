package instudy.instudy.domain;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import java.time.LocalDateTime;

import static instudy.instudy.domain.StudyStatus.READY;
import static instudy.instudy.domain.StudyStatus.STUDY;

@Entity(name = "todo") // 테이블 명 todo
@Getter @Setter
public class Todo {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long todoId;

    @Column(nullable = false)
    private String todoText;

    @Enumerated(EnumType.STRING)
    private StudyStatus studyStatus;

    @ManyToOne
    @JoinColumn(name = "id")
    private User user;

    // 투두 - 유저 편의메서드 생성
    public void setUser(User user) {
        if(this.user != null) {
            this.user.getTodos().remove(this);
        }
        this.user = user;
        user.getTodos().add(this);
    }



    public Todo(String todoText, StudyStatus studyStatus) {
        this.todoText = todoText;
        this.studyStatus = studyStatus;
    }

    public Todo(Long todoId, String todoText, StudyStatus studyStatus) {
        this.todoId = todoId;
        this.todoText = todoText;
        this.studyStatus = studyStatus;
    }

    public Todo() {}

    @Override
    public String toString() {
        return "Todo{" +
                "todoText='" + todoText + '\'' +
                ", studyStatus='" + studyStatus + '\'' +
                '}';
    }
}


//
//    id (기본키) Long
//
//title: String
//        description : String
//        status : Status (시작전 / 진행중 / 완료)
//        studydate : LocalDateTime (시간날짜측정변수)


//    < 원래 있었던 Todo내용 >
//    @Id @GeneratedValue
//    @Column(name = "todo_id")
//    private Long id;
//
//    private String title;
//    private String description;
//
//    @Enumerated(EnumType.STRING)
//    private StudyStatus status; // 공부 상태
//
//    private LocalDateTime studydate; // 공부한 시간 날짜 측정변수
//
//    @ManyToOne(fetch = LAZY)
//    @JoinColumn(name = "user_id")
//    private User user;