package capstone.allbom.facility.service;

import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class FacilityServiceTest {
    @Autowired
    EntityManager entityManager;
    @Autowired
    FacilityService facilityService;


    @Test
    void 특정_범위의_위경도로_시설들을_조회한다() {
//        //given
//        Double SWlatitude = 37.5566;
//        Double SWlongitude = 127.0733;
//        Double NElatitude = 37.5671;
//        Double NElongitude = 127.0886;
        Double SWlatitude = 37.53921838283028;
        Double SWlongitude = 127.06732354734461;
        Double NElatitude = 37.54111781473867;
        Double NElongitude = 127.08400381140538;

        //when
        facilityService.getFacilities(SWlatitude, SWlongitude, NElatitude, NElongitude);
    }

}