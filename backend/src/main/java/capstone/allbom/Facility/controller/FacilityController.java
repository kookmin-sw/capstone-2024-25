package capstone.allbom.facility.controller;

import capstone.allbom.common.jwt.Auth;
import capstone.allbom.facility.domain.Facility;
import capstone.allbom.facility.domain.FacilityType;
import capstone.allbom.facility.dto.FacilityDetailResponse;
import capstone.allbom.facility.dto.FacilityListResponse;
import capstone.allbom.facility.dto.FacilityRequest;
import capstone.allbom.facility.dto.MapDetailResponse;
import capstone.allbom.facility.infrastructure.api.RestTemplateFacilityRequester;
import capstone.allbom.facility.service.FacilityService;
import capstone.allbom.game.domain.Subject;
import capstone.allbom.job.domain.Job;
import capstone.allbom.job.dto.JobMapDetailResponse;
import capstone.allbom.job.service.JobService;
import capstone.allbom.member.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/map")
@RestController
@Slf4j
@Transactional
public class FacilityController {

    private final RestTemplateFacilityRequester restTemplateFacilityRequester;
    private final FacilityService facilityService;
    private final JobService jobService;

    @GetMapping
    public ResponseEntity<List<FacilityListResponse>> getFacilities(
            @Auth Member member,
            @RequestBody final FacilityRequest facilityRequest
            ) {

        final List<FacilityListResponse> mapResponses = new ArrayList<>();

        List<FacilityListResponse> jobs = jobService.getJobs(
                facilityRequest.swLatitude(),
                facilityRequest.swLongitude(),
                facilityRequest.neLatitude(),
                facilityRequest.neLongitude()
        );
        mapResponses.addAll(jobs);

        List<FacilityListResponse> facilities = facilityService.getFacilities(
                facilityRequest.swLatitude(),
                facilityRequest.swLongitude(),
                facilityRequest.neLatitude(),
                facilityRequest.neLongitude()
        );
        mapResponses.addAll(facilities);
        return ResponseEntity.ok(mapResponses);
    }

    @GetMapping("/{type}")
    public ResponseEntity<List<FacilityListResponse>> getFacilitiesByType(
            @Auth Member member,
            @PathVariable final String type,
            @RequestBody final FacilityRequest facilityRequest
    ) {

        final List<FacilityListResponse> mapResponses = new ArrayList<>();

        System.out.println("type = " + type);

        if (type != null && type.equals("job")) {
            List<FacilityListResponse> jobs = jobService.getJobs(
                    facilityRequest.swLatitude(),
                    facilityRequest.swLongitude(),
                    facilityRequest.neLatitude(),
                    facilityRequest.neLongitude()
            );
            mapResponses.addAll(jobs);
        } else {
            List<FacilityListResponse> facilities = facilityService.getFacilities(
                    facilityRequest.swLatitude(),
                    facilityRequest.swLongitude(),
                    facilityRequest.neLatitude(),
                    facilityRequest.neLongitude(),
                    type
            );
            mapResponses.addAll(facilities);
        }
        return ResponseEntity.ok(mapResponses);
    }

    @GetMapping("/{mapId}")
    public ResponseEntity<MapDetailResponse> getFacility(
            @Auth Member member,
            @PathVariable Long mapId,
            @RequestParam final String type
    ) {
        if (type.equals("job")) {
            Job job = jobService.findById(mapId);
            return ResponseEntity.ok(JobMapDetailResponse.from(job));
        }

        Facility facility = facilityService.findById(mapId);
        return ResponseEntity.ok(FacilityDetailResponse.from(facility));
    }
}
