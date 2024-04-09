package capstone.allbom.game.dto;
import capstone.allbom.game.domain.Subject;

public record SentenceAnswerResponse(
        Integer nextProblem,
        String sentence,
        Boolean isAnswer
) {
    public SentenceAnswerResponse {
    }

    public static SentenceAnswerResponse from(Subject subject, String sentence, Boolean isTrue) {
        return new SentenceAnswerResponse(subject.getCurrProblem(), sentence, isTrue);
    }
}
