package instudy.instudy;

import instudy.instudy.repository.GroupRepository;
import instudy.instudy.repository.UserRepository;
import instudy.instudy.service.GroupService;
import instudy.instudy.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {

    private final UserRepository userRepository;
    private final GroupRepository groupRepository;

    public SpringConfig(UserRepository userRepository, GroupRepository groupRepository) {
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
    }

    @Bean
    public UserService userService() {
        return new UserService(userRepository);
    }

    @Bean
    public GroupService groupService() {
        return new GroupService(groupRepository);
    }


}
