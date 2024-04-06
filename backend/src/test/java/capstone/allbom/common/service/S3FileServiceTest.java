package capstone.allbom.common.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.nio.file.Files;
import java.nio.file.Paths;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
//@Transactional
class S3FileServiceTest {

    @Autowired
    private S3FileService s3FileService;

    @Test
    public void s3_파일을_조회한다() {
        String filePath = s3FileService.getFile("routine.json");
        System.out.println("filePath = " + filePath);
        assertThat(filePath).isNotNull();

//        RestTemplate restTemplate = new RestTemplate();
//        String jsonString = restTemplate.getForObject(filePath, String.class);
//
//        try {
//            ObjectMapper objectMapper = new ObjectMapper();
//            JsonNode jsonNode = objectMapper.readTree(jsonString);
//
//            JsonNode fruitNode = jsonNode.get("식사").get("과일 먹기");
//            if (fruitNode != null && fruitNode.isArray()) {
//                for (JsonNode fruit : fruitNode) {
//                    System.out.println(fruit.asText());
//                }
//            } else {
//                System.out.println("과일 목록이 없습니다.");
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
    }

}