package instudy.instudy.service;

import instudy.instudy.domain.Check;
import instudy.instudy.repository.CheckRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CheckService {

    private final CheckRepository checkRepository;

    public CheckService(CheckRepository checkRepository) {
        this.checkRepository = checkRepository;
    }

    public void create(Check newCheck) {
        checkRepository.save(newCheck);
    }

    public void delete(Optional<Check> check) {
        check.ifPresent(checkRepository::delete);
    }

    public Optional<Check> findByCheckId(Long checkId) {
        return checkRepository.findByCheckId(checkId);
    }

    public List<Check> findByGroupId(Long groupId) {
        return checkRepository.findByGroupId(groupId);
    }

    // 작성중
//    public Optional<Check> agreeStudy(Optional<Check> check, Boolean isStudy, String userId) {
//        
//    }
}
