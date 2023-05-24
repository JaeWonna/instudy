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

    //전체 그룹 조회
    @RequestMapping(value = "/groups", method = RequestMethod.POST)
    public List<StudyGroup> list(@RequestBody Map<String, String> paramMap){
        String loginUser = paramMap.get("loginUser");
        System.out.println("로그인유저 : " + loginUser);
        return groupService.findGroups();
    }

    //유저가 가입한 그룹 조회
    @RequestMapping(value = "/groups/getMyGroups", method = RequestMethod.POST)
    public List<StudyGroup> userGroups(@RequestBody Map<String, String> paramMap){
        String loginUser = paramMap.get("userId");
        System.out.println("로그인유저 : " + loginUser);
        return groupService.findUserGroups(loginUser);
    }

    @RequestMapping(value = "/group/new", method = RequestMethod.POST)
    public boolean createGroup(@RequestBody Map<String, Object> requestData){
        String groupName = (String) requestData.get("groupName");
        String description = (String) requestData.get("description");
        String manager = (String) requestData.get("manager");
        int capacity = (int) requestData.get("capacity");
        List<String> member = new ArrayList<>();
        member.add(manager);
        @SuppressWarnings("unchecked")
        List<String> groupStack = (List<String>)requestData.get("groupStack");
        StudyGroup newStudyGroup = new StudyGroup(groupName, description, manager, capacity, groupStack, member);
        return groupService.groupJoin(newStudyGroup);
    }

//    @GetMapping("/group")
//    @ResponseBody
//    public String groupString(@RequestParam("groupTest") String groupTest) {
//        return "hello " + groupTest;
//    }

    
    // 그룹 검색
    // 프론트 부분에서 axios로 받을 것 정리
    // 1. 그룹이름 : groupName (groupName: group.groupName 처럼)
    // value값은 임의로 /groups/search로 넣었음
    @RequestMapping(value = "/groups/search", method = RequestMethod.POST)
    public List<StudyGroup> search(@RequestBody Map<String, String> paramMap){

        String groupName = paramMap.get("groupName");
        List<StudyGroup> searchList = groupService.search(groupName);
        return searchList;
    }

}
