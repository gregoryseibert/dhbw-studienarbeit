package de.gregoryseibert.baeckereibackend.controller;

import de.gregoryseibert.baeckereibackend.service.FileSystemStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The PictureController class implements a rest endpoint to fetch a picture from the disk.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@RestController
@RequestMapping("/picture")
public class PictureController {
    @Autowired
    private FileSystemStorageService fileService;

    /**
     * A rest endpoint to get a specific Loaf object by id.
     *
     * @param filename The filename of the picture
     * @return The picture
     */
    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getPictureByFilename(@PathVariable String filename) {
        Resource resource = fileService.loadAsResource(filename);

        HttpHeaders headers = new HttpHeaders();
        headers.setCacheControl(CacheControl.noCache().getHeaderValue());
        headers.setContentType(MediaType.IMAGE_JPEG);

        return new ResponseEntity<>(resource, headers, HttpStatus.OK);

    }
}
