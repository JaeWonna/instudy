package instudy.instudy.repository;

import instudy.instudy.domain.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    Assignment findByAssignmentId(Long assignmentId);
}
