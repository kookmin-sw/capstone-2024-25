package capstone.allbom.member.controller;

import capstone.allbom.common.jwt.Auth;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.dto.MyPageResponse;
import capstone.allbom.member.service.MemberService;
import capstone.allbom.member.service.MyPageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/mypage")
@RestController
@Slf4j
public class MyPageController {

    private final MemberService memberService;
    private final MyPageService myPageService;

    @GetMapping
    public ResponseEntity<MyPageResponse> getMyPage(
            @Auth Member member
    ) {
        memberService.findById(member.getId());
        return ResponseEntity.ok(MyPageResponse.from(member));
    }
}
