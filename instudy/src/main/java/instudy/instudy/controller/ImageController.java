package instudy.instudy.controller;

import instudy.instudy.domain.Feed;
import instudy.instudy.domain.Image;
import instudy.instudy.repository.ImageRepository;
import instudy.instudy.service.ImageService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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

    // 이미지 출력 (이미지 경로 반환)
    @RequestMapping(value = "/image/{imageId}", method = RequestMethod.POST)
    public String readImage(@RequestBody Map<String, String> paramMap){
        Long imageId = Long.parseLong(paramMap.get("imageId"));
        System.out.println(imageService.findByImageId(imageId).getSavedPath());
        return imageService.findByImageId(imageId).getSavedPath();
    }


    // 이미지 출력
//    @GetMapping(value = "/image/{imageId}", produces = MediaType.IMAGE_JPEG_VALUE)
//    @ResponseBody
//    public ResponseEntity<Resource> readImage(@PathVariable("imageId") Long id) throws IOException {
//        Image image = imageRepository.findById(id).orElse(null);
//        if (image == null) {
//            throw new IllegalArgumentException("Image not found for id: " + id);
//        }
//        Resource imageResource = new UrlResource("file:" + image.getSavedPath());
//        return ResponseEntity.ok()
//                .contentType(MediaType.IMAGE_JPEG)
//                .body(imageResource);
//    }

    // 이미지 출력
//    @RequestMapping(value = "/image/{imageId}", method = RequestMethod.POST)
//    public  Resource readImage(@PathVariable("imageId") Long id) throws IOException {
//        Image image = imageRepository.findById(id).orElse(null);
//        assert image != null; // image가 null인지 확인하기 위해.. null이면 AssertionError 발생
//        return new UrlResource("file:" + image.getSavedPath());
//    }



}
