package capstone.allbom.member.controller;

import capstone.allbom.common.jwt.Auth;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.dto.MemberUpdateRequest;
import capstone.allbom.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/member")
@RestController
@Slf4j
public class MemberController {

    private final MemberService memberService;

    @PatchMapping("/register")
    public ResponseEntity<Void> updateMember(
            @Auth Member member,
            @RequestBody final MemberUpdateRequest memberUpdateRequest
    ) {
        memberService.updateMember(member, memberUpdateRequest);
        return ResponseEntity.noContent().build();
    }
}
