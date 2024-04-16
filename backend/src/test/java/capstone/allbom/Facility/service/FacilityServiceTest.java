package capstone.allbom.facility.service;

import capstone.allbom.medicine.domain.Medicine;
import capstone.allbom.medicine.domain.MedicineRepository;
import capstone.allbom.medicine.service.MedicineService;
import capstone.allbom.medicine.service.dto.MedicineRequest;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class FacilityServiceTest {
    @Autowired
    EntityManager entityManager;
    @Autowired FacilityService facilityService;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    MedicineRepository medicineRepository;
    @Autowired
    MedicineService medicineService;

    @Test
    void 특정_범위의_위경도로_시설들을_조회한다() {
//        //given
//        Double SWlatitude = 37.5566;
//        Double SWlongitude = 127.0733;
//        Double NElatitude = 37.5671;
//        Double NElongitude = 127.0886;
//
//        //when
//        facilityService.getFacilities(SWlatitude, SWlongitude, NElatitude, NElongitude);

        MedicineRequest medicineRequest = new MedicineRequest(
                "지르텍",
                Arrays.asList("아침", "점심")
        );
        // given
        Member member = new Member();
        Member memberSaved = memberRepository.save(member);

        // when
        Long medicineId = medicineService.saveMedicine(memberSaved, medicineRequest);
        Medicine medicine = medicineRepository.findById(medicineId).get();

        // then
        assertThat(medicine.getMedicineName()).isEqualTo("지르텍");
    }

}