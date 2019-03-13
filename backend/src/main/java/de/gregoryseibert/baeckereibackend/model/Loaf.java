package de.gregoryseibert.baeckereibackend.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.List;

/**
 * The Loaf class represents a loaf.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class Loaf extends BakedGood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NotEmpty
    @ElementCollection
    private List<Weekday> daysOfProduction;
}
