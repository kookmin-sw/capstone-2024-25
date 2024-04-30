package capstone.allbom.facility.infrastructure.api;

import capstone.allbom.facility.domain.Facility;
import capstone.allbom.facility.domain.FacilityRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
class RestTemplateFacilityRequesterTest {

    @Autowired
    EntityManager entityManager;
    @Autowired
    FacilityRepository facilityRepository;

    @Autowired
    private RestTemplateFacilityRequester restTemplateFacilityRequester;

    @Test
    public void 시설_JSON_데이터를_객체로_변환한다() {
        List<Facility> facilities = restTemplateFacilityRequester.requestFacility();
        System.out.println("facilities = " + facilities);
    }
}
