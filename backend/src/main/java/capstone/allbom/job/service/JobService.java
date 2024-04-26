package capstone.allbom.job.service;

import capstone.allbom.facility.domain.Facility;
import capstone.allbom.facility.domain.FacilityType;
import capstone.allbom.job.domain.Job;
import capstone.allbom.job.domain.JobRepository;
import capstone.allbom.job.infrastructure.api.JobCrawlingProcessBuilder;
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

    @Transactional
    public Job saveJob(final Job job) {
        /**
         * TODO
         * 해당 함수 유지 고민 (repository 함수와 중복)
         */
        Job savedJob = jobRepository.save(job);
        return savedJob;
    }

    public List<Job> getJobs(Double SWlatitude, Double SWlongitude, Double NElatitude, Double NElongitude) {
        /**
         * TODO
         * 반환값과 인자 변경 필요
         */
        List<Job> jobsInRectangle = jobRepository.findJobsInRectangle(SWlatitude, SWlongitude, NElatitude, NElongitude);
        return jobsInRectangle;
    }
}
