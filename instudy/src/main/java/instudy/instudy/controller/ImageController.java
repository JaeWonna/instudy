package instudy.instudy.controller;

import instudy.instudy.domain.Image;
import instudy.instudy.repository.ImageRepository;
import instudy.instudy.service.ImageService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.io.IOException;

@CrossOrigin(origins = "*")
@RestController
public class ImageController {

    private final ImageService imageService;
    private final ImageRepository imageRepository;

    public ImageController(ImageService imageService, ImageRepository imageRepository) {
        this.imageService = imageService;
        this.imageRepository = imageRepository;
    }

    // 이미지 업로드 (서버에 저장)
    @RequestMapping(value = "/image/upload", method = RequestMethod.POST)
    public Long uploadImage(@RequestParam("image") MultipartFile image) throws IOException {
//    public String uploadImage(@RequestParam("image") MultipartFile image, @RequestParam("images") List<MultipartFile> images) throws IOException {
        System.out.print(image);

//        for (MultipartFile multipartFile : images) {
//            imageService.saveImage(multipartFile);
//        }

        return imageService.saveImage(image);
    }

    // 이미지 출력
    @RequestMapping(value = "/image/{imageId}", method = RequestMethod.POST)
    public  Resource readImage(@PathVariable("imageId") Long id) throws IOException {
        Image image = imageRepository.findById(id).orElse(null);
        assert image != null; // image가 null인지 확인하기 위해.. null이면 AssertionError 발생
        return new UrlResource("file:" + image.getSavedPath());
    }

}
