package capstone.allbom.routine.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoutineRepository extends JpaRepository<Routine, Long> {
    Routine save(Routine routine);

    Optional<Routine> findById(Long routineId);

    Optional<Routine> findByMemberId(Long memberId);

    boolean existsById(Long id);

    List<Routine> findAll();
}
