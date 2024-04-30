package capstone.allbom.medicine.controller;

import capstone.allbom.common.jwt.Auth;
import capstone.allbom.medicine.domain.Medicine;
import capstone.allbom.medicine.dto.MedicineDetailResponse;
import capstone.allbom.medicine.service.MedicineService;
import capstone.allbom.medicine.service.dto.MedicineRequest;
import capstone.allbom.member.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
@Slf4j
public class MedicineController implements MedicineControllerDocs{

    private final MedicineService medicineService;

    @GetMapping("/medicine/{medicineId}")
    public ResponseEntity<MedicineDetailResponse> findMedicine(
            @Auth Member member,
            @PathVariable Long medicineId
    ) {
        Medicine medicine = medicineService.findById(member.getId(), medicineId);
        return ResponseEntity.ok(MedicineDetailResponse.from(medicine));
    }

    @PatchMapping("/medicine/{medicineId}")
    public ResponseEntity<Void> updateMedicine(
            @Auth Member member,
            @PathVariable Long medicineId,
            @RequestBody final MedicineRequest medicineRequest
    ) {
        medicineService.updateMedicine(member, medicineId, medicineRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/medicine/{medicineId}")
    public ResponseEntity<Void> deleteMedicine(
            @Auth Member member,
            @PathVariable Long medicineId
    ) {
        medicineService.deleteMedicine(member, medicineId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/medicine")
    public ResponseEntity<List<MedicineDetailResponse>> findAllMedicine(@Auth Member member) {
        List<MedicineDetailResponse> medicines = medicineService.findByMemberId(member);
        return ResponseEntity.ok(medicines);
    }

    @PostMapping("/medicine")
    public ResponseEntity<Void> saveMedicine(@Auth Member member, @RequestBody MedicineRequest medicineRequest) {
        Long medicineId = medicineService.saveMedicine(member, medicineRequest);
        return ResponseEntity.ok()
                .build();
    }
    /**
     * TODO
     * Accessor 클래스 생성하여 memberId, authority만 부여
     * @Auth Member로 Member 객체 전체를 받는게 아닌 @Auth Accessor로 제한된 정보 제공하도록 변경
     */
}
