package de.gregoryseibert.baeckereibackend.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/**
 * The CerealMixPercentage class represents the percentage of a specific cereal in a baked good.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Data
@Entity
public class CerealMixPercentage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    private Ingredient ingredient;

    @Min(1)
    @Max(100)
    @NotNull
    private Integer percentage;
}
