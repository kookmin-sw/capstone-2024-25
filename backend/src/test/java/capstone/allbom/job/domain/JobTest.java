package capstone.allbom.job.domain;

import capstone.allbom.routine.domain.Routine;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;


class JobTest {

    @Test
    public void updateDeadline() {
        Job job = new Job();
//        job.setDeadline("채용시까지");
        job.setDday("D-15");
        Assertions.assertThat(job.getDday()).isEqualTo("D-15");
        job.updateDeadline(job.getDday());
        Assertions.assertThat(job.getDday()).isEqualTo("D-14");
    }

}