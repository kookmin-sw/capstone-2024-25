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

@RequiredArgsConstructor
@RequestMapping
@RestController
@Slf4j
public class MedicineController {

    private final MedicineService medicineService;

    @GetMapping("/medicines")
    public String example(){
        return "hihi";
    }

    @GetMapping("/medicine/{medicineId}")
    public ResponseEntity<MedicineDetailResponse> findMedicine(@PathVariable Long medicineId) {
        Medicine medicine = medicineService.findById(medicineId);
        return ResponseEntity.ok(MedicineDetailResponse.from(medicine));
    }

    @PostMapping("/medicine")
//    public ResponseEntity<Void> saveMedicine(@Member Long memberId, @RequestBody MedicineRequest medicineRequest) {
    public ResponseEntity<Void> saveMedicine(@Auth Member member, @RequestBody MedicineRequest medicineRequest) {
        Long medicineId = medicineService.saveMedicine(member, medicineRequest);
        return ResponseEntity.ok()
                .build();
    }
    /**
     * TODO
     * medicine post할 때 memberId 전달방식 고려
     */

}
