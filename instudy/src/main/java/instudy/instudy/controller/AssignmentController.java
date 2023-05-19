package instudy.instudy.controller;

import instudy.instudy.domain.Assignment;
import instudy.instudy.domain.Feed;
import instudy.instudy.repository.AssignmentRepository;
import instudy.instudy.service.AssignmentService;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class AssignmentController {

    private final AssignmentService assignmentService;

    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
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
}
