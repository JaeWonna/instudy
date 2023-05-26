package instudy.instudy.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "file") // 테이블 명 feed
@Getter
@Setter
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;

    private String orgNm;

    private String savedNm;

    private String savedPath;

    public File(Long fileId, String orgNm, String savedNm, String savedPath) {
        this.fileId = fileId;
        this.orgNm = orgNm;
        this.savedNm = savedNm;
        this.savedPath = savedPath;
    }

    public File() {

    }
}
