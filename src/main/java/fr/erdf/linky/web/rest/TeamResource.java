package fr.erdf.linky.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.erdf.linky.domain.Team;
import fr.erdf.linky.repository.TeamRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Team.
 */
@RestController
@RequestMapping("/api")
public class TeamResource {

    private final Logger log = LoggerFactory.getLogger(TeamResource.class);

    @Inject
    private TeamRepository teamRepository;

    /**
     * POST  /teams -> Create a new team.
     */
    @RequestMapping(value = "/teams",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> create(@Valid @RequestBody Team team) throws URISyntaxException {
        log.debug("REST request to save Team : {}", team);
        if (team.getId() != null) {
            return ResponseEntity.badRequest().header("Failure", "A new team cannot already have an ID").build();
        }
        teamRepository.save(team);
        return ResponseEntity.created(new URI("/api/teams/" + team.getId())).build();
    }

    /**
     * PUT  /teams -> Updates an existing team.
     */
    @RequestMapping(value = "/teams",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> update(@Valid @RequestBody Team team) throws URISyntaxException {
        log.debug("REST request to update Team : {}", team);
        if (team.getId() == null) {
            return create(team);
        }
        teamRepository.save(team);
        return ResponseEntity.ok().build();
    }

    /**
     * GET  /teams -> get all the teams.
     */
    @RequestMapping(value = "/teams",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Team> getAll() {
        log.debug("REST request to get all Teams");
        return teamRepository.findAll();
    }

    /**
     * GET  /teams/:id -> get the "id" team.
     */
    @RequestMapping(value = "/teams/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Team> get(@PathVariable String id) {
        log.debug("REST request to get Team : {}", id);
        return Optional.ofNullable(teamRepository.findOne(id))
            .map(team -> new ResponseEntity<>(
                team,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /teams/:id -> delete the "id" team.
     */
    @RequestMapping(value = "/teams/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void delete(@PathVariable String id) {
        log.debug("REST request to delete Team : {}", id);
        teamRepository.delete(id);
    }
}
