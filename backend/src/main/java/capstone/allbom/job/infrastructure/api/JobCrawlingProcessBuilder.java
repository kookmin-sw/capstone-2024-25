package capstone.allbom.job.infrastructure.api;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.scheduling.annotation.Async;
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

    private final String PYTHON_FILE_URL = "../data/work/main.py";
    private final RestTemplate restTemplate;

    @Async
    public void processPythonFile() throws IOException {

        ProcessBuilder processBuilder = new ProcessBuilder("python", PYTHON_FILE_URL);
        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();
        InputStream inputStream = process.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));

        String line;
        while ((line = reader.readLine()) != null) {
            // 실행 결과 처리
            System.out.println(line);
        }
    }

}
