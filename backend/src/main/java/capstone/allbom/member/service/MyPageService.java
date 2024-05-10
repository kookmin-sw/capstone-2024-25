package capstone.allbom.member.service;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.NotFoundException;
import capstone.allbom.game.domain.GameRepository;
import capstone.allbom.job.domain.Province;
import capstone.allbom.medicine.domain.MedicineRepository;
import capstone.allbom.member.domain.Gender;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import capstone.allbom.member.dto.*;
import capstone.allbom.member.exception.MemberErrorCode;
import capstone.allbom.member.infrastructure.api.GeocodingRequester;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MyPageService {
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final GeocodingRequester geocodingRequester;

    @Transactional(readOnly = true)
    public Member findById(final Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));
    }

    @Transactional
    public void updateBirthday(final Member member, BirthdayUpdateRequest birthdayRequest) {
        Member savedMember = findById(member.getId());
        savedMember.setBirthday(birthdayRequest.birthday());
    }

    @Transactional
    public void updatePhoneNumber(final Member member, PhoneNumberUpdateRequest phoneNumberRequest) {
        Member savedMember = findById(member.getId());
        savedMember.setPhoneNumber(phoneNumberRequest.phoneNumber());
    }

    @Transactional
    public void updateAddress(final Member member, AddressUpdateRequest addressRequest) {
        Member savedMember = findById(member.getId());
        savedMember.setAddress(addressRequest.address());
        savedMember.setDetailAddress(addressRequest.detailAddress());

        GeocodingResponse geocodingResponse = geocodingRequester.convertAddress(addressRequest.address());
        savedMember.setLatitude(geocodingResponse.latitude());
        savedMember.setLongitude(geocodingResponse.longitude());

        String address = addressRequest.address();
        Province province = memberService.updateProvince(address.split(" ")[0]);
        savedMember.setProvince(province);
    }
}
