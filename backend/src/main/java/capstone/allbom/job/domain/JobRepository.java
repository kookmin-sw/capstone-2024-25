package capstone.allbom.job.domain;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query("SELECT j FROM Job j WHERE j.deadline >= current_date() AND j.latitude BETWEEN :southWestLatitude AND :northEastLatitude AND j.longitude BETWEEN :southWestLongitude AND :northEastLongitude")
    List<Job> findJobsInRectangle(@Param("southWestLatitude") Double southWestLatitude,
                                             @Param("southWestLongitude") Double southWestLongitude,
                                             @Param("northEastLatitude") Double northEastLatitude,
                                             @Param("northEastLongitude") Double northEastLongitude);

    @Query("SELECT j FROM Job j WHERE j.province = :province AND j.deadline >= current_date()" +
            "ORDER BY (6371 * ACOS(SIN(RADIANS(:latitude)) * SIN(RADIANS(j.latitude)) " +
            "+ COS(RADIANS(:latitude)) * COS(RADIANS(j.latitude)) * COS(RADIANS(j.longitude) - RADIANS(:longitude))))")
    List<Job> findJobsOrderByAddress(@Param("province") Province province,
                                          @Param("latitude") Double latitude,
                                          @Param("longitude") Double longitude);

    @Query("SELECT j FROM Job j WHERE j.province = :province AND j.deadline >= current_date() ORDER BY (6371 * ACOS(COS(RADIANS(:latitude)) * COS(RADIANS(j.latitude)) * COS(RADIANS(j.longitude) - RADIANS(:longitude)) + SIN(RADIANS(:latitude)) * SIN(RADIANS(j.latitude))))")
    List<Job> findJobsOrderByAddressPagination(@Param("province") Province province,
                                          @Param("latitude") Double latitude,
                                          @Param("longitude") Double longitude,
                                          Pageable pageable);


    @Query("SELECT j FROM Job j WHERE j.province = :province AND j.deadline >= current_date() ORDER BY j.deadline ASC")
    List<Job> findJobsOrderByDeadline(@Param("province") Province province);

    @Query("SELECT j FROM Job j WHERE j.province = :province AND j.deadline >= current_date() ORDER BY j.deadline ASC")
    List<Job> findJobsOrderByDeadlinePagination(@Param("province") Province province,
                                          Pageable pageable);

    @Query("SELECT j FROM Job j WHERE j.province = :province AND j.occupation LIKE %:occupation% AND j.deadline >= current_date() ORDER BY j.deadline ASC")
    List<Job> findByOccupationContaining(@Param("province") Province province,
                                         Pageable pageable, String occupation);
}
