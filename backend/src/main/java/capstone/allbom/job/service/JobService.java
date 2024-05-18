package capstone.allbom.job.service;

import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.NotFoundException;
import capstone.allbom.facility.dto.FacilityListResponse;
import capstone.allbom.job.domain.Job;
import capstone.allbom.job.domain.JobRepository;
import capstone.allbom.job.domain.Province;
import capstone.allbom.job.dto.JobListResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class JobService {

    private final JobRepository jobRepository;

    @Transactional(readOnly = true)
    public Job findById(final Long jobId) {
        return jobRepository.findById(jobId)
                .orElseThrow(() -> new NotFoundException(DefaultErrorCode.NOT_FOUND_JOB_ID));
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

    public List<JobListResponse> findJobsOrderByAddressPagination(Province province, Double latitude, Double longitude, Pageable pageable) {
        List<Job> jobs = jobRepository.findJobsOrderByAddressPagination(province, latitude, longitude, pageable);
        return jobs.stream()
                .map(JobListResponse::from)
                .toList();
    }

    public List<JobListResponse> findJobsOrderByDeadlinePagination(Province province, Pageable pageable) {
        List<Job> jobs = jobRepository.findJobsOrderByDeadlinePagination(province, pageable);
        return jobs.stream()
                .map(JobListResponse::from)
                .toList();
    }

    public Long getTotalSizeByProvince(Province province) {
        return jobRepository.getTotalSizeByProvince(province);
    }

    public List<JobListResponse> findJobsByOccupation(Province province, String occupation, Pageable pageable) {
        List<Job> jobs = jobRepository.findByOccupationPagination(province, pageable, occupation);
        return jobs.stream()
                .map(JobListResponse::from)
                .toList();
    }

    public Long getTotalSizeByOccupation(Province province, String occupation) {
        return jobRepository.getTotalSizeByOccupation(province, occupation);
    }

    @Transactional
    public void updateDday(Job job) {
        LocalDate currentDate = LocalDate.now();
        String dday = job.getDday();
        if (!dday.equals("채용시까지")) {
            long daysLeft = ChronoUnit.DAYS.between(currentDate, job.getDeadline());

            if (daysLeft < 0) {
                dday = "D+" + -daysLeft;
            } else {
                dday = "D-" + daysLeft;
            }

            job.setDday(dday);
        }
    }
}
