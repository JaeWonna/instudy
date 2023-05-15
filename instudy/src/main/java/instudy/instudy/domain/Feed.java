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
    private List<String> comment = new ArrayList<>(); // 댓글

    public Feed(Long feedId, String userId, String content, boolean heart, int heartNum, List<String> comment) {
        this.feedId = feedId;
        this.userId = userId;
        this.content = content;
        this.heart = heart;
        this.heartNum = heartNum;
        this.comment = comment;
    }

    public Feed(String userId, String content) {
        this.userId = userId;
        this.content = content;
    }

    @Override
    public String toString() {
        return "Feed{" +
                "userId='" + userId + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
