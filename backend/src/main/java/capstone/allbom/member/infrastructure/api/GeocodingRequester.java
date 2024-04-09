package capstone.allbom.member.infrastructure.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Slf4j
@Component
public class GeocodingRequester {

    private final RestTemplate restTemplate;
    private String GEOCODING_REQUEST_URL;

    public void convertAddress() {

    }
}
