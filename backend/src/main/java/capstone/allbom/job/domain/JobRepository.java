package capstone.allbom.job.domain;

import capstone.allbom.facility.domain.Facility;
import capstone.allbom.facility.domain.FacilityType;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface JobRepository extends JpaRepository<Job, Long> {

    Job save(Job job);

    Optional<Job> findById(Long jobId);

    boolean existsById(Long id);

    List<Job> findByProvince(Province province); // 해당 도시의 모든 일자리 객체 반환

    List<Job> findAll();

    @Query("SELECT j FROM Job j WHERE j.latitude BETWEEN :southWestLatitude AND :northEastLatitude AND j.longitude BETWEEN :southWestLongitude AND :northEastLongitude")
    List<Job> findJobsInRectangle(@Param("southWestLatitude") Double southWestLatitude,
                                             @Param("southWestLongitude") Double southWestLongitude,
                                             @Param("northEastLatitude") Double northEastLatitude,
                                             @Param("northEastLongitude") Double northEastLongitude);
}
