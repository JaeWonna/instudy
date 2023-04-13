package instudy.instudy.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "user") // 테이블 명 user
@Getter @Setter
public class User {

    @Id @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    @Column
    private String userId;
    @Column
    private String password;
    @Column
    private String user_name;
    @Column
    private String email;

    public User(String userId, String password, String user_name, String email) {
        this.userId = userId;
        this.password = password;
        this.user_name = user_name;
        this.email = email;
    }

    public User() {

    }

    @OneToMany(mappedBy = "user")
    private List<UserStudyGroup> userStudyGroups = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Todo> todos = new ArrayList<>();
}
