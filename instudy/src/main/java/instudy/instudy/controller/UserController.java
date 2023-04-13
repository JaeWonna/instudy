package instudy.instudy.controller;

import instudy.instudy.domain.User;
import instudy.instudy.repository.UserRepository;
import instudy.instudy.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public boolean postCreateForm(@RequestBody Map<String, String> paramMap) {
        System.out.println(paramMap);
        String userId = paramMap.get("id");
        String password = paramMap.get("password");
        String name = paramMap.get("name");
        String email = paramMap.get("email");
        System.out.println(name);
        User newUser = new User(userId, password, name, email);
        if (userService.join(newUser)) {
            return true;    //정상적으로 저장되면 true return
        }
        else return false;  //userId가 중복이면 false return
    }

    @RequestMapping(value = "/signin", method = RequestMethod.POST)
    public boolean signin(@RequestBody Map<String, String> ParamMap, HttpServletRequest request) {
        System.out.println("로그인 테스트");
        System.out.println(ParamMap);
        String userId = ParamMap.get("email");
        String password = ParamMap.get("passwd");
        User loginUser = userService.login(userId, password);
        if (loginUser != null) {
            System.out.println("로그인 성공!");
//            HttpSession session = request.getSession(); // 세션이 있으면(true) 있는 세션 반환, 없으면(false) 신규 세션을 생성하여 반환
//            session.setAttribute(SessionConstants.LOGIN_USER, loginUser);   // 세션에 로그인 유저 정보 보관
            return true;
        } else {
            System.out.println("로그인 실패");
            return false;
        }
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();   //세션이 존재하는 경우 현재 세션 무효화
        }
        return "redirect:/";     // "/" 경로로 리다이렉트
    }

//
//    @PostMapping("/signUp")
//    public String create(MemberForm form) {
//
//        Member member = new Member();
//        member.setName(form.getName());
//
//        memberService.join(member);
//
//        return "redirect:/";
//    }
//
//    @GetMapping("/members")
//    public String list(Model model) {
//        List<Member> members = memberService.findMembers();
//        model.addAttribute("members", members);
//        return "members/memberList";
//    }


}
