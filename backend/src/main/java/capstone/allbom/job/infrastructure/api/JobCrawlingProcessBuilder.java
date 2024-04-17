package capstone.allbom.job.infrastructure.api;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URI;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
@Component
@Slf4j
public class JobCrawlingProcessBuilder {

//    private final String PYTHON_FILE_URL = "../data/work/main.py";
    private final String PYTHON_FILE_URL = "../../../test.py";

//    @Async
    @Async("threadPoolTaskExecutor")
//    @Scheduled(cron = "0 0 0 * * MON") // 매주 월요일 00:00:00에 실행
//    @Scheduled(fixedDelay = 2 * 7 * 24 * 60 * 60 * 1000)
    @Scheduled(cron = "0 24 0 * * ?")
    public void processPythonFile() throws IOException {

        ProcessBuilder processBuilder = new ProcessBuilder("python", PYTHON_FILE_URL);
        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();
        InputStream inputStream = process.getInputStream();
//        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

        String jobData = convertInputStreamToString(inputStream);
        System.out.println("jobData = " + jobData);
//        return jobData;
//
//        String line;
//        while ((line = reader.readLine()) != null) {
//            // 실행 결과 처리
//            System.out.println(line);
//        }
    }

    private String convertInputStreamToString(InputStream inputStream) throws IOException {
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
        while ((line = bufferedReader.readLine()) != null) {
            stringBuilder.append(line);
        }
        return stringBuilder.toString();
    }

}
