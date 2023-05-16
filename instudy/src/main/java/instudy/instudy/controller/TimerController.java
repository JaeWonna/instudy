package instudy.instudy.controller;

import instudy.instudy.domain.Timer;
import instudy.instudy.service.TimerService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
public class TimerController {

    private final TimerService timerService;

    public TimerController(TimerService timerService) {
        this.timerService = timerService;
    }

    @RequestMapping(value = "/timer/create", method = RequestMethod.POST)
    public boolean postCreateForm() {
        Timer newTimer = new Timer();
        timerService.create(newTimer);
        return true; // 정상적으로 생성시 true
    }
}
