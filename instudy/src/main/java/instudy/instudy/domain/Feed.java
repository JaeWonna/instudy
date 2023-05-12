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
    @ElementCollection
    private List<String> comment = new ArrayList<>(); // 댓글

}
