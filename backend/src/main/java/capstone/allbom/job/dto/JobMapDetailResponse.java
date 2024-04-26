package capstone.allbom.job.dto;

public record JobMapDetailResponse(
        Long id,
        String type, // JOB
        String occupation,
        String address
) {
}
