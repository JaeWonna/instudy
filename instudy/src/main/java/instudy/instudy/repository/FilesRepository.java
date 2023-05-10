package instudy.instudy.repository;

import instudy.instudy.domain.Files;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FilesRepository extends JpaRepository<Files, Long> {

    Files save(Files files);

    Optional<Files> findById(Long files);


}
