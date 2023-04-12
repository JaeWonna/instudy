package instudy.instudy.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter @Setter
@Entity
public class Board {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    private String writer;

    private String title;

    private String content;

    private String fileName;

    private String fileOriginalName;

    private String fileUrl;

}
