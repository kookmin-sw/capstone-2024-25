package capstone.allbom.job.infrastructure.api;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class JobCrawlingProcessBuilderTest {

    @Autowired JobCrawlingProcessBuilder jobCrawlingProcessBuilder;

    @Test
    public void 일자리_크롤링_파이썬_파일을_실행한다() throws IOException, InterruptedException {
        jobCrawlingProcessBuilder.processPythonFile();
    }

}