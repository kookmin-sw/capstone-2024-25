package capstone.allbom.game.dto;

import capstone.allbom.game.domain.Subject;

public record SentenceResponse(
        Integer currProblem,
        String sentence
) {
    public SentenceResponse {
    }

    public static SentenceResponse from(Subject subject, String sentence) {
        return new SentenceResponse(subject.getCurrProblem(), sentence);
    }
}
