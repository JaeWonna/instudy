package instudy.instudy.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.websocket.OnMessage;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "user") // 테이블 명 user
@Getter @Setter
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String userId;
    @Column
    private String password;
    @Column
    private String user_name;
    @Column
    private String email;
    @Column
    private String signIn; //로그인 상태

    // 이부분 추가해봄
    @ManyToOne
    @JoinColumn(name = "group_id")
    @JsonBackReference
    private StudyGroup studyGroup;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Todo> todos = new ArrayList<>();

    // 연관관계 매핑!!
    @OneToMany(mappedBy = "user")
    @JsonManagedReference
    private List<Timer> timers = new ArrayList<>();

    // 유저 - 스터디그룹 편의메서드 생성
    public void setStudyGroup(StudyGroup studyGroup) {
        if(this.studyGroup != null) {
            this.studyGroup.getUsers().remove(this);
        }
        this.studyGroup = studyGroup;
        studyGroup.getUsers().add(this);
    }

    public User(String userId, String password, String user_name, String email, String signIn) {
        this.userId = userId;
        this.password = password;
        this.user_name = user_name;
        this.email = email;
        this.signIn = signIn;
    }

    public User() {

    }

}