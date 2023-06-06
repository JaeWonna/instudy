package instudy.instudy.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "comment") // 테이블 명 feed
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column
    private String userId;
    @Column
    private Long feedId;
    @Column
    private String comment;

    public Comment(String userId, Long feedId, String comment) {
        this.userId = userId;
        this.feedId = feedId;
        this.comment = comment;
    }

    public Comment() {

    }
}
