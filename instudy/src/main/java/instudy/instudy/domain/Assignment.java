package instudy.instudy.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@Entity
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assignmentId;

    private String title;
    private String period;
    private String description;

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
                ", period='" + period + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
