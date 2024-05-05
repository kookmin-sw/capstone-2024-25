package capstone.allbom.member.dto;

import capstone.allbom.medicine.domain.Medicine;
import capstone.allbom.medicine.dto.MedicineDetailResponse;
import capstone.allbom.member.domain.Member;

import java.time.LocalDate;
import java.time.Period;
import java.time.Year;
import java.util.List;

public record MyPageResponse(
        String profileImageUrl,
        String name,
        String gender,
        Integer age,
        LocalDate birthday,
        String phoneNumber,
        String address,
        String detailAddress,
        List<MedicineDetailResponse> medicineResponses
) {
    private static int calculateAge(LocalDate birthday) {
//        LocalDate currentDate = LocalDate.now();
//        return Period.between(birthday, currentDate).getYears() + 1;
        int currentYear = Year.now().getValue();
        return currentYear - birthday.getYear() + 1;
    }

    public static MyPageResponse from(Member member) {
        return new MyPageResponse(member.getProfileImageUrl(), member.getName(),
                member.getGender().toString(), calculateAge(member.getBirthday()),
                member.getBirthday(), member.getPhoneNumber(), member.getAddress(),
                member.getDetailAddress(), medicineFrom(member.getMedicines()));
    }

    private static List<MedicineDetailResponse> medicineFrom(List<Medicine> medicines) {
         return medicines.stream()
                .map(MedicineDetailResponse::from)
                .toList();
    }
}
