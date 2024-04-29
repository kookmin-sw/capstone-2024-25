package capstone.allbom.game.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;
import java.util.Map;

public record SubjectProgressResponse(
        Integer literature,
        Integer science,
        Integer society,
        Integer history,
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

