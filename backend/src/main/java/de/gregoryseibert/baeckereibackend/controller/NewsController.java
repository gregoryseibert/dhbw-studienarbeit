package de.gregoryseibert.baeckereibackend.controller;

import de.gregoryseibert.baeckereibackend.model.NewsItem;
import de.gregoryseibert.baeckereibackend.model.dto.NewsItemDTO;
import de.gregoryseibert.baeckereibackend.service.NewsItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * The NewsController class implements rest endpoints to create, get and modify NewsItem objects.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@RestController
@RequestMapping("/news")
public class NewsController {
    @Autowired
    private NewsItemService newsItemService;

    /**
     * A rest endpoint to create an NewsItem object.
     *
     * @param newsItemDTO The NewsItem object to be created
     * @return The NewsItem object which was created
     */
    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public NewsItem createNewsItem(@RequestBody NewsItemDTO newsItemDTO) {
        return newsItemService.createNewsItem(newsItemDTO);
    }

    /**
     * A rest endpoint to get every NewsItem object.
     *
     * @return The list of NewsItem objects
     */
    @GetMapping
    public List<NewsItem> getAllNewsItems() {
        return newsItemService.getAllNewsItems();
    }

    /**
     * A rest endpoint to update an NewsItem object.
     *
     * @param id          The id of the NewsItem object to be updated
     * @param newsItemDTO The NewsItemDTO object with the variables to be updated
     * @return The NewsItem object which was updated
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public NewsItem updateNewsItem(@PathVariable int id, @RequestBody NewsItemDTO newsItemDTO) {
        return newsItemService.updateNewsItem(id, newsItemDTO);
    }

    /**
     * A rest endpoint to update the picture of an NewsItem object.
     *
     * @param id          The id of the NewsItem object to be updated
     * @param pictureFile The picture file to be updated
     * @return The NewsItem object which was updated
     */
    @PutMapping("/{id}/picture")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public NewsItem updateNewsItemPicture(@PathVariable long id, @RequestParam("picture") MultipartFile pictureFile) {
        return newsItemService.updateNewsItemPicture(id, pictureFile);
    }

    /**
     * A rest endpoint to delete a specific NewsItem object by id.
     *
     * @param id The id to search for
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteNewsItemById(@PathVariable int id) {
        newsItemService.deleteNewsItemById(id);
    }
}