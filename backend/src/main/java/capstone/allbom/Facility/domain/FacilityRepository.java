package capstone.allbom.Facility.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FacilityRepository extends JpaRepository<Facility, Long> {
    Facility save(Facility facility);

    Optional<Facility> findById(Long facilityId);

    boolean existsById(Long id);

    List<Facility> findByType(FacilityType type); // 해당 시설유형의 모든 시설 객체 반환

    List<Facility> findAll();
}
