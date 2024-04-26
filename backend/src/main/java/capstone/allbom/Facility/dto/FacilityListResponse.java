package capstone.allbom.facility.dto;

import capstone.allbom.facility.domain.Facility;
import capstone.allbom.job.domain.Job;

public record FacilityListResponse(
        Long id,
        String type, // HOSPITAL, PHARMACY, WELFAREHOUSE, WELFARECENTER, CARECENTER
        Double latitude,
        Double longitude
) {
    public static FacilityListResponse from(Facility facility) {
        return new FacilityListResponse(facility.getId(), facility.getType().toString(), facility.getLatitude(), facility.getLongitude());
    }

    public static FacilityListResponse from(Job job) {
        String jobType = "job";
        return new FacilityListResponse(job.getId(), jobType, job.getLatitude(), job.getLongitude());
    }
}
