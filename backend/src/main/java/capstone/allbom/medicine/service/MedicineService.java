package capstone.allbom.medicine.service;

import capstone.allbom.medicine.domain.Medicine;
import capstone.allbom.medicine.domain.MedicineRepository;
import capstone.allbom.medicine.service.dto.MedicineRequest;
import capstone.allbom.member.domaiin.Member;
import capstone.allbom.member.domaiin.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MedicineService {

    private final MedicineRepository medicineRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public Long saveMedicine(Long memberId, MedicineRequest medicineRequest) {
        Member member = memberRepository.findById(memberId).get();
        /**
         * TODO
         * memberRepository로 찾지 못할 때 예외 처리 추가
         */
        Medicine medicine = medicineRequest.toDomain();
        medicine.setMember(member);
        return medicineRepository.save(medicine).getId();

    }

    @Transactional
    public void updateMedicine(Long medicineId, MedicineRequest medicineRequest){
        Medicine medicines = medicineRepository.findById(medicineId).get();


    }

    @Transactional
    public void deleteMedicine(Long medicineId) {

    }
}
