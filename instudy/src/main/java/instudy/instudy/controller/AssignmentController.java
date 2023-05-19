package instudy.instudy.controller;

import instudy.instudy.domain.Assignment;
import instudy.instudy.repository.AssignmentRepository;
import instudy.instudy.service.AssignmentService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class AssignmentController {

    private final AssignmentService assignmentService;
    private final AssignmentRepository assignmentRepository;

    public AssignmentController(AssignmentService assignmentService, AssignmentRepository assignmentRepository) {
        this.assignmentService = assignmentService;
        this.assignmentRepository = assignmentRepository;
    }

    //과제 추가
    @RequestMapping(value = "/assignment/create", method = RequestMethod.POST)
    public String createAssignment(@RequestBody Map<String, String> paramMap) {
        String description = paramMap.get("description");
        String title = paramMap.get("title");
        String period = paramMap.get("period");

        Assignment newAssignment = new Assignment(title, period, description);
        assignmentService.createAssignment(newAssignment);
        return "create";
    }

    //과제 삭제
    @RequestMapping(value = "/assignment/delete", method = RequestMethod.POST)
    public String deleteAssignment(@RequestBody Map<String, String> paramMap) {
        Long assignmentId = Long.parseLong(paramMap.get("assignmentId"));

        Optional<Assignment> deleteAssignment = assignmentRepository.findById(assignmentId);
        assignmentService.deleteAssignment(deleteAssignment);
        return "delete";
    }
}
