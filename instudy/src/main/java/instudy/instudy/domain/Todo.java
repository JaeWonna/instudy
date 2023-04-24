package instudy.instudy.domain;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Entity(name = "todo") // 테이블 명 todo
@Getter @Setter
public class Todo {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long todo_id;
    @Column
    private String todo_text;
    @Column
    private String status;

//    @ManyToOne(fetch = LAZY)
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    private String todo_text;
//
//    private String status;

    public Todo(String todo_text, String status) {
        this.todo_text = todo_text;
        this.status = status;
    }

    public Todo() {

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