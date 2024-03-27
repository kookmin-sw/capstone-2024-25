package capstone.allbom.game.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HistoryRepository extends JpaRepository<History, Long> {
    History save(History history);

    Optional<History> findById(Long historyId);

    Optional<History> findByGameId(Long gameId);
}
