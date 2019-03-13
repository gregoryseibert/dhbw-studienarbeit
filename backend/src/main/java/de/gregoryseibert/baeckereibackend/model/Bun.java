package de.gregoryseibert.baeckereibackend.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * The Bun class represents a bun.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class Bun extends BakedGood {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
