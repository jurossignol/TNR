package fr.erdf.linky.repository;

import fr.erdf.linky.domain.Team;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Team entity.
 */
public interface TeamRepository extends MongoRepository<Team,String> {

}
