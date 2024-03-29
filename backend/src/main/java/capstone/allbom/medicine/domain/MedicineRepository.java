package capstone.allbom.medicine.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    Medicine save(Medicine medicine);

    Optional<Medicine> findById(Long medicineId);

    List<Medicine> findByMemberId(Long memberId);

    boolean existsById(Long id);

    List<Medicine> findAll();

    void deleteById(Long medicineId);
}
