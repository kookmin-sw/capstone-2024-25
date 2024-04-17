package capstone.allbom.facility.service.dto;

import capstone.allbom.facility.domain.Facility;
import capstone.allbom.facility.domain.FacilityType;

public record FacilityRequest(
        String name,
        String type,
        String address,
        String phoneNumber,
        Double latitude,
        Double longitude
) {
    public Facility toFacility() {
        return Facility.builder()
                .name(name)
                .type(FacilityType.valueOf(type.toUpperCase()))
                .address(address)
                .phoneNumber(phoneNumber)
                .latitude(latitude)
                .longitude(longitude)
                .build();
    }
}
