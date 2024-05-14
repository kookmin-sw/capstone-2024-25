package capstone.allbom.chatbot.infrastructure.api;

import capstone.allbom.chatbot.dto.AnswerRequest;
import capstone.allbom.chatbot.dto.AnswerResponse;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.InternalServerError;
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
public class ChatbotRequester {

    @Value("${ai.chatbot.api}")
    private String AI_CHATBOT_URL;

    public AnswerResponse requestAI(AnswerRequest answerRequest) {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost httpPost = new HttpPost(AI_CHATBOT_URL);

            ObjectMapper objectMapper = new ObjectMapper();
            String jsonRequest = objectMapper.writeValueAsString(answerRequest);

            log.info("request={}", jsonRequest);

            StringEntity stringEntity = new StringEntity(jsonRequest, ContentType.APPLICATION_JSON);
            httpPost.setEntity(stringEntity);

            try (CloseableHttpResponse response = httpClient.execute(httpPost)) {
                int statusCode = response.getStatusLine().getStatusCode();
                HttpEntity entity = response.getEntity();

                String responseBody = entity != null ? EntityUtils.toString(entity) : "";
                log.info("response body = {}", responseBody);
                String answer = objectMapper.readTree(responseBody).get("response").toString();

                AnswerResponse answerResponse = AnswerResponse.fromJson(answer);
                log.info("answer response={}", answerResponse);
                return answerResponse;
            }
        } catch (IOException e) {
            // 예외 처리
            throw new InternalServerError(DefaultErrorCode.AI_SERVER_ERROR);
        }
    }
}
