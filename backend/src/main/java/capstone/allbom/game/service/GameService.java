package capstone.allbom.game.service;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.NotFoundException;
import capstone.allbom.game.domain.Game;
import capstone.allbom.game.domain.GameRepository;
import capstone.allbom.game.domain.Subject;
import capstone.allbom.game.domain.SubjectType;
import capstone.allbom.game.dto.SubjectProgressResponse;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class GameService {

    private final GameRepository gameRepository;
    private final MemberRepository memberRepository;
    private final SubjectService subjectService;

    public Game findByMemberId(final Member member) {
        Member savedMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));

        return gameRepository.findByMemberId(savedMember.getId())
                .orElseThrow(() -> new NotFoundException(DefaultErrorCode.NOT_FOUND_GAME_SUBJECT));
    }

}
