package capstone.allbom.job.dto;

import capstone.allbom.job.domain.Job;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Year;
import java.time.temporal.ChronoUnit;

@Schema(description = "일자리 상세 응답")
public record JobDetailResponse(
        @Schema(description = "일자리 ID", example = "1")
        Long id,

        @Schema(description = "회사명", example = "엘림에스(유)")
        String companyName,

        @Schema(description = "회사 이미지 URL", example = "https://www.work.go.kr//images/common/none_imglogo.gif")
        String companyImageUrl,

        @Schema(description = "제목", example = "(급구 !!) 재가 요양보호사 구함")
        String title,

        @Schema(description = "마감 D-Day", example = "D-4")
        String dday,

        @Schema(description = "모집직종", example = "재가 요양보호사")
        String occupation,

        @Schema(description = "경력", example = "관계없음")
        String career,

        @Schema(description = "학력", example = "학력무관")
        String scholarship,

        @Schema(description = "지역", example = "인천광역시 동구 인중로 621, **동 (송현동, 송현1차아파트)")
        String address,

        @Schema(description = "임금", example = "시급 12,500원 이상")
        String pay,

        @Schema(description = "고용형태", example = "기간의 정함이 있는 근로계약")
        String employmentType,

        @Schema(description = "근무형태", example = "주 5일 근무 (주 소정근로시간: 42시간)")
        String workType,

        @Schema(description = "직무내용", example = "업무내용 : 공장 내 청소 및 잡일 인원 모집\n" +
                "* 세부내용: 공장외곽청소,기계청소등\n" +
                "\n" +
                "업무시간 : 09시~16시 (12시~13시 점심시간)\n" +
                "\n" +
                "업무장소 : 울주군 온산읍 온산공단 내\n" +
                "\n" +
                "일 급 여 : 90,000\n" +
                "\n" +
                "문 의 처 :  010-9379-1617\n" +
                "\n" +
                "기타사항: 통근버스 있음,중식제공,유니폼제공")
        String contents,

        @Schema(description = "워크넷 상세 URL", example = "https://www.work.go.kr/empInfo/empInfoSrch/detail/empDetailAuthView.do?searchInfoType=VALIDATION&callPage=detail&wantedAuthNo=K150012404190108&rtnTarget=list1")
        String worknetUrl
) {
        public static JobDetailResponse from(Job job) {
                return new JobDetailResponse(job.getId(), job.getCompanyName(), job.getCompanyImageUrl(), job.getTitle(),
                        job.getDday(), job.getOccupation(), job.getCareer(), job.getScholarship(), job.getAddress(),
                        job.getPay(), job.getEmploymentType(), job.getWorkType(), job.getContents(), job.getWorknetUrl());
        }

}



