package instudy.instudy.service;

import instudy.instudy.domain.Files;
import instudy.instudy.repository.FilesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
//@Transactional
@Service
public class FilesService {

    private final FilesRepository filesRepository;

    @Autowired
    public FilesService(FilesRepository filesRepository) {
        this.filesRepository = filesRepository;
    }

    public Files saveFile(MultipartFile file) throws IOException {
        Files files = new Files();
        files.setName(file.getOriginalFilename());
        files.setData(file.getBytes());
        return filesRepository.save(files);
    }

    public Files getFile(Long id) {
        return filesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Image not found"));
    }
}