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
    private int goodNum; // 인정해준갯수
    @Column
    private int badNum; // 인정안해준갯수
    
    @ElementCollection
    private List<String> period = new ArrayList<>(); // 인증 받은 날짜 모음
    @ElementCollection
    private List<String> checkUser = new ArrayList<>(); // 인증 누른 유저 아이디
    @ElementCollection
    private List<String> comment = new ArrayList<>(); // 댓글모음

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
