package capstone.allbom.game.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Subject save(Subject subject);

    Optional<Subject> findById(Long subjectId);

    List<Subject> findByGameId(Long gameId);

    @Query("SELECT s FROM Subject s WHERE s.game.id = :gameId AND s.type = :type")
    Optional<Subject> findByGameAndType(Long gameId, SubjectType type);

    @Query("SELECT s FROM Subject s WHERE s.game.member.id = :memberId AND s.type = :type")
    Optional<Subject> findByMemberAndType(Long memberId, SubjectType type);
}
