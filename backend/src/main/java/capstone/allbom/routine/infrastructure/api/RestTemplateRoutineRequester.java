package capstone.allbom.routine.infrastructure.api;

import capstone.allbom.common.service.S3FileService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.ArrayList;
import java.util.Random;
import java.util.Set;

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

    public void getRoutineFields() {
        String routineData = requestRoutine();
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            String jsonStr = objectMapper.writeValueAsString(routineData);
            JsonNode jsonNode = objectMapper.readTree(jsonStr);
            JsonNode jsonNode1 = jsonNode.get("운동");

            System.out.println("jsonNode = " + jsonNode);
            System.out.println("jsonNode1 = " + jsonNode1);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void getRoutineFields2() {
        try {
            String routineData = requestRoutine();

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(routineData);
            log.info("jsonObject={}", jsonObject);

            JSONObject exercises = (JSONObject)jsonObject.get("운동");
            log.info("Exercises={}", exercises);
            String exercise = selectRandomRoutine(exercises);
            log.info("Exercise={}", exercise);

        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public String selectRandomRoutine(JSONObject jsonObject) {

        ArrayList<String> keysList = new ArrayList<>(jsonObject.keySet());

        Random random = new Random();
        int randomIndex = random.nextInt(keysList.size());
        System.out.println("randomIndex = " + randomIndex);

        String randomKey = keysList.get(randomIndex);
        System.out.println("randomKey = " + randomKey);

        return randomKey;
    }




}
