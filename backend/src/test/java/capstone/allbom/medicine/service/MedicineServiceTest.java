package capstone.allbom.medicine.service;

import capstone.allbom.medicine.domain.Medicine;
import capstone.allbom.medicine.domain.MedicineRepository;
import capstone.allbom.medicine.service.dto.MedicineRequest;
import capstone.allbom.member.domaiin.Member;
import capstone.allbom.member.domaiin.MemberRepository;
import jakarta.persistence.EntityManager;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class MedicineServiceTest {

    @Autowired EntityManager entityManager;
    @Autowired MedicineService medicineService;
    @Autowired MemberRepository memberRepository;
    @Autowired MedicineRepository medicineRepository;

    /**
     * TODO
     * member 저장하는 로직 구현 후 memberService 이용하여 테스트
     */

    @Nested
    class createMedicine {
        MedicineRequest medicineRequest = MedicineRequest.builder()
                .MedicineName("지르텍지르텍지르텍지르텍지르텍지르텍지르텍")
                .medicineTime(Arrays.asList("아침", "점심"))
                .build();


        @Test
        void 예외가_발생하지_않으면_약이_저장된다() {
            // given
            Member member = new Member();
            Member memberSaved = memberRepository.save(member);

            // when
            Long medicineId = medicineService.saveMedicine(memberSaved.getId(), medicineRequest);
            Medicine medicine = medicineRepository.findById(medicineId).get();

            // then
            assertThat(medicine.getMedicineName()).isEqualTo("지르텍지르텍지르텍지르텍지르텍지르텍지르텍");
        }
    }


}