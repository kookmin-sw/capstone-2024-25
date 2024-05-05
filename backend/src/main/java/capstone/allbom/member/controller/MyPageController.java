package capstone.allbom.member.controller;

import capstone.allbom.common.jwt.Auth;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.dto.*;
import capstone.allbom.member.service.MemberService;
import capstone.allbom.member.service.MyPageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/mypage")
@RestController
@Slf4j
public class MyPageController implements MyPageControllerDocs{

    private final MemberService memberService;
    private final MyPageService myPageService;

    @GetMapping
    public ResponseEntity<MyPageResponse> getMyPage(
            @Auth Member member
    ) {
        myPageService.findById(member.getId());
        return ResponseEntity.ok(MyPageResponse.from(member));
    }

    @PatchMapping("/birthday")
    public ResponseEntity<Void> updateBirthday(
            @Auth Member member,
            @RequestBody final BirthdayUpdateRequest birthdayRequest
    ) {
        myPageService.updateBirthday(member, birthdayRequest);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/phonenumber")
    public ResponseEntity<Void> updatePhoneNumber(
            @Auth Member member,
            @RequestBody final PhoneNumberUpdateRequest phoneNumberRequest
    ) {
        myPageService.updatePhoneNumber(member, phoneNumberRequest);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/address")
    public ResponseEntity<Void> updateAddress(
            @Auth Member member,
            @RequestBody final AddressUpdateRequest addressRequest
    ) {
        myPageService.updateAddress(member, addressRequest);
        return ResponseEntity.noContent().build();
    }
}
