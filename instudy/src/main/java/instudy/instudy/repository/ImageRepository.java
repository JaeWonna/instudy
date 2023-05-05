package instudy.instudy.repository;

import instudy.instudy.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {

    Image save(Image image);

    Optional<Image> findById(Long image);


}
