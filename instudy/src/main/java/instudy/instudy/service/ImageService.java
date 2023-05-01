package instudy.instudy.service;

import instudy.instudy.domain.Image;
//import instudy.instudy.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageService {
//    @Autowired
//    private ImageRepository imageRepository;

    public void saveImage(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Image image = new Image();
        image.setName(fileName);
        image.setData(file.getBytes());
//        imageRepository.save(image);
    }
}

