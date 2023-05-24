package instudy.instudy.service;

import instudy.instudy.domain.Checking;
import instudy.instudy.repository.CheckingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CheckingService {

    private final CheckingRepository checkingRepository;

    public CheckingService(CheckingRepository checkingRepository) {
        this.checkingRepository = checkingRepository;
    }

    public void create(Checking newChecking) {
        checkingRepository.save(newChecking);
    }

    public void delete(Checking checking) {
        checkingRepository.delete(checking);
    }

    public Checking findByCheckingId(Long checkingId) {
        return checkingRepository.findByCheckingId(checkingId);
    }

    public List<Checking> findByGroupId(Long groupId) {
        return checkingRepository.findByGroupId(groupId);
    }

    // 작성중
//    public Optional<Check> agreeStudy(Optional<Check> check, Boolean isStudy, String userId) {
//        
//    }
}
