package capstone.allbom.member.service;

import capstone.allbom.game.domain.GameRepository;
import capstone.allbom.medicine.domain.MedicineRepository;
import capstone.allbom.member.domain.MemberRepository;
import capstone.allbom.member.infrastructure.api.GeocodingRequester;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MyPageService {
    private final MemberRepository memberRepository;
    private final MedicineRepository medicineRepository;
    private final GeocodingRequester geocodingRequester;


}
