package instudy.instudy.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "checking_comment")
@Getter
@Setter
public class CheckingComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long checkingCommentId;

    @Column
    private String userId; // 세션에서 가져온다
    @Column
    private Long checkingId; // 현재 인증 페이지 - url에서 가져온다
    @Column
    private String comment; // 이벤트에서 가져온다

    public CheckingComment(String userId, Long checkingId, String comment){
        this.userId = userId;
        this.checkingId = checkingId;
        this.comment = comment;
    }

    public CheckingComment() {

    }

}
