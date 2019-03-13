package de.gregoryseibert.baeckereibackend.controller;

import de.gregoryseibert.baeckereibackend.model.Bun;
import de.gregoryseibert.baeckereibackend.model.dto.BunDTO;
import de.gregoryseibert.baeckereibackend.service.BunService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * The BunController class implements rest endpoints to create, get and modify Bun objects.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@RestController
@RequestMapping("/bun")
public class BunController {
    @Autowired
    private BunService bunService;

    /**
     * A rest endpoint to create a Bun object.
     *
     * @param bunDTO The Bun object to be created
     * @return The Bun object which was created
     */
    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Bun createBun(@RequestBody BunDTO bunDTO) {
        return bunService.createBun(bunDTO);
    }

    /**
     * A rest endpoint to get every Bun object.
     *
     * @return The list of Bun objects
     */
    @GetMapping
    public List<Bun> getAllBuns() {
        return bunService.getAllBuns();
    }

    /**
     * A rest endpoint to get a specific Bun object by id.
     *
     * @param id The id to search for
     * @return The Bun object which was found
     */
    @GetMapping("/{id}")
    public Bun getBunById(@PathVariable int id) {
        return bunService.getBunById(id);
    }

    /**
     * A rest endpoint to update a Bun object.
     *
     * @param id     The id of the Bun object to be updated
     * @param bunDTO The BunDTO object with the variables to be updated
     * @return The Bun object which was updated
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Bun updateBun(@PathVariable int id, @RequestBody BunDTO bunDTO) {
        return bunService.updateBun(id, bunDTO);
    }

    /**
     * A rest endpoint to update the picture of a Bun object.
     *
     * @param id          The id of the Bun object to be updated
     * @param pictureFile The picture file to be updated
     * @return The Bun object which was updated
     */
    @PutMapping("/{id}/picture")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Bun updateBunPicture(@PathVariable long id, @RequestParam("picture") MultipartFile pictureFile) {
        return bunService.updateBunPicture(id, pictureFile);
    }

    /**
     * A rest endpoint to delete a specific Bun object by id.
     *
     * @param id The id to search for
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteBunById(@PathVariable int id) {
        bunService.deleteBunById(id);
    }
}
