package capstone.allbom.facility.service;

import capstone.allbom.facility.domain.Facility;
import capstone.allbom.facility.domain.FacilityRepository;
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

    public List<Facility> getFacilities(Double SWlatitude, Double SWlongitude, Double NElatitude, Double NElongitude) {
        /**
         * TODO
         * 반환값과 인자 변경 필요

         */
        List<Facility> facilitiesInRectangle = facilityRepository.findFacilitiesInRectangle(SWlatitude, SWlongitude, NElatitude, NElongitude);
        System.out.println("facilitiesInRectangle = " + facilitiesInRectangle.size());
        for (Facility facility : facilitiesInRectangle) {
            System.out.println("facility.getId() = " + facility.getId());
            System.out.println("facility.getName() = " + facility.getName());
            System.out.println("facility.getAddress() = " + facility.getAddress());
            System.out.println("facility.getLatitude() = " + facility.getLatitude());
            System.out.println("facility.getLongitude() = " + facility.getLongitude());
        }
        return facilitiesInRectangle;
    }


}
