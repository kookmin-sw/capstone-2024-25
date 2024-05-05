package capstone.allbom.member.service;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.game.domain.GameRepository;
import capstone.allbom.job.domain.Province;
import capstone.allbom.medicine.domain.MedicineRepository;
import capstone.allbom.member.domain.Gender;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import capstone.allbom.member.dto.*;
import capstone.allbom.member.infrastructure.api.GeocodingRequester;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MyPageService {
    private final MemberService memberService;
    private final GeocodingRequester geocodingRequester;

    @Transactional
    public void updateBirthday(final Member member, BirthdayUpdateRequest birthdayRequest) {
        member.setBirthday(birthdayRequest.birthday());
    }

    @Transactional
    public void updatePhoneNumber(final Member member, PhoneNumberUpdateRequest phoneNumberRequest) {
        member.setPhoneNumber(phoneNumberRequest.phoneNumber());

    }

}
