package capstone.allbom.game.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SocietyRepository extends JpaRepository<History, Long> {
    Legislation save(Legislation legislation);

    Optional<Legislation> findById(Long legislationId);

    Optional<Legislation> findByGameId(Long gameId);
}
