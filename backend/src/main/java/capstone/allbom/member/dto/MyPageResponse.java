package capstone.allbom.member.dto;

import capstone.allbom.medicine.domain.Medicine;
import capstone.allbom.medicine.dto.MedicineDetailResponse;
import capstone.allbom.member.domain.Member;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;

public record MyPageResponse(

        @Schema(description = "프로필 이미지 URL", example = "https://allbom.s3.ap-northeast-2.amazonaws.com/female.jpg")
        String profileImageUrl,

        @Schema(description = "챗봇 프로필 이미지 URL", example = "https://allbom.s3.ap-northeast-2.amazonaws.com/chat_male.jpg")
        String chatProfileImageUrl,

        @Schema(description = "이름", example = "이은선")
        String name,

        @Schema(description = "성별", example = "FEMALE")
        String gender,

        @Schema(description = "나이", example = "24")
        Integer age,

        @Schema(description = "생년월일", example = "2001-02-22")
        LocalDate birthday,

        @Schema(description = "전화번호", example = "01012345678")
        String phoneNumber,

        @Schema(description = "주소", example = "서울특별시 성북구 정릉동 77")
        String address,

        @Schema(description = "상세 주소", example = "국민대학교 4층 자율주행스튜디오")
        String detailAddress,

        @Schema(description = "회원이 보유한 약 리스트")
        List<MedicineDetailResponse> medicineResponses
) {
    private static int calculateAge(LocalDate birthday) {
//        LocalDate currentDate = LocalDate.now();
//        return Period.between(birthday, currentDate).getYears() + 1;
        int currentYear = Year.now().getValue();
        return currentYear - birthday.getYear() + 1;
    }

    public static MyPageResponse from(Member member) {
        return new MyPageResponse(member.getProfileImageUrl(), member.getChatProfileImageUrl(), member.getName(),
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
