package capstone.allbom.game.service;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.NotFoundException;
import capstone.allbom.game.domain.Subject;
import capstone.allbom.game.domain.SubjectRepository;
import capstone.allbom.game.domain.SubjectType;
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

    @Transactional
    public void updateToNextProblem(Subject subject) {
        String subjectType = convertToRequestType(subject.getType());
        if (subject.isCompleteExcludePassed()) { // 건너뛴 문제 제외하고 모든 문제 완료
            if (subject.getPassedProblems().size() > 0) {
                subject.setCurrProblem(subject.getPassedProblems().get(0));
                subject.getPassedProblems().remove(0);
            } else { // 모든 문제 완료
                throw new BadRequestException(DefaultErrorCode.COMPLETE_SUBJECT_ALL_PROBLEM);
            }
        } else {
            if (gameRequester.getSubjectData(subjectType).size() <= subject.getCurrProblem()) { // 현재의 문제가 마지막 문제이거나 인덱스 범위를 초과했다면
                subject.setCompleteExcludePassed(true);
                if (subject.getPassedProblems().size() > 0) {
                    subject.setCurrProblem(subject.getPassedProblems().get(0));
                    subject.getPassedProblems().remove(0);
                } else { // 모든 문제 완료
                    throw new BadRequestException(DefaultErrorCode.COMPLETE_SUBJECT_ALL_PROBLEM);
                }
            } else {
                subject.setCurrProblem(subject.getCurrProblem() + 1);
            }
        }
    }



}
