package capstone.allbom.job.dto;

import capstone.allbom.job.domain.Job;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "일자리 상세 응답")
public record JobListResponse(
        @Schema(description = "일자리 ID", example = "1")
        Long id,

        @Schema(description = "지역", example = "서울")
        String province,

        @Schema(description = "회사명", example = "엘림에스(유)")
        String companyName,

        @Schema(description = "모집직종", example = "재가 요양보호사")
        String occupation,

        @Schema(description = "제목", example = "(급구 !!) 재가 요양보호사 구함")
        String title
) {
    public static JobListResponse from(Job job) {
        return new JobListResponse(job.getId(), job.getProvince().toString(), job.getCompanyName(), job.getOccupation(), job.getTitle());
    }
}
