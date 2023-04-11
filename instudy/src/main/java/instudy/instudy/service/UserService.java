package instudy.instudy.service;

import instudy.instudy.domain.User;
import instudy.instudy.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public boolean join(User user) {
        //중복 회원 검증
        if (validateDuplicateMember(user)) {
            //userId가 중복이 아니면 save 후 true return
            userRepository.save(user);
            return true;
        }
        return false;
//        return user.getUserId();
    }

    //회원가입 시 중복 회원 검증
    private boolean validateDuplicateMember(User user) {
//        userRepository.findById(user.getUserId())
//                .ifPresent(m -> {
//                    throw new IllegalStateException("이미 존재하는 회원입니다.");
//                });
        if(userRepository.existsByUserId(user.getUserId())) {
            System.out.println("user Id 중복 테스트");
            return false;   //userId가 중복이면 false return
        }
        else return true; //userId가 중복이 아니면 true return
    }

//    public void login(User user) {
//        if (userRepository.findByUserId(user.getUserId()) == null) {
//            System.out.println("아이디 없음");
//        }
//    }

    public User login(String userId, String password) {
        return userRepository.findByUserId(userId)
                .filter(m -> m.getPassword().equals(password))
                .orElse(null);
    }
}
