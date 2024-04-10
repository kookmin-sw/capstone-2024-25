package capstone.allbom.member.service;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.NotFoundException;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import capstone.allbom.member.exception.MemberErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public Member findById(final Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException(MemberErrorCode.NON_EXISTENT_MEMBER));
    }

    @Transactional
    public Member registerFromKakao(final Member member) {
        final Optional<Member> maybeMember = memberRepository.findBySocialId(
                member.getSocialId()
        );
        return maybeMember.orElseGet(() -> {
            final Member savedMember = memberRepository.save(member);
            return savedMember;
        });
    }

    @Transactional
    public Member registerFromGeneral(final Member member) {
        final Optional<Member> maybeMember = memberRepository.findByLoginId(
                member.getLoginId()
        );
        return maybeMember.orElseGet(() -> {
            final Member savedMember = memberRepository.save(member);
            return savedMember;
        });
    }

    public void validateDuplicateLoginId(String loginId) {
        if (memberRepository.findByLoginId(loginId).isPresent()){
            throw new BadRequestException(DefaultErrorCode.DUPLICATED_LOGIN_ID);
        }
    }

    @Transactional
    public void updateMember(Member member) {

    }
}
