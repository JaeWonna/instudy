package instudy.instudy.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@Entity(name = "user") // 테이블 명 user
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

    public User(String userId, String password, String user_name, String email) {
        this.userId = userId;
        this.password = password;
        this.user_name = user_name;
        this.email = email;
    }

    public User() {

    }
}
