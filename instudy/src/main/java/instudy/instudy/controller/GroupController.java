package instudy.instudy.controller;

import instudy.instudy.domain.StudyGroup;
import instudy.instudy.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class GroupController {

    private final GroupService groupService;

//    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @RequestMapping(value = "/group", method = RequestMethod.POST)
    public void createGroup(@RequestBody Map<String, String> paramMap){

        String groupName = paramMap.get("");
        String description = paramMap.get("");
        String manager = paramMap.get("");
        String getCapacity = paramMap.get("");
        Long capacity = Long.parseLong(getCapacity);
//        Long capacity = paramMap.get("");
//        String groupName = paramMap.get("");

        StudyGroup newGroup = new StudyGroup(groupName, description, manager, capacity);
//        groupService.groupJoin(newGroup);

    }

    @PostMapping(value = "/group/new")  //그룹 등록
    public String create(GroupForm form) {
        StudyGroup group = new StudyGroup();
        group.setGroupName(form.getName());
        groupService.groupJoin(group);
        return "redirect:/";
    }

//    @GetMapping("/group")
//    @ResponseBody
//    public String groupString(@RequestParam("groupTest") String groupTest) {
//        return "hello " + groupTest;
//    }

}
