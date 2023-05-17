package instudy.instudy.controller;

import instudy.instudy.domain.Timer;
import instudy.instudy.domain.User;
import instudy.instudy.service.TimerService;
import instudy.instudy.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class TimerController {

    private final TimerService timerService;
    private final UserService userService;

    public TimerController(TimerService timerService, UserService userService) {
        this.timerService = timerService;
        this.userService = userService;
    }


    // 프론트 부분에서 axios로 받을것 정리
    // 현재 접속 유저 아이디 : userId
    @RequestMapping(value = "/timer/create", method = RequestMethod.POST)
    public String createTimer(@RequestBody Map<String, String> paramMap) {
        System.out.println("paramMap확인 = " + paramMap);
        Timer newTimer = new Timer();

        String userId = paramMap.get("userId");
        User user = userService.findOne(userId);
        newTimer.setUser(user);

        timerService.create(newTimer);
        return "create";
    }
    
    // 시작시
    @RequestMapping(value = "/timer/start", method = RequestMethod.POST)
    public String startTimer(@RequestBody Map<String, String> paramMap) {
        String userId = paramMap.get("userId");
        User user = userService.findOne(userId);
        Timer timer = user.getTimer();
        timer.start();

        return "start";
    }

    // 멈출시
    @RequestMapping(value = "/timer/stop", method = RequestMethod.POST)
    public String stopTimer(@RequestBody Map<String, String> paramMap) {
        String userId = paramMap.get("userId");
        User user = userService.findOne(userId);
        Timer timer = user.getTimer();
        timer.stop();

        return "stop";
    }

    // 시간저장
    @RequestMapping(value = "/timer/save", method = RequestMethod.POST)
    public String saveTimer(@RequestBody Map<String, String> paramMap) {
        String userId = paramMap.get("userId");
        User user = userService.findOne(userId);
        Timer timer = user.getTimer();
        long totalTime = timer.save();
        System.out.println("총 공부시간 totalTime은 = " + totalTime);
        timerService.update(timer);
        return "save";
    }
}



