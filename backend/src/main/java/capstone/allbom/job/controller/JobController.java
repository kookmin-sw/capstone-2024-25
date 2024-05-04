package capstone.allbom.job.controller;

import capstone.allbom.common.jwt.Auth;
import capstone.allbom.job.domain.Province;
import capstone.allbom.job.dto.JobListResponse;
import capstone.allbom.job.service.JobService;
import capstone.allbom.member.domain.Member;
import com.amazonaws.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/job")
@RestController
@Slf4j
@Transactional
public class JobController {
    private final JobService jobService;

    @GetMapping
    public ResponseEntity<List<JobListResponse>> getJobs(
            @Auth Member member,
            @RequestParam final Integer sorted,
            Pageable pageable
    ) {
        List<JobListResponse> jobResponses = new ArrayList<>();

        log.info("pageable={}", pageable);

        if (sorted == 0) {
            jobResponses = jobService.findJobsOrderByAddressPagination(
                    member.getProvince(), member.getLatitude(), member.getLongitude(), pageable);
        }
        return ResponseEntity.ok(jobResponses);
    }
}
