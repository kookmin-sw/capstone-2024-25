package capstone.allbom.Facility.domain;

import org.assertj.core.api.Assert;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class FacilityRepositoryTest {

    @Autowired
    private FacilityRepository facilityRepository;

    @Test
    void 시설유형으로_조회한다() {
        // given
        Facility facility1 = Facility.builder()
                .name("병원A")
                .type(FacilityType.HOSPITAL)
                .build();
        facilityRepository.save(facility1);

        Facility facility2 = Facility.builder()
                .name("병원B")
                .type(FacilityType.HOSPITAL)
                .build();
        facilityRepository.save(facility2);

        Facility facility3 = Facility.builder()
                .name("복지주택A")
                .type(FacilityType.WELFAREHOUSE)
                .build();
        facilityRepository.save(facility3);

        // when
        List<Facility> hospitalList = facilityRepository.findByType(FacilityType.HOSPITAL);

        // then
        assertThat(hospitalList).containsExactly(facility1, facility2);

    }

}