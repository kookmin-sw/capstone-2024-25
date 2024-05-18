package capstone.allbom.job.controller;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.jwt.Auth;
import capstone.allbom.facility.domain.Facility;
import capstone.allbom.facility.dto.FacilityDetailResponse;
import capstone.allbom.job.domain.Job;
import capstone.allbom.job.domain.Province;
import capstone.allbom.job.dto.JobDetailResponse;
import capstone.allbom.job.dto.JobListResponse;
import capstone.allbom.job.dto.JobResponse;
import capstone.allbom.job.service.JobService;
import capstone.allbom.member.domain.Member;
import com.amazonaws.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/job")
@RestController
@Slf4j
@Transactional
public class JobController implements JobControllerDocs{
    private final JobService jobService;

    @GetMapping
    public ResponseEntity<JobResponse> getJobs(
            @Auth Member member,
            @RequestParam final Integer sorted,
            Pageable pageable
    ) {
        List<JobListResponse> jobResponses = new ArrayList<>();
        Long totalSize = jobService.getTotalSizeByProvince(member.getProvince());

        log.info("pageable={}", pageable);

        if (sorted == 0) {
            jobResponses = jobService.findJobsOrderByAddressPagination(
                    member.getProvince(), member.getLatitude(), member.getLongitude(), pageable);
        } else if (sorted == 1) {
            jobResponses = jobService.findJobsOrderByDeadlinePagination(
                    member.getProvince(), pageable);
        } else {
            throw new BadRequestException(DefaultErrorCode.INVALID_QUERY_PARAMETER_SORTED);
        }

        return ResponseEntity.ok(JobResponse.from(member, jobResponses, totalSize));
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<JobDetailResponse> getDetailJob(
            @Auth Member member,
            @PathVariable final Long jobId
    ) {
        Job job = jobService.findById(jobId);
        jobService.updateDday(job);
        return ResponseEntity.ok(JobDetailResponse.from(job));
    }

    @GetMapping("/search")
    public ResponseEntity<JobResponse> searchJobByOccupation(
            @Auth Member member,
            @RequestParam final String name,
            Pageable pageable
    ) {
        String decodedName = URLDecoder.decode(name, StandardCharsets.UTF_8);
        List<JobListResponse> jobResponses = new ArrayList<>();
        jobResponses = jobService.findJobsByOccupation(member.getProvince(), decodedName, pageable);
        Long totalSize = jobService.getTotalSizeByOccupation(member.getProvince(), decodedName);

        return ResponseEntity.ok(JobResponse.from(member,jobResponses, totalSize));
    }
}
