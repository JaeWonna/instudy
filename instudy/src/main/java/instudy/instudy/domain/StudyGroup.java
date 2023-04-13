package instudy.instudy.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "studygroup")
@Getter @Setter
public class StudyGroup {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "studygroup_id")
    private Long id;

    private Long groupId;
    private String groupName;
    private String description;
    private Long fixedNumber;
    private Long currentNumber;

    @OneToMany(mappedBy = "studygroup")
    private List<UserStudyGroup> userStudyGroups = new ArrayList<>();

}
