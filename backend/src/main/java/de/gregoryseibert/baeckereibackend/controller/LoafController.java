package de.gregoryseibert.baeckereibackend.controller;

import de.gregoryseibert.baeckereibackend.model.Loaf;
import de.gregoryseibert.baeckereibackend.model.dto.LoafDTO;
import de.gregoryseibert.baeckereibackend.service.LoafService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * The LoafController class implements rest endpoints to create, get and modify Loaf objects.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@RestController
@RequestMapping("/loaf")
public class LoafController {
    @Autowired
    private LoafService loafService;

    /**
     * A rest endpoint to create a Loaf object.
     *
     * @param loafDTO The Loaf object to be created
     * @return The Loaf object which was created
     */
    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Loaf createLoaf(@RequestBody LoafDTO loafDTO) {
        return loafService.createLoaf(loafDTO);
    }

    /**
     * A rest endpoint to get every Loaf object.
     *
     * @return The list of Loaf objects
     */
    @GetMapping
    public List<Loaf> getAllLoafs() {
        return loafService.getAllLoafs();
    }

    /**
     * A rest endpoint to get a specific Loaf object by id.
     *
     * @param id The id to search for
     * @return The Loaf object which was found
     */
    @GetMapping("/{id}")
    public Loaf getLoafById(@PathVariable long id) {
        return loafService.getLoafById(id);
    }

    /**
     * A rest endpoint to update a Loaf object.
     *
     * @param id      The id of the Loaf object to be updated
     * @param loafDTO The LoafDTO object with the variables to be updated
     * @return The Loaf object which was updated
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Loaf updateLoaf(@PathVariable long id, @RequestBody LoafDTO loafDTO) {
        return loafService.updateLoaf(id, loafDTO);
    }

    /**
     * A rest endpoint to update the picture of a Loaf object.
     *
     * @param id          The id of the Loaf object to be updated
     * @param pictureFile The picture file to be updated
     * @return The Loaf object which was updated
     */
    @PutMapping("/{id}/picture")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Loaf updateLoafPicture(@PathVariable long id, @RequestParam("picture") MultipartFile pictureFile) {
        return loafService.updateLoafPicture(id, pictureFile);
    }

    /**
     * A rest endpoint to delete a specific Loaf object by id.
     *
     * @param id The id to search for
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteLoafById(@PathVariable long id) {
        loafService.deleteLoafById(id);
    }
}
