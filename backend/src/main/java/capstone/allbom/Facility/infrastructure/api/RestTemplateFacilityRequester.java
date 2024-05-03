package capstone.allbom.facility.infrastructure.api;

import capstone.allbom.facility.domain.Facility;
import capstone.allbom.facility.service.FacilityService;
import capstone.allbom.facility.service.dto.FacilityRequest;
import capstone.allbom.common.service.S3FileService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
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
@Slf4j
@Component
public class RestTemplateFacilityRequester {

    private final S3FileService s3FileService;
    private final FacilityService facilityService;
    private final RestTemplate restTemplate;
    private String FACILITY_REQUEST_URL;

//    @PostConstruct
    // DB 새로 초기화할때만 주석 해제 후 다시 주석 필요
    public void init() {
        requestFacility();
    }

    public List<Facility> requestFacility() {
        FACILITY_REQUEST_URL = s3FileService.getFile("mapData.json");

        restTemplate.getMessageConverters()
                .add(new StringHttpMessageConverter(StandardCharsets.UTF_8));

        RequestEntity<Void> requestEntity = RequestEntity
                .get(URI.create(FACILITY_REQUEST_URL))
                .accept(MediaType.TEXT_PLAIN)
                .build();

        String mapData = restTemplate
                .exchange(requestEntity, String.class)
                .getBody();

//        log.info("sentenceData={}", sentenceData);
        return makeFacilities(mapData);
    }

    private List<Facility> makeFacilities(String rawData) {
        ObjectMapper objectMapper = new ObjectMapper();

        List<FacilityRequest> facilityRequests;

        try {
            facilityRequests = objectMapper.readValue(rawData, new TypeReference<List<FacilityRequest>>() {
            });
        } catch (JsonProcessingException e) {
            log.error("객체로 변환하는 과정에서 문제가 발생했습니다.");
            throw new RuntimeException(e);
        }

        return facilityRequests.stream()
                .map(FacilityRequest::toFacility)
                .peek(facilityService::saveFacility)
                .toList();
    }
}
