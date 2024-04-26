package capstone.allbom.job.dto;

public record JobMapListResponse(
        Long id,
        String type, // JOB
        Double latitude,
        Double longitude
) {
}
