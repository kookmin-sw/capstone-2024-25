package capstone.allbom.job.infrastructure.api;

import capstone.allbom.facility.domain.Facility;
import capstone.allbom.facility.service.dto.FacilityRequest;
import capstone.allbom.job.domain.Job;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RequiredArgsConstructor
@Component
@Slf4j
public class RestTemplateJobRequester {
//
//    private final JobCrawlingProcessBuilder jobCrawlingProcessBuilder;
//    private final RestTemplate restTemplate;
//
////    private final String JOB_REQUEST_URL = "../data/testworkData.json";
//    private final String JOB_REQUEST_URL = "../data/workData.json";
//
//    public List<Job> requestJob() {
//
//        restTemplate.getMessageConverters()
//                .add(new StringHttpMessageConverter(StandardCharsets.UTF_8));
//
//        RequestEntity<Void> requestEntity = RequestEntity
//                .get(URI.create(JOB_REQUEST_URL))
//                .accept(MediaType.TEXT_PLAIN)
//                .build();
//
//        String jobData = restTemplate
//                .exchange(requestEntity, String.class)
//                .getBody();
//
////        log.info("sentenceData={}", sentenceData);
//        return makeJobs(jobData);
//    }
//
//    public List<Job> makeJobs(String rawData) {
//        ObjectMapper objectMapper = new ObjectMapper();
//
//        List<FacilityRequest> facilityRequests;
//
//        try {
//            facilityRequests = objectMapper.readValue(rawData, new TypeReference<List<FacilityRequest>>() {
//            });
//        } catch (JsonProcessingException e) {
//            log.error("객체로 변환하는 과정에서 문제가 발생했습니다.");
//            throw new RuntimeException(e);
//        }
//
//        return facilityRequests.stream()
//                .map(FacilityRequest::toFacility)
//                .peek(facilityService::saveFacility)
//                .toList();
//    }
}
