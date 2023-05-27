package instudy.instudy.controller;

import instudy.instudy.service.ImageService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @RequestMapping(value = "/image/upload", method = RequestMethod.POST)
    public String uploadImage(@RequestParam("image") MultipartFile image) throws IOException {
//    public String uploadImage(@RequestParam("image") MultipartFile image, @RequestParam("images") List<MultipartFile> images) throws IOException {
        imageService.saveImage(image);

//        for (MultipartFile multipartFile : images) {
//            imageService.saveImage(multipartFile);
//        }

        return "upload";
    }

}
