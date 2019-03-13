package de.gregoryseibert.baeckereibackend.service;

import de.gregoryseibert.baeckereibackend.model.Loaf;
import de.gregoryseibert.baeckereibackend.model.dto.LoafDTO;
import de.gregoryseibert.baeckereibackend.model.exception.NotFoundException;
import de.gregoryseibert.baeckereibackend.repository.LoafRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * The LoafService class is used to create, modify and get Loaf objects.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Service
public class LoafService {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private FileSystemStorageService storageService;

    @Autowired
    private LoafRepository loafRepository;

    public Loaf createLoaf(LoafDTO loafDTO) {
        Loaf loaf = modelMapper.map(loafDTO, Loaf.class);

        return loafRepository.save(loaf);
    }

    public List<Loaf> getAllLoafs() {
        List<Loaf> loafList = loafRepository.findAll();

        if (loafList.isEmpty()) {
            throw new NotFoundException("There was no loaf to be found.");
        }

        return loafList;
    }

    public Loaf getLoafById(long id) {
        Loaf loaf = loafRepository.findById(id);

        if (loaf == null) {
            throw new NotFoundException(String.format("There was no loaf with the id %d to be found.", id));
        }

        return loaf;
    }

    public Loaf getLoafByName(String name) {
        Loaf loaf = loafRepository.findByName(name);

        if (loaf == null) {
            throw new NotFoundException(String.format("There was no loaf with the name '%s' to be found.", name));
        }

        return loaf;
    }

    public Loaf updateLoaf(long id, LoafDTO loafDTO) {
        Loaf existingLoaf = getLoafById(id);

        modelMapper.map(loafDTO, existingLoaf);

        //manually update daysOfProduction because modelmapper won't do that
        if (loafDTO.getDaysOfProduction() != null) {
            existingLoaf.setDaysOfProduction(loafDTO.getDaysOfProduction());
        }

        return loafRepository.save(existingLoaf);
    }

    public Loaf updateLoafPicture(long id, MultipartFile pictureFile) {
        Loaf existingLoaf = getLoafById(id);

        String filename = storageService.store(pictureFile);

        deleteLoafPicture(existingLoaf.getPictureFilename());
        
        existingLoaf.setPictureFilename(filename);

        return loafRepository.save(existingLoaf);
    }

    public void deleteLoafById(long id) {
        Loaf loaf = getLoafById(id);

        deleteLoafPicture(loaf.getPictureFilename());

        loafRepository.delete(loaf);
    }

    private void deleteLoafPicture(String currentFilename) {
        if (currentFilename != null && currentFilename.length() > 0) {
            storageService.delete(currentFilename);
        }
    }
}
