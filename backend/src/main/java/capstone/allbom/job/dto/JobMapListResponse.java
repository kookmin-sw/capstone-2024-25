package capstone.allbom.job.dto;

import capstone.allbom.job.domain.Job;

public record JobMapListResponse(
        Long id,
        String type, // JOB
        Double latitude,
        Double longitude
) {
    public static JobMapListResponse from(Job job) {
        String jobType = "job";
        return new JobMapListResponse(job.getId(), jobType, job.getLatitude(), job.getLongitude());
    }
}