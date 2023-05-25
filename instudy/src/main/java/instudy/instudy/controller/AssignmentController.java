package instudy.instudy.controller;

import instudy.instudy.domain.Assignment;
import instudy.instudy.repository.AssignmentRepository;
import instudy.instudy.service.AssignmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    //과제 생성
    @RequestMapping(value = "/assignment/create", method = RequestMethod.POST)
    public String createAssignment(@RequestBody Map<String, String> paramMap) {
        String description = paramMap.get("description");
        String title = paramMap.get("title");
        String period = paramMap.get("period");
        Long groupId = Long.parseLong(paramMap.get("group_id"));

        Assignment newAssignment = new Assignment(title, period, description, groupId);
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

    //전체 과제 조회
    @RequestMapping(value = "/assignment/read", method = RequestMethod.POST)
    public List<Assignment> readAllAssignment() {
        return assignmentService.readAllAssignment();
    }

    //과제 수정
    @RequestMapping(value = "/assignment/update", method = RequestMethod.POST)
    public String updateAssignment(@RequestBody Map<String, String> paramMap) {
        Long assignmentId = Long.parseLong(paramMap.get("assignmentId"));
        String description = paramMap.get("description");
        String title = paramMap.get("title");
        String period = paramMap.get("period");
        Assignment updateAssignment = assignmentRepository.findByAssignmentId(assignmentId);
        assignmentService.updateAssignment(updateAssignment, description, title, period);
        return "update";
    }
}
