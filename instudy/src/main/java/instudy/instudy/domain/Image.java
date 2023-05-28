package instudy.instudy.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "image") // 테이블 명 feed
@Getter
@Setter
public class Image {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;

    @Column
    private String orgNm;
    @Column
    private String savedNm;
    @Column
    private String savedPath;

    @Builder
    public Image(Long imageId, String orgNm, String savedNm, String savedPath) {
        this.imageId = imageId;
        this.orgNm = orgNm;
        this.savedNm = savedNm;
        this.savedPath = savedPath;
    }

    @Builder
    public Image(String orgNm, String savedNm, String savedPath) {
        this.orgNm = orgNm;
        this.savedNm = savedNm;
        this.savedPath = savedPath;
    }

    public Image() {

    }
}
