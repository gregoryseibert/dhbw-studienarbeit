package de.gregoryseibert.baeckereibackend.repository;

import de.gregoryseibert.baeckereibackend.model.CerealMixPercentage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

/**
 * The CerealMixPercentageRepository interface is used to fetch CerealMixPercentage objects.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@Transactional
public interface CerealMixPercentageRepository extends CrudRepository<CerealMixPercentage, Long> {
}
