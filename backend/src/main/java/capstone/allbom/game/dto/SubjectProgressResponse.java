package capstone.allbom.game.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
import java.util.Map;

@Schema(description = "과목별 진행률 응답")
public record SubjectProgressResponse(
        @Schema(description = "문학", example = "20")
        Integer literature,

        @Schema(description = "과학", example = "4")
        Integer science,

        @Schema(description = "사회", example = "12")
        Integer society,

        @Schema(description = "역사", example = "5")
        Integer history,

        @Schema(description = "법률", example = "1")
        Integer legislation
) {
    public SubjectProgressResponse{
    }

    public static SubjectProgressResponse from(Map<String, Integer> subjectProgress) {
        return new SubjectProgressResponse(
                subjectProgress.get("literature"),
                subjectProgress.get("science"),
                subjectProgress.get("society"),
                subjectProgress.get("history"),
                subjectProgress.get("legislation")
        );
    }

}

