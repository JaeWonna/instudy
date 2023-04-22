package instudy.instudy.controller;

import instudy.instudy.domain.StudyGroup;
import instudy.instudy.domain.User;
import instudy.instudy.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class GroupController {

    private final GroupService groupService;

//    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    //그룹 조회
    @RequestMapping(value = "/groups", method = RequestMethod.POST)
    public List<StudyGroup> list(@RequestBody Map<String, String> paramMap){
        String loginUser = paramMap.get("loginUser");
        System.out.println("로그인유저 : " + loginUser);
        List<StudyGroup> groups = groupService.findUserGroups(loginUser);
        return groups;
    }

    @RequestMapping(value = "/group/new", method = RequestMethod.POST)
    public boolean createGroup(@RequestBody Map<String, String> paramMap){
        System.out.println(paramMap);
        String groupName = paramMap.get("groupName");
        String description = paramMap.get("description");
        String manager = paramMap.get("manager");
        int capacity = 1;
        List<String> member = new ArrayList<>();
        List<String> groupStack = new ArrayList<>();

        StudyGroup newStudyGroup = new StudyGroup(groupName, description, manager, capacity, member, groupStack);
        return groupService.groupJoin(newStudyGroup);

//        String manager = paramMap.get("");
//        String getCapacity = paramMap.get("");
//        Long capacity = Long.parseLong(getCapacity);
//        Long capacity = paramMap.get("");
//        String groupName = paramMap.get("");

//        StudyGroup newGroup = new StudyGroup(groupName, description, manager, capacity);
//        groupService.groupJoin(newGroup);

    }

//    @GetMapping("/group")
//    @ResponseBody
//    public String groupString(@RequestParam("groupTest") String groupTest) {
//        return "hello " + groupTest;
//    }

}
