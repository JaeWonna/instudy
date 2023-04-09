package instudy.instudy.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "user") // 테이블 명 user
public class User {

    @Id
    @GeneratedValue
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
