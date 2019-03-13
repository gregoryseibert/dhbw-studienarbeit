package de.gregoryseibert.baeckereibackend.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.List;

/**
 * The Ingredient class represents an ingredient of a baked good.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Data
@Entity
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    private String name;

    @Enumerated(EnumType.STRING)
    @ElementCollection
    private List<AllergyType> allergyTypes;
}
