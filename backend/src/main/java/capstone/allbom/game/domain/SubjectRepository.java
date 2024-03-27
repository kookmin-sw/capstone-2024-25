package capstone.allbom.game.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Subject save(Subject subject);

    Optional<Subject> findById(Long subjectId);

    List<Subject> findByGameId(Long gameId);

    Optional<Subject> findByGameAndType(Long gameId, SubjectType type);
}
