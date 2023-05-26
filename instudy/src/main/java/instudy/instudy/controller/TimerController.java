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

        return "start";
    }

    // 멈출시
    @RequestMapping(value = "/timer/stop", method = RequestMethod.POST)
    public String stopTimer(@RequestBody Map<String, String> paramMap) {

        Long timerId = Long.parseLong(paramMap.get("timerId"));
        Timer timer = timerService.findByTimerId(timerId);
        timer.stop();

        return "stop";
    }

    // 시간저장
    @RequestMapping(value = "/timer/save", method = RequestMethod.POST)
    public String saveTimer(@RequestBody Map<String, String> paramMap) {
        Long timerId = Long.parseLong(paramMap.get("timerId"));
        Timer timer = timerService.findByTimerId(timerId);
        timer.save();

        timerService.update(timer);
        return "save";
    }

    // 이제까지 공부한 시간 출력
    @RequestMapping(value = "/timer/read", method = RequestMethod.POST)
    public List<Integer> studyTime(@RequestBody Map<String, String> paramMap) {
        Long timerId = Long.parseLong(paramMap.get("timerId"));
        Timer timer = timerService.findByTimerId(timerId);
        long studyTime = timer.getTotalTime();

        long totalTimeInSeconds = studyTime / 1000; // Convert milliseconds to seconds
        int hours = (int) (totalTimeInSeconds / 3600); // Calculate hours
        int minutes = (int) ((totalTimeInSeconds % 3600) / 60); // Calculate minutes
        int seconds = (int) (totalTimeInSeconds % 60); // Calculate seconds

        List<Integer> timeList = new ArrayList<>();
        timeList.add(hours);
        timeList.add(minutes);
        timeList.add(seconds);

        return timeList;
    }
}
