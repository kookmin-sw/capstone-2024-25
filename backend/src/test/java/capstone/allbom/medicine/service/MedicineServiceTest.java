package capstone.allbom.medicine.service;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.medicine.domain.Medicine;
import capstone.allbom.medicine.domain.MedicineRepository;
import capstone.allbom.medicine.service.dto.MedicineRequest;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
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
//        MedicineRequest medicineRequest = MedicineRequest.builder()
//                .medicineName("지르텍")
//                .medicineTime(Arrays.asList("아침", "점심"))
//                .build();

        MedicineRequest medicineRequest = new MedicineRequest(
                "지르텍",
                Arrays.asList("아침", "점심")
        );


        @Test
        void 예외가_발생하지_않으면_약이_저장된다() {
            // given
            Member member = new Member();
            Member memberSaved = memberRepository.save(member);

            // when
            Long medicineId = medicineService.saveMedicine(memberSaved, medicineRequest);
            Medicine medicine = medicineRepository.findById(medicineId).get();

            // then
            assertThat(medicine.getMedicineName()).isEqualTo("지르텍");
//            System.out.println("medicine.getMedicineName() = " + medicine.getMedicineName());
//            System.out.println("medicine.getMedicineTime() = " + medicine.getMedicineTime());
        }
    }

    @Nested
    class updateMedicine {
        Medicine medicine;
        MedicineRequest medicineRequest = new MedicineRequest(
                "타이레놀",
                Arrays.asList("아침", "저녁")
        );
        Member member = memberRepository.save(new Member());

        @BeforeEach
        void setUp() {
            medicine = new Medicine( // 1L
                   null,
                   null,
                    "지르텍",
                    Arrays.asList("아침", "점심")
            );
            medicine.setMember(member);
            medicineRepository.save(medicine);
        }

        @Test
        void 수정할_약이_기존의_약과_동일하면_수정되지_않는다() {
            // given
            Long medicineId = medicine.getId();
            var medicineRequest = new MedicineRequest(
                    "지르텍",
                    Arrays.asList("아침", "점심")
            );

            // when
            BadRequestException e = assertThrows(BadRequestException.class, ()
                    -> medicineService.updateMedicine(member, medicineId, medicineRequest));

//            assertThatThrownBy(() -> medicineService.updateMedicine(medicineId, medicineRequest))
//                    .isInstanceOf(BadRequestException.class)
//                    .hasMessage(ErrorCode.DUPLICATED_MEDICINE.getMessage());

            // then
            Medicine updatedMedicine = medicineRepository.findById(medicineId).orElseThrow();
            assertThat(e.getMessage()).isEqualTo("중복된 약입니다.");
            assertThat(updatedMedicine.getMedicineName()).isEqualTo(medicine.getMedicineName());
            assertThat(updatedMedicine.getMedicineTime()).isEqualTo(medicine.getMedicineTime());
        }

        @Test
        void 예외가_발생하지_않으면_약이_수정된다() {
            // given
            Long medicineId = medicine.getId();

            // when
            medicineService.updateMedicine(member, medicineId, medicineRequest);

            // then
            Medicine updatedMedicine = medicineRepository.findById(medicineId).orElseThrow();
            assertSoftly(softly -> {
                softly.assertThat(updatedMedicine.getMedicineName()).isEqualTo("타이레놀");
                softly.assertThat(updatedMedicine.getMedicineTime()).isEqualTo(Arrays.asList("아침", "저녁"));
            });
        }

        @Nested
        class deleteMedicine {
            Medicine medicine;
            Member member = memberRepository.save(new Member());

            @BeforeEach
            void setUp() {
                medicine = new Medicine( // 2L
                        null,
                        null,
                        "지르텍",
                        Arrays.asList("아침", "점심")
                );
                medicine.setMember(member);
                medicineRepository.save(medicine);
            }

            @Test
            void 예외가_발생하지_않으면_약이_삭제된다() {
                // given
                Long medicineId = medicine.getId();

                // when
                medicineService.deleteMedicine(member, medicineId);

                // then
                assertThat(medicineRepository.findById(medicineId)).isEmpty();
            }
        }
    }


}