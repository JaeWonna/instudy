package instudy.instudy.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "assignment") // 테이블 명 feed
@Getter
@Setter
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assignmentId;

    private String title;
    private String period;
    private String description;
    @ElementCollection
    private List<String> ready = new ArrayList<>();
    @ElementCollection
    private List<String> study = new ArrayList<>();
    @ElementCollection
    private List<String> finish = new ArrayList<>();

    public Assignment(String title, String period, String description) {
        this.title = title;
        this.period = period;
        this.description = description;
    }

    public Assignment() {

    }

    @Override
    public String toString() {
        return "Assignment{" +
                "assignmentId=" + assignmentId +
                ", title='" + title + '\'' +
                ", period=" + period +
                ", description='" + description + '\'' +
                ", ready=" + ready +
                ", study=" + study +
                ", finish=" + finish +
                '}';
    }
}
