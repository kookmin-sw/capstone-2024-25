package capstone.allbom.facility.service;

import capstone.allbom.facility.domain.Facility;
import capstone.allbom.facility.domain.FacilityRepository;
import capstone.allbom.facility.domain.FacilityType;
import capstone.allbom.facility.dto.FacilityListResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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

    public List<FacilityListResponse> getFacilities(Double SWlatitude, Double SWlongitude, Double NElatitude, Double NElongitude, String type) {
        List<Facility> facilities;

        if (type.length() == 0 || type == null) {
            facilities = facilityRepository.findFacilitiesInRectangle(SWlatitude, SWlongitude, NElatitude, NElongitude);
        } else {
            facilities = facilityRepository.findFacilitiesInRectangleAndType(SWlatitude, SWlongitude, NElatitude, NElongitude, FacilityType.valueOf(type.toUpperCase()));
        }
        return facilities.stream()
                .map(FacilityListResponse::from)
                .toList();
    }
}
