package instudy.instudy.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@Entity
public class StudyGroup {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupId;

    private String groupName;
    private String description;
    private String manager;
    private int capacity;
    @ElementCollection
    private List<String> member = new ArrayList<>();
    @ElementCollection
    private List<String> groupStack = new ArrayList<>();

    // 연관관계 매핑!!
    @OneToMany(mappedBy = "studyGroup")
    @JsonManagedReference
    private List<User> users = new ArrayList<>();

    public StudyGroup() {

    }

    public StudyGroup(String groupName, String description, String manager, int capacity, List<String> groupStack, List<String> member) {
        this.groupName = groupName;
        this.description = description;
        this.manager = manager;
        this.capacity = capacity;
        this.groupStack = groupStack;
        this.member = member;
    }
}
