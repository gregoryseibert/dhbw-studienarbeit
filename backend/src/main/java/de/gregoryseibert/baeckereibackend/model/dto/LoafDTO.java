package de.gregoryseibert.baeckereibackend.model.dto;

import de.gregoryseibert.baeckereibackend.model.Weekday;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

/**
 * The LoafDTO class represents a DTO for Loaf.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Data
@EqualsAndHashCode(callSuper = true)
public class LoafDTO extends BakedGoodDTO {
    private List<Weekday> daysOfProduction;
}
