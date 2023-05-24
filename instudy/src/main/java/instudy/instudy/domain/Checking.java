package instudy.instudy.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "checking")
@Getter
@Setter
public class Checking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long checkingId; // 기본키

    @Column
    private String userId; // 유저아이디
    @Column
    private Long groupId; // 그룹아이디
    @Column
    private String content; // 내용
    @Column
    private int checkNum; // 인증갯수
    @ElementCollection
    private List<String> checkUser = new ArrayList<>(); // 인증 누른 유저 아이디
    @ElementCollection
    private List<String> comment = new ArrayList<>(); // 댓글모음

    // 추후 true나 false는 return값으로만 쓸 예정이고 투두나 타이머는 userId를 통해서 가져올 예정이다

    public Checking() {}

    public Checking(String userId, Long groupId, String content) {
        this.userId = userId;
        this.groupId = groupId;
        this.content = content;
    }

    @Override
    public String toString() {
        return "Check{" +
                "userId='" + userId + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
