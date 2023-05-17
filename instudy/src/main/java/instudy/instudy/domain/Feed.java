package instudy.instudy.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "feed") // 테이블 명 feed
@Getter
@Setter
public class Feed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedId;

    @Column
    private String userId;
    @Column
    private String content;
    @Column
    private boolean heart; // 자신의 피드 게시물에 하트를 눌렀을 때 true
    @Column
    private int heartNum; // 하트수
    @Column
    private Long groupId;
    @ElementCollection
    private List<String> heartUser = new ArrayList<>(); // 하트 누른 유저 아이디
    @ElementCollection
    private List<String> comment = new ArrayList<>(); // 댓글

    public Feed(Long feedId, String userId, String content, int heartNum, List<String> comment, Long groupId, List<String> heartUser) {
        this.feedId = feedId;
        this.userId = userId;
        this.content = content;
        this.heartNum = heartNum;
        this.comment = comment;
        this.groupId = groupId;
        this.heartUser = heartUser;
    }

    public Feed(String userId, String content, Long groupId) {
        this.userId = userId;
        this.content = content;
        this.groupId = groupId;
    }

    public Feed() {}

    @Override
    public String toString() {
        return "Feed{" +
                "userId='" + userId + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
