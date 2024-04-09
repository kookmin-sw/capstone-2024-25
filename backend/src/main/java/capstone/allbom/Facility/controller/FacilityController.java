package capstone.allbom.Facility.controller;

import capstone.allbom.Facility.domain.Facility;
import capstone.allbom.Facility.infrastructure.api.RestTemplateFacilityRequester;
import capstone.allbom.medicine.dto.MedicineDetailResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping
@RestController
@Slf4j
@Transactional
public class FacilityController {

    private final RestTemplateFacilityRequester restTemplateFacilityRequester;

    @GetMapping("/facilities")
    public ResponseEntity<List<Facility>> example() {
        List<Facility> facilities = restTemplateFacilityRequester.requestFacility();
        return ResponseEntity.ok(facilities);
    }
}
