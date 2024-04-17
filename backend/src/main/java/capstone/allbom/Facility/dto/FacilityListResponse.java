package capstone.allbom.facility.dto;

public record FacilityListResponse(
        Long id,
        String type, // HOSPITAL, PHARMACY, WELFAREHOUSE, WELFARECENTER, CARECENTER, JOB
        Double latitude,
        Double longitude
) {
}
