package de.gregoryseibert.baeckereibackend.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

/**
 * The NewsItem class represents a news item.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Data
@Entity
public class NewsItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    private String title;

    @Lob
    private String content;

    private String pictureFilename;
}
