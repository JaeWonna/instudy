package instudy.instudy.service;

import instudy.instudy.domain.Assignment;
import instudy.instudy.repository.AssignmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
