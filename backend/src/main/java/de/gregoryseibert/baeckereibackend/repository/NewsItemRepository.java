package de.gregoryseibert.baeckereibackend.repository;

import de.gregoryseibert.baeckereibackend.model.NewsItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * The NewsItemRepository interface is used to fetch NewsItem objects.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Transactional
public interface NewsItemRepository extends CrudRepository<NewsItem, Long> {
    List<NewsItem> findAll();

    NewsItem findById(long id);
}
