package de.gregoryseibert.baeckereibackend.model.dto;

import lombok.Data;

/**
 * The NewsItemDTO class represents a DTO for NewsItem.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Data
public class NewsItemDTO {
    private String title;

    private String content;
}
