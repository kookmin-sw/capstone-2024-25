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
    private final String PYTHON_FILE_URL = "../data/work/main.py";
//    private final String PYTHON_FILE_URL = "../../../test.py";
//    private final String JOB_REQUEST_URL = "../data/workData.json";


    @Async
//    @Async("threadPoolTaskExecutor")
//    @Scheduled(cron = "0 0 0 * * MON") // 매주 월요일 00:00:00에 실행
//    @Scheduled(fixedDelay = 2 * 7 * 24 * 60 * 60 * 1000)
    @Scheduled(cron = "0 54 14 * * ?")
    public void processPythonFile() throws IOException, InterruptedException {

        ProcessBuilder processBuilder = new ProcessBuilder("python", PYTHON_FILE_URL);
        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();
        InputStream inputStream = process.getInputStream();
        String jobData = convertInputStreamToString(inputStream);
        System.out.println("jobData = " + jobData);

//        if (process.waitFor() == 0) { // 파이썬 프로세스가 성공적으로 종료
//            InputStream inputStream = process.getInputStream();
//            String jobData = convertInputStreamToString(inputStream);
//            System.out.println("jobData = " + jobData);
//        } else {
//            // 파이썬 프로세스가 오류로 종료되었음을 나타냄
//            InputStream errorStream = process.getErrorStream();
//            String errorMessage = convertInputStreamToString(errorStream);
//            System.err.println("Python process error: " + errorMessage);
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
