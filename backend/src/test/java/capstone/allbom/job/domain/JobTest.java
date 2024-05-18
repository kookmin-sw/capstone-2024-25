package capstone.allbom.job.domain;

import capstone.allbom.routine.domain.Routine;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;


class JobTest {

    @Test
    public void updateDeadline() {
        // given
        Job job1 = new Job();
        job1.setDday("D-15");

        Job job2 = new Job();
        job2.setDday("D-1");

        // when
        job1.updateDeadline(job1.getDday());
        job2.updateDeadline(job2.getDday());

        // then
        Assertions.assertThat(job1.getDday()).isEqualTo("D-14");
        System.out.println("job2.getDday() = " + job2.getDday());
    }

}