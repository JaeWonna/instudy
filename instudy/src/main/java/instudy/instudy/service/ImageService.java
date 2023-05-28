package instudy.instudy.service;

import instudy.instudy.domain.Image;
import instudy.instudy.repository.ImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@Transactional
public class ImageService {

    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Long saveImage(MultipartFile images) throws IOException {

        if (images.isEmpty()) {
            return null;
        }

        // 원래 파일 이름 추출
        String origName = images.getOriginalFilename();

        // 파일 이름으로 쓸 uuid 생성
        String uuid = UUID.randomUUID().toString();

        // 확장자 추출(ex : .png)
        String extension = origName.substring(origName.lastIndexOf("."));

        // uuid와 확장자 결합
        String savedName = uuid + extension;

        // 파일을 불러올 때 사용할 파일 경로
        // 경로 설정해야 함
        String savedPath = "경로" + savedName;

        // 파일 엔티티 생성
        Image image = Image.builder()
                .orgNm(origName)
                .savedNm(savedName)
                .savedPath(savedPath)
                .build();



        // 실제로 로컬에 uuid를 파일명으로 저장
        images.transferTo(new File(savedPath));

        // 데이터베이스에 파일 정보 저장
        Image savedFile = imageRepository.save(image);

        return savedFile.getImageId();
    }
}
