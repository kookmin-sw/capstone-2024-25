package capstone.allbom.job.service;

import capstone.allbom.job.domain.Job;
import capstone.allbom.job.domain.JobRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class JobServiceTest {

    @Autowired JobService jobService;
    @Autowired JobRepository jobRepository;

    @Test
    public void 일자리_D_Day를_업데이트한다() {
        // given
        Job job1 = Job.builder()
                .dday("D-15")
                .deadline(LocalDate.parse("2024-05-14"))
                .build();
        jobRepository.save(job1);

        Job job2 = Job.builder()
                .dday("D-1")
                .deadline(LocalDate.parse("2024-05-08"))
                .build();
        jobRepository.save(job2);

        Job job3 = Job.builder()
                .dday("D-1")
                .deadline(LocalDate.parse("2024-05-06"))
                .build();
        jobRepository.save(job3);

        // when
        jobService.updateDday(job1);
        jobService.updateDday(job2);
        jobService.updateDday(job3);

        // then
        Assertions.assertThat(job1.getDday()).isEqualTo("D-6");
        Assertions.assertThat(job2.getDday()).isEqualTo("D-0");
        Assertions.assertThat(job3.getDday()).isEqualTo("D+2");
    }

}