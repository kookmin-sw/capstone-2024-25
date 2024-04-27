package capstone.allbom.routine.infrastructure.api;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
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

//        log.info("routineData={}", routineData);
        return routineData;
    }

    public JSONObject getRoutineData(String routineType) {
        JSONObject routineData = null;
        try {
            String totalData = requestRoutine();

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(totalData);

            routineData = (JSONObject) jsonObject.get(routineType);

//            log.info("{} 전체 데이터={}", routineType, routineData);
        } catch (ParseException e) {
            e.printStackTrace();;
        }
        return routineData;
    }

    public String getRoutine(String routineType, String routineNum) {
        String routine;
        JSONObject routineData = getRoutineData(routineType);

        log.info("routineData={}", routineData);
        log.info("routineNum={}", routineNum);

        if (routineData == null || !routineData.containsKey(routineNum)) {
            throw new BadRequestException(DefaultErrorCode.INVALID_ROUTINE_TYPE);
        }

        routine = (String) routineData.get(routineNum);

        return routine;
    }

//    public List<Integer> getRandomRoutineFields() {
//        List<Integer> routines = new ArrayList<>();
//        try {
//            String routineData = requestRoutine();
//
//            JSONParser jsonParser = new JSONParser();
//            JSONObject jsonObject = (JSONObject) jsonParser.parse(routineData);
//            log.info("jsonObject={}", jsonObject);
//
//            List<String> categories = Arrays.asList("운동", "휴식", "성장", "취미", "과일", "간식", "식사");
//            routines = categories.stream()
//                    .map(category -> (JSONObject) jsonObject.get(category))
//                    .map(this::selectRandomRoutine)
//                    .collect(Collectors.toList());
//
//            System.out.println("routines = " + routines);
//
////            if (routines.get(6).equals("간식 먹기")) {
////                String replaceMent = routines.get(5) + " 먹기";
////                routines.set(6, replaceMent);
////            } else if (routines.get(6).equals("과일 먹기")) {
////                String replaceMent = routines.get(4) + " 먹기";
////                routines.set(6, replaceMent);
////            }
////            log.info("newRoutines={}", routines);
//
//        } catch (ParseException e) {
//            e.printStackTrace();
//        }
//        return routines;
//    }

}