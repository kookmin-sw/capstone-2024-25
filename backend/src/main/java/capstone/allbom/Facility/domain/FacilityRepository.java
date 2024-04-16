package capstone.allbom.facility.domain;

import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FacilityRepository extends JpaRepository<Facility, Long> {
    Facility save(Facility facility);

    Optional<Facility> findById(Long facilityId);

    boolean existsById(Long id);

    List<Facility> findByType(FacilityType type); // 해당 시설유형의 모든 시설 객체 반환

    List<Facility> findAll();

    @Query("SELECT f FROM Facility f WHERE f.latitude BETWEEN :southWestLatitude AND :northEastLatitude AND f.longitude BETWEEN :southWestLongitude AND :northEastLongitude")
    List<Facility> findFacilitiesInRectangle(@Param("southWestLatitude") Double southWestLatitude,
                                             @Param("southWestLongitude") Double southWestLongitude,
                                             @Param("northEastLatitude") Double northEastLatitude,
                                             @Param("northEastLongitude") Double northEastLongitude);

    @Query("SELECT f FROM Facility f WHERE f.latitude BETWEEN :southWestLatitude AND :northEastLatitude AND f.longitude BETWEEN :southWestLongitude AND :northEastLongitude AND f.type = :facilityType")
    List<Facility> findFacilitiesInRectangleAndType(@Param("southWestLatitude") Double southWestLatitude,
                                                    @Param("southWestLongitude") Double southWestLongitude,
                                                    @Param("northEastLatitude") Double northEastLatitude,
                                                    @Param("northEastLongitude") Double northEastLongitude,
                                                    @Param("facilityType") FacilityType facilityType);
}
