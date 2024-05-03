package capstone.allbom.routine.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "오늘의 투두 응답")
public record RoutineResponse(
        @Schema(description = "유형", example = "exercise")
        String type,

        @Schema(description = "투두", example = "가볍게 달리기")
        String routine
) {
    public RoutineResponse {
    }

    public static RoutineResponse from(String type, String routine) {
        return new RoutineResponse(type, routine);
    }
}
