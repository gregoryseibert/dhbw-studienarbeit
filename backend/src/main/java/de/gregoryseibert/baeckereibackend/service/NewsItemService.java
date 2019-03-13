package de.gregoryseibert.baeckereibackend.service;

import de.gregoryseibert.baeckereibackend.model.NewsItem;
import de.gregoryseibert.baeckereibackend.model.dto.NewsItemDTO;
import de.gregoryseibert.baeckereibackend.model.exception.NotFoundException;
import de.gregoryseibert.baeckereibackend.repository.NewsItemRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * The NewsItemService class is used to create and get NewsItem objects.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Service
public class NewsItemService {
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private FileSystemStorageService storageService;

    @Autowired
    private NewsItemRepository newsItemRepository;

    public NewsItem createNewsItem(NewsItemDTO newsItemDTO) {
        NewsItem newsItem = modelMapper.map(newsItemDTO, NewsItem.class);

        return newsItemRepository.save(newsItem);
    }

    public List<NewsItem> getAllNewsItems() {
        List<NewsItem> newsItemList = newsItemRepository.findAll();

        if (newsItemList.isEmpty()) {
            throw new NotFoundException("There was no news item to be found.");
        }

        return newsItemList;
    }

    public NewsItem getNewsItemById(long id) {
        NewsItem newsItem = newsItemRepository.findById(id);

        if (newsItem == null) {
            throw new NotFoundException(String.format("There was no news item with the id %d to be found.", id));
        }

        return newsItem;
    }

    public NewsItem updateNewsItem(long id, NewsItemDTO newsItemDTO) {
        NewsItem existingOffer = getNewsItemById(id);

        modelMapper.map(newsItemDTO, existingOffer);

        return newsItemRepository.save(existingOffer);
    }

    public NewsItem updateNewsItemPicture(long id, MultipartFile pictureFile) {
        NewsItem existingNewsItem = getNewsItemById(id);

        deleteNewsItemPicture(existingNewsItem.getPictureFilename());

        String filename = storageService.store(pictureFile);

        existingNewsItem.setPictureFilename(filename);

        return newsItemRepository.save(existingNewsItem);
    }

    public void deleteNewsItemById(long id) {
        NewsItem newsItem = getNewsItemById(id);

        deleteNewsItemPicture(newsItem.getPictureFilename());

        newsItemRepository.delete(newsItem);
    }

    private void deleteNewsItemPicture(String currentFilename) {
        if (currentFilename != null && currentFilename.length() > 0) {
            storageService.delete(currentFilename);
        }
    }
}
