package capstone.allbom.member.service;

import capstone.allbom.common.exception.*;
import capstone.allbom.game.domain.GameRepository;
import capstone.allbom.job.domain.Province;
import capstone.allbom.medicine.domain.MedicineRepository;
import capstone.allbom.member.domain.ChatGender;
import capstone.allbom.member.domain.Gender;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import capstone.allbom.member.dto.ChatProfileImgUpdateRequest;
import capstone.allbom.member.dto.GeocodingResponse;
import capstone.allbom.member.dto.MemberUpdateRequest;
import capstone.allbom.member.dto.PhoneNumberUpdateRequest;
import capstone.allbom.member.exception.MemberErrorCode;
import capstone.allbom.member.infrastructure.api.GeocodingRequester;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final GeocodingRequester geocodingRequester;

    @Value("${member.profile-image.female}")
    private String FEMALE_IMAGE_URL;
    @Value("${member.profile-image.male}")
    private String MALE_IMAGE_URL;

    @Value("${chatbot.profile-image.female}")
    private String FEMALE_CHAT_IMAGE_URL;

    @Value("${chatbot.profile-image.male}")
    private String MALE_CHAT_IMAGE_URL;

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
    public void updateMember(final Member member, MemberUpdateRequest memberUpdateRequest) {
        Member savedMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));

        if (savedMember.getName() != null || savedMember.getPhoneNumber() != null) {
            throw new BadRequestException(DefaultErrorCode.DUPLICATED_REGISTER);
        }

        Gender gender = Gender.valueOf(memberUpdateRequest.gender().toUpperCase());

        if (gender == Gender.FEMALE) {
            savedMember.setProfileImageUrl(FEMALE_IMAGE_URL);
        } else {
            savedMember.setProfileImageUrl(MALE_IMAGE_URL);
        }

        savedMember.setName(memberUpdateRequest.name());
        savedMember.setBirthday(memberUpdateRequest.birthday());
        savedMember.setGender(gender);
        savedMember.setAddress(memberUpdateRequest.address());
        savedMember.setDetailAddress(memberUpdateRequest.detailAddress());
        savedMember.setPhoneNumber(memberUpdateRequest.phoneNumber());
        savedMember.setGuardianNumber(memberUpdateRequest.guardianNumber());

        GeocodingResponse geocodingResponse = geocodingRequester.convertAddress(memberUpdateRequest.address());
        savedMember.setLatitude(geocodingResponse.latitude());
        savedMember.setLongitude(geocodingResponse.longitude());

        String address = memberUpdateRequest.address();
        Province province = updateProvince(address.split(" ")[0]);
        savedMember.setProvince(province);
    }

    @Transactional
    public Province updateProvince(String province) {
        Province memberProvince;

        if (province.startsWith("서울")) {
            memberProvince = Province.SEOUL;
        } else if (province.startsWith("부산")) {
            memberProvince = Province.BUSAN;
        } else if (province.startsWith("대구")) {
            memberProvince = Province.DAEGU;
        } else if (province.startsWith("인천")) {
            memberProvince = Province.INCHEON;
        } else if (province.startsWith("광주")) {
            memberProvince = Province.GWANGJU;
        } else if (province.startsWith("대전")) {
            memberProvince = Province.DAEJEON;
        } else if (province.startsWith("울산")) {
            memberProvince = Province.ULSAN;
        } else if (province.startsWith("세종")) {
            memberProvince = Province.SEJONG;
        } else if (province.startsWith("경기")) {
            memberProvince = Province.GYEONGGI;
        } else if (province.startsWith("충북") || province.equals("충청북도")) {
            memberProvince = Province.CHUNGBUK;
        }  else if (province.startsWith("충남") || province.equals("충청남도")) {
            memberProvince = Province.CHUNGNAM;
        } else if (province.startsWith("전남") || province.equals("전라남도")) {
            memberProvince = Province.JEONNAM;
        } else if (province.startsWith("전북") || province.equals("전라북도")) {
            memberProvince = Province.JEONBUK;
        } else if (province.startsWith("경남") || province.equals("경상남도")) {
            memberProvince = Province.GYEONGNAM;
        } else if (province.startsWith("경북") || province.equals("경상북도")) {
            memberProvince = Province.GYEONGBUK;
        } else if (province.startsWith("제주")) {
            memberProvince = Province.JEJU;
        } else if (province.startsWith("강원")) {
            memberProvince = Province.GANGWON;
        } else {
            throw new BadRequestException(DefaultErrorCode.INVALID_MEMBER_ADDRESS_PROVINCE);
        }
        return memberProvince;
    }

    public void checkMemberRegistration(final Member member) {
        Member savedMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));

        if (savedMember.getName() == null || savedMember.getPhoneNumber() == null) {
            throw new UnauthorizedException(DefaultErrorCode.NEED_ADDITIONAL_REGISTRATION);
        }
    }

    @Transactional
    public void updateChatbotImg(final Member member, ChatProfileImgUpdateRequest chatImgUpdateRequest) {
        Member savedMember = findById(member.getId());

        ChatGender chatGender = ChatGender.valueOf(chatImgUpdateRequest.chatGender().toUpperCase());

        if (chatGender == ChatGender.GIRL) {
            savedMember.setChatProfileImageUrl(FEMALE_CHAT_IMAGE_URL);
        } else {
            savedMember.setChatProfileImageUrl(MALE_CHAT_IMAGE_URL);
        }
    }
}
