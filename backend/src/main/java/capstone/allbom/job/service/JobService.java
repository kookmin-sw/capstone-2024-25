package capstone.allbom.job.service;

import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.NotFoundException;
import capstone.allbom.facility.dto.FacilityListResponse;
import capstone.allbom.job.domain.Job;
import capstone.allbom.job.domain.JobRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class JobService {

    private final JobRepository jobRepository;

    @Transactional(readOnly = true)
    public Job findById(final Long jobId) {
        return jobRepository.findById(jobId)
                .orElseThrow(() -> new NotFoundException(DefaultErrorCode.NOT_FOUND_MAP_ID));
    }

    @Transactional
    public Job saveJob(final Job job) {
        Job savedJob = jobRepository.save(job);
        return savedJob;
    }

    public List<FacilityListResponse> getJobs(Double SWlatitude, Double SWlongitude, Double NElatitude, Double NElongitude) {
        List<Job> jobs = jobRepository.findJobsInRectangle(SWlatitude, SWlongitude, NElatitude, NElongitude);
        return jobs.stream()
                .map(FacilityListResponse::from)
                .toList();
    }
}
