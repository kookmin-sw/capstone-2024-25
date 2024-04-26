package capstone.allbom.facility.dto;

import jakarta.validation.constraints.NotNull;

public record FacilityRequest(
        @NotNull
        Double swLatitude,
        @NotNull
        Double swLongitude,
        @NotNull
        Double neLatitude,
        @NotNull
        Double neLongitude
) {
}
