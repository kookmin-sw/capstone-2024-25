package capstone.allbom.facility.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

@Schema(description = "지도 데이터 리스트 조회 요청")
public record FacilityRequest(
        @Schema(description = "남서쪽 위도", example = "37.54937578781175")
        @NotNull
        Double swLatitude,
        @Schema(description = "남서쪽 경도", example = "126.06966952193312")
        @NotNull
        Double swLongitude,
        @Schema(description = "북동쪽 위도", example = "37.55140084746174")
        @NotNull
        Double neLatitude,
        @Schema(description = "북동쪽 경도", example = "127.07328144110905")
        @NotNull
        Double neLongitude
) {
}
