package capstone.allbom.chatbot.infrastructure.api;

import capstone.allbom.chatbot.dto.AnswerRequest;
import capstone.allbom.chatbot.dto.AnswerResponse;
import capstone.allbom.chatbot.dto.twentyQuestions.TwentyAnswerRequest;
import capstone.allbom.chatbot.dto.twentyQuestions.TwentyAnswerResponse;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.InternalServerError;
import capstone.allbom.common.exception.UnexpectedException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;

@RequiredArgsConstructor
@Slf4j
@Component
public class TwentyQuestionsRequester {

    @Value("${ai.twenty-questions.api}")
    private String AI_TWENTY_QUESTIONS_URL;

    public TwentyAnswerResponse requestAI(TwentyAnswerRequest twentyAnswerRequest) {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost httpPost = new HttpPost(AI_TWENTY_QUESTIONS_URL);

            ObjectMapper objectMapper = new ObjectMapper();
            String jsonRequest = objectMapper.writeValueAsString(twentyAnswerRequest);

            log.info("jsonRequest={}", jsonRequest);

            StringEntity stringEntity = new StringEntity(jsonRequest, ContentType.APPLICATION_JSON);
            httpPost.setEntity(stringEntity);

            try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
                int statusCode = response.getStatusLine().getStatusCode();
                HttpEntity entity = response.getEntity();

                String responseBody = entity != null ? EntityUtils.toString(entity) : "";
                log.info("response body={}", responseBody);
                String answer = objectMapper.readTree(responseBody).get("response").toString();

                TwentyAnswerResponse twentyAnswerResponse = TwentyAnswerResponse.fromJson(answer);
                log.info("twentyQuestions response={}", twentyAnswerResponse);
                return twentyAnswerResponse;
            }
        } catch (IOException e) {
            throw new InternalServerError(DefaultErrorCode.AI_SERVER_ERROR);
        }
    }

}
