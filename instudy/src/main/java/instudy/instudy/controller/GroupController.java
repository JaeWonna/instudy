package instudy.instudy.controller;

import instudy.instudy.domain.StudyGroup;
import instudy.instudy.domain.User;
import instudy.instudy.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
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
    public boolean createGroup(@RequestBody Map<String, Object> requestData){
        String groupName = (String) requestData.get("groupName");
        String description = (String) requestData.get("description");
        String manager = (String) requestData.get("manager");
        int capacity = Integer.parseInt((String) requestData.get("capacity"));
        List<String> member = new ArrayList<>();
        @SuppressWarnings("unchecked")
        List<String> groupStack = (List<String>) requestData.get("groupStack");

        StudyGroup newStudyGroup = new StudyGroup(groupName, description, manager, capacity, member, groupStack);
        return groupService.groupJoin(newStudyGroup);
    }

//    @GetMapping("/group")
//    @ResponseBody
//    public String groupString(@RequestParam("groupTest") String groupTest) {
//        return "hello " + groupTest;
//    }

}
