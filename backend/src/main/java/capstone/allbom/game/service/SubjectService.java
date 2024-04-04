package capstone.allbom.game.service;

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
}
