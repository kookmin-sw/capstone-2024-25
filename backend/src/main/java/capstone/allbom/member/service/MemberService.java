package capstone.allbom.member.service;

import capstone.allbom.common.exception.NotFoundException;
import capstone.allbom.member.domaiin.Member;
import capstone.allbom.member.domaiin.MemberRepository;
import capstone.allbom.member.exception.MemberErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
