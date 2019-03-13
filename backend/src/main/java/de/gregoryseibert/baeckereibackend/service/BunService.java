package de.gregoryseibert.baeckereibackend.service;

import de.gregoryseibert.baeckereibackend.model.Bun;
import de.gregoryseibert.baeckereibackend.model.dto.BunDTO;
import de.gregoryseibert.baeckereibackend.model.exception.NotFoundException;
import de.gregoryseibert.baeckereibackend.repository.BunRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * The BunService class is used to create, modify and get Bun objects.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Service
public class BunService {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private FileSystemStorageService storageService;

    @Autowired
    private BunRepository bunRepository;

    public Bun createBun(BunDTO bunDTO) {
        Bun bun = modelMapper.map(bunDTO, Bun.class);

        return bunRepository.save(bun);
    }

    public List<Bun> getAllBuns() {
        List<Bun> bunList = bunRepository.findAll();

        if (bunList.isEmpty()) {
            throw new NotFoundException("There was no bun to be found.");
        }

        return bunList;
    }

    public Bun getBunById(long id) {
        Bun bun = bunRepository.findById(id);

        if (bun == null) {
            throw new NotFoundException(String.format("There was no bun with the id %d to be found.", id));
        }

        return bun;
    }

    public Bun getBunByName(String name) {
        Bun bun = bunRepository.findByName(name);

        if (bun == null) {
            throw new NotFoundException(String.format("There was no bun with the name '%s' to be found.", name));
        }

        return bun;
    }

    public Bun updateBun(long id, BunDTO bunDTO) {
        Bun existingBun = getBunById(id);

        modelMapper.map(bunDTO, existingBun);

        return bunRepository.save(existingBun);
    }

    public Bun updateBunPicture(long id, MultipartFile pictureFile) {
        Bun existingBun = getBunById(id);

        deleteBunPicture(existingBun.getPictureFilename());

        String filename = storageService.store(pictureFile);

        existingBun.setPictureFilename(filename);

        return bunRepository.save(existingBun);
    }

    public void deleteBunById(long id) {
        Bun bun = getBunById(id);

        deleteBunPicture(bun.getPictureFilename());

        bunRepository.delete(bun);
    }

    private void deleteBunPicture(String currentFilename) {
        if (currentFilename != null && currentFilename.length() > 0) {
            storageService.delete(currentFilename);
        }
    }
}
