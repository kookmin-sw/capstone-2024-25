package capstone.allbom.routine.infrastructure.api;

import capstone.allbom.common.service.S3FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Component
public class RestTemplateRoutineRequester {

    private final S3FileService s3FileService;
    private final RestTemplate restTemplate;
    private static String ROUTINE_REQUEST_URL;

    public String requestRoutine() {
        ROUTINE_REQUEST_URL = s3FileService.getFile("routine.json");

        restTemplate.getMessageConverters()
                .add(new StringHttpMessageConverter(StandardCharsets.UTF_8));

        RequestEntity<Void> requestEntity = RequestEntity
                .get(URI.create(ROUTINE_REQUEST_URL))
                .accept(MediaType.TEXT_PLAIN)
                .build();

        String routineData = restTemplate
                .exchange(requestEntity, String.class)
                .getBody();

        log.info("routineData={}", routineData);
        return routineData;
    }

    public List<String> getRandomRoutineFields() {
        List<String> routines = new ArrayList<>();
        try {
            String routineData = requestRoutine();

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(routineData);
            log.info("jsonObject={}", jsonObject);

            List<String> categories = Arrays.asList("운동", "휴식", "성장", "취미", "과일", "간식", "식사");
            routines = categories.stream()
                    .map(category -> (JSONObject) jsonObject.get(category))
                    .map(this::selectRandomRoutine)
                    .collect(Collectors.toList());

            if (routines.get(6).equals("간식 먹기")) {
                String replaceMent = routines.get(5) + " 먹기";
                routines.set(6, replaceMent);
            } else if (routines.get(6).equals("과일 먹기")) {
                String replaceMent = routines.get(4) + " 먹기";
                routines.set(6, replaceMent);
            }
            log.info("newRoutines={}", routines);

        } catch (ParseException e) {
            e.printStackTrace();
        }
        return routines;
    }

    public String selectRandomRoutine(JSONObject jsonObject) {

        ArrayList<String> keysList = new ArrayList<>(jsonObject.keySet());

        Random random = new Random();
        int randomIndex = random.nextInt(keysList.size());

        String randomKey = keysList.get(randomIndex);
        log.info("randomKey={}", randomKey);

        return randomKey;
    }
}