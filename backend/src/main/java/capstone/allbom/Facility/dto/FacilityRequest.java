package capstone.allbom.facility.dto;

import jakarta.validation.constraints.NotNull;

public record FacilityRequest(
        @NotNull
        Double SWlatitude,
        @NotNull
        Double SWlongitude,
        @NotNull
        Double NElatitude,
        @NotNull
        Double NElongitude
) {
}
