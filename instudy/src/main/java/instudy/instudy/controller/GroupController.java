package instudy.instudy.controller;

import instudy.instudy.domain.StudyGroup;
import instudy.instudy.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class GroupController {

    private final GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

//    @RequestMapping(value = "/group", method = RequestMethod.POST)
//    @ResponseBody
//    public StudyGroup group(){
//        StudyGroup group = new StudyGroup();
//        group.setGroupId(1L);
//        group.setGroupName("그룹 테스트");
//        System.out.println(group);
//        return group;
//    }

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
