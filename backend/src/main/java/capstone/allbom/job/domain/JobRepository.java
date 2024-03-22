package capstone.allbom.job.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {

    Job save(Job job);

    Optional<Job> findById(Long jobId);

    boolean existsById(Long id);

    List<Job> findByProvince(Province province); // 해당 도시의 모든 일자리 반환

    List<Job> findAll();
}
