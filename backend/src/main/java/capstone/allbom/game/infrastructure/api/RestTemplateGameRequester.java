package capstone.allbom.game.infrastructure.api;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.NotFoundException;
import capstone.allbom.common.service.S3FileService;
import capstone.allbom.game.domain.GameRepository;
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
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Slf4j
@Component
public class RestTemplateGameRequester {

    private final S3FileService s3FileService;
    private final RestTemplate restTemplate;
    private String GAME_REQUEST_URL;

    public String requestGame() {
        GAME_REQUEST_URL = s3FileService.getFile("gameSentence.json");

        restTemplate.getMessageConverters()
                .add(new StringHttpMessageConverter(StandardCharsets.UTF_8));

        RequestEntity<Void> requestEntity = RequestEntity
                .get(URI.create(GAME_REQUEST_URL))
                .accept(MediaType.TEXT_PLAIN)
                .build();

        String sentenceData = restTemplate
                .exchange(requestEntity, String.class)
                .getBody();

//        log.info("sentenceData={}", sentenceData);
        return sentenceData;
    }

    public JSONObject getSubjectData(String subjectType) {
        String sentence;
        JSONObject subjectData = null;
        try {
            String sentenceData = requestGame();

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(sentenceData);

            subjectData = (JSONObject) jsonObject.get(subjectType);
//            System.out.println("해당 과목 전체 데이터 = " + subjectData);
            log.info("{} 전체 데이터={}", subjectType, subjectData);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return subjectData;
    }

    public String getSentence(String subjectType, String problemNum) {
        String sentence;
        JSONObject subjectData = getSubjectData(subjectType);

        if (subjectData == null || !subjectData.containsKey(problemNum)) {
            throw new NotFoundException(DefaultErrorCode.INVALID_GAME_SUBJECT_TYPE);
        }

        sentence = (String) subjectData.get(problemNum);
        if (sentence == null ) {
            throw new NotFoundException(DefaultErrorCode.INVALID_GAME_SENTENCE_NUMBER);
        }

//        log.info("sentence={}", sentence);
        return sentence;
    }
}
