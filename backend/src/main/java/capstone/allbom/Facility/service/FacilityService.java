package capstone.allbom.facility.service;

import capstone.allbom.facility.domain.Facility;
import capstone.allbom.facility.domain.FacilityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class FacilityService {

//    private final RestTemplateFacilityRequester restTemplateFacilityRequester;
    private final FacilityRepository facilityRepository;

    @Transactional
    public Facility saveFacility(final Facility facility) {
        /**
         * TODO
         * 해당 함수 유지 고민 (repository 함수와 중복)
         */
        Facility savedFacility = facilityRepository.save(facility);
        return savedFacility;
    }


}
