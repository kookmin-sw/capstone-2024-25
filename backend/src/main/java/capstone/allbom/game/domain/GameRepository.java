package capstone.allbom.game.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GameRepository extends JpaRepository<Game, Long> {
    Game save(Game game);

    Optional<Game> findById(Long gameId);

    Optional<Game> findByMemberId(Long memberId);
}
