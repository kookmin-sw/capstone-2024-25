package capstone.allbom.facility.dto;

public record FacilityDetailResponse(
        Long id,
        String type, // HOSPITAL, PHARMACY, WELFAREHOUSE, WELFARECENTER, CARECENTER
        String name,
        String address,
        String phoneNumber
) {
}
