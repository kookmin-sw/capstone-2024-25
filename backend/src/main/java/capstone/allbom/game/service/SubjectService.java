package capstone.allbom.game.service;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.NotFoundException;
import capstone.allbom.game.domain.Subject;
import capstone.allbom.game.domain.SubjectRepository;
import capstone.allbom.game.domain.SubjectType;
import capstone.allbom.game.dto.GameSentenceRequest;
import capstone.allbom.game.infrastructure.api.RestTemplateGameRequester;
import capstone.allbom.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final RestTemplateGameRequester gameRequester;

    @Transactional(readOnly = true)
    public Subject findByGameAndType(final Member member, Long gameId, SubjectType type) {
        /**
         * TODO
         * memberId와 gameId로 찾은 memberId가 같은지 검사 후 예외처리
         */

        return subjectRepository.findByGameAndType(gameId, type)
                .orElseThrow(() -> new NotFoundException(DefaultErrorCode.NOT_FOUND_GAME_SUBJECT));
    }

    @Transactional(readOnly = true)
    public String getCurrSentence(SubjectType type, Integer problemNum) {
        String subjectType = convertToRequestType(type);
        return gameRequester.getSentence(subjectType, problemNum.toString());
    }

    private String convertToRequestType(SubjectType type) {
        String requestType = switch (type) {
            case LITERATURE -> "문학";
            case SCIENCE -> "과학";
            case SOCIETY -> "사회";
            case HISTORY -> "역사";
            case LEGISLATION -> "법률";
        };
        return requestType;
    }

//    public boolean compareWithAnswer(Long subjectId, GameSentenceRequest gameSentenceRequest) {
//
//    }

//    public void plusToPassedProblems()

    @Transactional
    public void updateToNextProblem(Subject subject) {
        String subjectType = convertToRequestType(subject.getType());
        if (subject.isCompleteExcludePassed()) { // 건너뛴 문제 제외하고 모든 문제 완료
            checkPassedProblems(subject);
        } else {
            if (gameRequester.getSubjectData(subjectType).size() <= subject.getCurrProblem()) { // 현재의 문제가 마지막 문제이거나 인덱스 범위를 초과했다면
                subject.setCompleteExcludePassed(true);
                checkPassedProblems(subject);
            } else {
                subject.setCurrProblem(subject.getCurrProblem() + 1);
            }
        }
    }

    private void checkPassedProblems(Subject subject) {
        if (subject.getPassedProblems().size() > 0) {
            subject.setCurrProblem(subject.getPassedProblems().get(0));
            subject.getPassedProblems().remove(0);
        } else { // 모든 문제 완료
            throw new BadRequestException(DefaultErrorCode.COMPLETE_SUBJECT_ALL_PROBLEM);
        }
    }


}