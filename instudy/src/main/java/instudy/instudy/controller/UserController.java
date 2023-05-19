package instudy.instudy.controller;

import instudy.instudy.domain.StudyGroup;
import instudy.instudy.domain.User;
import instudy.instudy.repository.UserRepository;
import instudy.instudy.service.GroupService;
import instudy.instudy.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class UserController {

    private final UserService userService;
    // 서비스 한개 더 추가
    private final GroupService groupService;

    public UserController(UserService userService, GroupService groupService) {
        this.userService = userService;
        this.groupService = groupService;
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public boolean postCreateForm(@RequestBody Map<String, String> paramMap) {

        System.out.println(paramMap);

        String userId = paramMap.get("id");
        String password = paramMap.get("password");
        String name = paramMap.get("name");
        String email = paramMap.get("email");

        System.out.println(name);

        User newUser = new User(userId, password, name, email, "false");
        //userId가 중복이면 false return

        return userService.join(newUser);    //정상적으로 저장되면 true return

    }

    @RequestMapping(value = "/signin", method = RequestMethod.POST)
    public User signin(@RequestBody Map<String, String> ParamMap) {
        System.out.println("로그인 테스트");
        System.out.println(ParamMap);
        String userId = ParamMap.get("email");
        String password = ParamMap.get("passwd");
        User loginUser = userService.login(userId, password);
        System.out.println("확인용 loginUser = " + loginUser);

        if (loginUser != null) {
            loginUser.setSignIn("true");
            System.out.println("로그인 성공!");
//            HttpSession session = request.getSession(); // 세션이 있으면(true) 있는 세션 반환, 없으면(false) 신규 세션을 생성하여 반환
//            session.setAttribute(SessionConstants.LOGIN_USER, loginUser);   // 세션에 로그인 유저 정보 보관
            return loginUser;
        } else {
            System.out.println("로그인 실패");
            return null;
        }
    }

    @RequestMapping(value="/profile", method = RequestMethod.POST)
    public User profile(@RequestBody Map<String, String> ParamMap) {
        System.out.println("프로필 테스트");
        System.out.println(ParamMap);
        String userId = ParamMap.get("user_id");
        System.out.println(userId);
        return userService.profile(userId);
    }


    // 유저에서 그룹 가입 메서드
    // 프론트 부분에서 axios로 받을 것 정리
    // 1. 그룹이름 : groupName (groupName: group.groupName 처럼)
    // 2. 현재 접속 유저 아이디 : userId (manager: props.manager 처럼 매니저 받은것처럼)
    // value 경로는 임시로 /joingroup로 적어놨고 프론트가 지정해줘야됨
    @RequestMapping(value = "/joingroup", method = RequestMethod.POST)
    public void memberJoinGroup(@RequestBody Map<String, String> ParamMap) {
        System.out.println("회원이 그룹에 조인합니다");
        System.out.println(ParamMap);

        String groupName = ParamMap.get("groupName");
        String userId = ParamMap.get("userId");

        User user = userService.findOne(userId);
        StudyGroup group = groupService.findOne(groupName);

        user.setStudyGroup(group); // 생성자 연관관계 메서드 호출 !!
        group.getMember().add(userId);

        userService.save(user);
    }

    @PostMapping("/profileModify")
    public ResponseEntity<Void> userUpdate(@RequestBody Map<String, String> ParamMap) {

        String userId = ParamMap.get("id");
        String name = ParamMap.get("name");
        String email = ParamMap.get("email");
        String password = ParamMap.get("password");
        userService.userUpdate(userId, name, email, password);
        return ResponseEntity.ok().build();
    }


//    @PostMapping("/logout")
//    public String logout(HttpServletRequest request) {
//        HttpSession session = request.getSession(false);
//        if (session != null) {
//            session.invalidate();   //세션이 존재하는 경우 현재 세션 무효화
//        }
//        return "redirect:/";     // "/" 경로로 리다이렉트
//    }



}
