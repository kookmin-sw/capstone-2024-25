package capstone.allbom.medicine.domain;

import capstone.allbom.member.domaiin.Member;

import java.util.List;
import java.util.Optional;

public interface MedicineRepository {

    Medicine save(Medicine medicine);

    Optional<Medicine> findById(Long medicineId);

    Optional<Medicine> findByMemberId(Long memberId); // 일반 로그인 아이디로 찾기

    boolean existsById(Long id);

    List<Medicine> findAll();
}
