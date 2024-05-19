package capstone.allbom.job.infrastructure.api;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.io.IOException;

@RequiredArgsConstructor
@Component
@Slf4j
public class JobCrawlingProcessBuilder {

    private final String PYTHON_FILE_URL = "../data/work/main.py";
//    private final String PYTHON_FILE_URL = "../data/work/test/test.py";
    private final JobRequester jobRequester;

    @Async("threadPoolTaskExecutor")
//    @Scheduled(cron = "0 0 0 * * MON") // 매주 월요일 00:00:00에 실행
//    @Scheduled(fixedDelay = 2 * 7 * 24 * 60 * 60 * 1000)
    @Scheduled(cron = "0 40 2 * * ?")
    public void processPythonFile() throws IOException, InterruptedException {

        ProcessBuilder processBuilder = new ProcessBuilder("python", PYTHON_FILE_URL);
        processBuilder.redirectErrorStream(true);

        try {
            Process process = processBuilder.start();
            if (process.waitFor() == 0) {
                log.info("process success exit");
                jobRequester.requestJob();
            } else {
                throw new BadRequestException(DefaultErrorCode.JOB_CRAWLING_EXECUTE_ERROR);
            }
        } catch (BadRequestException e) {
            jobRequester.requestJob();
        }
    }
}
