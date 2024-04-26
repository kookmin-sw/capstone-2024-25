package capstone.allbom.job.dto;

import capstone.allbom.job.domain.Job;
import capstone.allbom.medicine.domain.Medicine;
import capstone.allbom.medicine.dto.MedicineDetailResponse;

public record JobMapDetailResponse(
        Long id,
        String type, // JOB
        String occupation,
        String address
) {
    public static JobMapDetailResponse from(Job job) {
        String jobType = "job";
        return new JobMapDetailResponse(job.getId(), jobType, job.getOccupation(), job.getAddress());
    }
}
