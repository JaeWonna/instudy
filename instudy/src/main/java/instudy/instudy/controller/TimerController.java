package instudy.instudy.controller;

import instudy.instudy.domain.Feed;
import instudy.instudy.domain.Timer;
import instudy.instudy.domain.User;
import instudy.instudy.service.TimerService;
import instudy.instudy.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
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
        String userId = paramMap.get("userId"); // 자동
        System.out.println("test userId : " + userId);
        Long groupId = Long.parseLong(paramMap.get("groupId")); // 자동
        Timer timer = new Timer(userId, groupId);
        timer.create();
//        newTimer.setUser(user);

        timerService.create(timer);
        return "create";
    }

    // 시작시
    @RequestMapping(value = "/timer/start", method = RequestMethod.POST)
    public String startTimer(@RequestBody Map<String, String> paramMap) {

        Long timerId = Long.parseLong(paramMap.get("timerId"));
        Timer timer = timerService.findByTimerId(timerId);
        timer.start();
        timerService.update(timer); // 변경상태저장 추가

        return "start";
    }

    // 멈출시
    @RequestMapping(value = "/timer/stop", method = RequestMethod.POST)
    public String stopTimer(@RequestBody Map<String, String> paramMap) {

        Long timerId = Long.parseLong(paramMap.get("timerId"));
        Timer timer = timerService.findByTimerId(timerId);
        timer.stop();
        timerService.update(timer); // 변경상태저장 추가

        return "stop";
    }

    // 시간저장
    @RequestMapping(value = "/timer/save", method = RequestMethod.POST)
    public String saveTimer(@RequestBody Map<String, String> paramMap) { // 유저에 더해준다
        Long timerId = Long.parseLong(paramMap.get("timerId"));
        Timer timer = timerService.findByTimerId(timerId);
        timer.save();

        long studyTime = timer.getTotalTime(); // 
        long totalTimeInSeconds = studyTime / 1000; // Convert milliseconds to seconds 가공하기

        String userId = paramMap.get("userId");
        User user = userService.findOne(userId);
        long userTotalTime = user.getUserTotalTime();
        userTotalTime += totalTimeInSeconds; // 유저 시간 필드에 공부한 초 시간 long타입으로 더해주기
        user.setUserTotalTime(userTotalTime); // 유저 필드에 저장

        userService.save(user); // 유저 변경사항 저장해야됨
        
        timer.initTotalTime(); // 타이머에서 이미 totalTime을 더했으므로 초기화 해줘야한다잉
        
        timerService.update(timer);
        return "save";
    }

    // 이제까지 공부한 시간 출력 -> int
    @RequestMapping(value = "/timer/read", method = RequestMethod.POST)
    public long getUserTime(@RequestBody Map<String, String> paramMap) {
        String userId = paramMap.get("userId");
        User user = userService.findOne(userId);
        return user.getUserTotalTime(); // 이미 가공된 상태 (타이머에서 유저로 시간옮길때 이미 1000나눠줌)

//        int hours = (int) (userTotalTime / 3600); // Calculate hours
//        int minutes = (int) ((userTotalTime % 3600) / 60); // Calculate minutes
//        int seconds = (int) (userTotalTime % 60); // Calculate seconds
//
//        user.setUserStudyHours(hours);
//        user.setUserStudyMinutes(minutes);
//        user.setUserStudySeconds(seconds);
//
//        userService.save(user); // 유저 변경사항 저장해야됨
//        System.out.println(user); //
//        return user; // 원래는 이렇게 되어있었음
    }
}
