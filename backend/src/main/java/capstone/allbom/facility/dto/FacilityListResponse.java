package capstone.allbom.facility.dto;

import capstone.allbom.facility.domain.Facility;
import capstone.allbom.job.domain.Job;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "지도 데이터 리스트 응답")
public record FacilityListResponse(
        @Schema(description = "지도 ID", example = "1")
        Long id,

        @Schema(description = "지도 데이터 유형", example = "hospital")
        String type, // HOSPITAL, PHARMACY, WELFAREHOUSE, WELFARECENTER, CARECENTER

        @Schema(description = "위도", example = "37.55140084746174")
        Double latitude,

        @Schema(description = "경도", example = "127.07328144110905")
        Double longitude
) {
    public static FacilityListResponse from(Facility facility) {
        return new FacilityListResponse(facility.getId(), facility.getType().toString(), facility.getLatitude(), facility.getLongitude());
    }

    public static FacilityListResponse from(Job job) {
        String jobType = "job";
        return new FacilityListResponse(job.getId(), jobType, job.getLatitude(), job.getLongitude());
    }
}
