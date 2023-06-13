package instudy.instudy.repository;

import instudy.instudy.domain.CheckingComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckingCommentRepository extends JpaRepository<CheckingComment, Long> {

    CheckingComment findByCheckingCommentId(Long commentId); // 기본키 아이디로 단품 하나 가져오기(읽기)

    List<CheckingComment> findByCheckingId(Long checkingId); // 인증 페이지 아이디로 여러개 가져오기(읽기)

    // save(생성)과 delete(삭제)는 기본이므로 생략
}
