package capstone.allbom.medicine.controller;

import capstone.allbom.medicine.domain.Medicine;
import capstone.allbom.medicine.dto.MedicineDetailResponse;
import capstone.allbom.medicine.service.MedicineService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping
@RestController
@Slf4j
public class MedicineController {

    private final MedicineService medicineService;

    @GetMapping("/medicine/{medicineId}")
    public ResponseEntity<MedicineDetailResponse> findMedicine(@PathVariable Long medicineId) {
        Medicine medicine = medicineService.findById(medicineId);
        return ResponseEntity.ok(MedicineDetailResponse.from(medicine));
    }

}
