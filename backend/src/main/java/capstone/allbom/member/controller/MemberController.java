package capstone.allbom.member.controller;

import capstone.allbom.common.jwt.Auth;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.dto.ChatProfileImgUpdateRequest;
import capstone.allbom.member.dto.MemberUpdateRequest;
import capstone.allbom.member.service.MemberService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/member")
@RestController
@Slf4j
public class MemberController implements MemberControllerDocs{

    private final MemberService memberService;

    @PatchMapping("/register")
    public ResponseEntity<Void> updateMember(
            @Auth Member member,
            @RequestBody final MemberUpdateRequest memberUpdateRequest
    ) {
        memberService.updateMember(member, memberUpdateRequest);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/duplicate")
    public ResponseEntity<String> checkDuplicate(
            @RequestParam final String loginId
    ) {
        memberService.validateDuplicateLoginId(loginId);
        return ResponseEntity.ok("사용 가능한 아이디입니다.");
    }

    @PatchMapping("/chatbot")
    public ResponseEntity<Void> updateChatbotImg(
            @Auth Member member,
            @RequestBody final ChatProfileImgUpdateRequest chatImgUpdateRequest
    ) {
        memberService.updateChatbotImg(member, chatImgUpdateRequest);
        return ResponseEntity.noContent().build();
    }
}
