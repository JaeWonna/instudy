package instudy.instudy.service;

import instudy.instudy.domain.Assignment;
import instudy.instudy.repository.AssignmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    public AssignmentService(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    public void createAssignment(Assignment newAssignment) {
        assignmentRepository.save(newAssignment);
    }

    public void deleteAssignment(Optional<Assignment> deleteAssignment) {
        deleteAssignment.ifPresent(assignmentRepository::delete);
    }

    public List<Assignment> readAllAssignment() {
        return assignmentRepository.findAll();
    }

    public void updateAssignment(Assignment updateAssignment, String description, String title, String period) {
        updateAssignment.setDescription(description);
        updateAssignment.setPeriod(period);
        assignmentRepository.save(updateAssignment);
    }
}
