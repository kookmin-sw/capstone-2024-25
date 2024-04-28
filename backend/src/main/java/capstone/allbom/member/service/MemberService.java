package capstone.allbom.member.service;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.NotFoundException;
import capstone.allbom.common.exception.UnauthorizedException;
import capstone.allbom.game.domain.GameRepository;
import capstone.allbom.medicine.domain.MedicineRepository;
import capstone.allbom.member.domain.Gender;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import capstone.allbom.member.dto.GeocodingResponse;
import capstone.allbom.member.dto.MemberUpdateRequest;
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
    private final MedicineRepository medicineRepository;
    private final GameRepository gameRepository;
    private final GeocodingRequester geocodingRequester;

    @Value("${member.profile-image.female}")
    private String FEMALE_IMAGE_URL;
    @Value("${member.profile-image.male}")
    private String MALE_IMAGE_URL;

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
            savedMember.setPhoneNumber(MALE_IMAGE_URL);
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
    }

}
