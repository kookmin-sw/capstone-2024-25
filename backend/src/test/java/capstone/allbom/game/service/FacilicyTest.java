package capstone.allbom.game.service;

import capstone.allbom.facility.service.FacilityService;
import capstone.allbom.medicine.domain.MedicineRepository;
import capstone.allbom.medicine.service.MedicineService;
import capstone.allbom.member.domain.MemberRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class FacilicyTest {
    @Autowired
    EntityManager entityManager;
    @Autowired
    FacilityService facilityService;


    @Test
    void 특정_범위의_위경도로_시설들을_조회한다() {
//        //given
        Double SWlatitude = 37.5566;
        Double SWlongitude = 127.0733;
        Double NElatitude = 37.5671;
        Double NElongitude = 127.0886;

        //when
        facilityService.getFacilities(SWlatitude, SWlongitude, NElatitude, NElongitude);
    }
}
