package instudy.instudy.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter @Setter
@Entity
public class StudyGroup {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;
    private String groupName;
    private String description;
    private String manager;
    private Long capacity;
    @ElementCollection
    private List<String> member;
    @ElementCollection
    private List<String> groupStack;

    public StudyGroup(Long groupId, String groupName, String description, String manager, Long capacity, List<String> member, List<String> groupStack) {
        this.groupId = groupId;
        this.groupName = groupName;
        this.description = description;
        this.manager = manager;
        this.capacity = capacity;
        this.member = member;
        this.groupStack = groupStack;
    }

    public StudyGroup() {

    }

    public StudyGroup(String groupName, String description, String manager, Long capacity) {
        this.groupName = groupName;
        this.description = description;
        this.manager = manager;
        this.capacity = capacity;
    }
}
