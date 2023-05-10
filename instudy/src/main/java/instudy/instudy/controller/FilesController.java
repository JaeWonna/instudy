package instudy.instudy.controller;

import instudy.instudy.domain.Files;
import instudy.instudy.repository.FilesRepository;
import instudy.instudy.service.FilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class FilesController {

    private final FilesService filesService;

    @Autowired
    public FilesController(FilesService filesService) {
        this.filesService = filesService;
    }

    @PostMapping("/files")
    public ResponseEntity<Files> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        Files files = filesService.saveFile(file);
        return ResponseEntity.ok(files);
    }

    @GetMapping("/files/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") Long id) {
        Files files = filesService.getFile(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + files.getName() + "\"")
                .body(files.getData());
    }
}

