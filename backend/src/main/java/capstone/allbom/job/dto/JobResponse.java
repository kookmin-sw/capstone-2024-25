package capstone.allbom.job.dto;

import capstone.allbom.chatbot.dto.QnaAndTypeResponse;
import capstone.allbom.chatbot.dto.QnaResponse;
import capstone.allbom.member.domain.Member;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "일자리 리스트 전체 응답")
public record JobResponse(
        @Schema(description = "지역", example = "서울")
        String province,

        @Schema(description = "일자리 총 갯수")
        Long totalJobSize,

        @Schema(description = "일자리 리스트")
        List<JobListResponse> jobListResponses
) {
    public static JobResponse from(Member member, List<JobListResponse> jobListResponses, Long totalJobSize) {
        return new JobResponse(
                member.getProvince().toString(),
                totalJobSize, jobListResponses
        );
    }
}
