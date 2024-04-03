package capstone.allbom.medicine.service;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.NotFoundException;
import capstone.allbom.medicine.domain.Medicine;
import capstone.allbom.medicine.domain.MedicineRepository;
import capstone.allbom.medicine.service.dto.MedicineRequest;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MedicineService {

    private final MedicineRepository medicineRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public Medicine findById(final Long medicineId) {
        return medicineRepository.findById(medicineId)
                .orElseThrow(() -> new NotFoundException(DefaultErrorCode.NOT_FOUND_MEDICINE_ID));
    }

    @Transactional
    public Long saveMedicine(final Member member, MedicineRequest medicineRequest) {
        Member savedMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));

        Medicine medicine = medicineRequest.toDomain();
        medicine.setMember(savedMember);
        return medicineRepository.save(medicine).getId();

    }

    @Transactional
    public void updateMedicine(final Member member, Long medicineId, MedicineRequest medicineRequest){
        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEDICINE_ID));

        validateMemberIsSame(member.getId(), medicine.getMember().getId());
        validateMedicineDuplicate(medicine, medicineRequest);
        medicine.setMedicineName(medicineRequest.medicineName());
        medicine.setMedicineTime(medicineRequest.medicineTime());
    }

    @Transactional
    public void deleteMedicine(final Member member, Long medicineId) {
        Medicine medicine = medicineRepository.findById(medicineId)
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEDICINE_ID));
        validateMemberIsSame(member.getId(), medicine.getMember().getId());
        medicineRepository.deleteById(medicineId);
    }

    private void validateMemberIsSame(Long requestMemberId, Long medicineMemberId) {
        if (requestMemberId != medicineMemberId) {
            throw new BadRequestException(DefaultErrorCode.INVALID_UPDATE_MEDICINE);
        }
    }

    private void validateMedicineDuplicate(Medicine medicine, MedicineRequest medicineRequest) {
        if (medicine.isSameNameAndTime(medicineRequest.medicineName(), medicineRequest.medicineTime())) {
            throw new BadRequestException(DefaultErrorCode.DUPLICATED_MEDICINE);
        }
    }
}
