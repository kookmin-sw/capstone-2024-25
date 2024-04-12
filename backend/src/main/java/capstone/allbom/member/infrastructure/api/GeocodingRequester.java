package capstone.allbom.member.infrastructure.api;

import capstone.allbom.member.dto.GeocodingResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

@RequiredArgsConstructor
@Slf4j
@Component
public class GeocodingRequester {

    private final RestTemplate restTemplate;
    private static final String GEOCODING_REQUEST_URL = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=";

    @Value("${naver.geocoding.client-id}")
    private String clientId;
    @Value("${naver.geocoding.client-secret}")
    private String clientSecret;


    public GeocodingResponse convertAddress(String address) {
        String encodingAddress = null;
        try {
            encodingAddress = URLEncoder.encode(address, "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        String url = GEOCODING_REQUEST_URL + encodingAddress;

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-NCP-APIGW-API-KEY-ID", clientId);
        headers.set("X-NCP-APIGW-API-KEY", clientSecret);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        final ResponseEntity<String> response = restTemplate.exchange(url,
                HttpMethod.GET,
                entity,
                String.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            System.out.println("response = " + response);
        }
    return null;
    }
}
