package capstone.allbom.job.domain;

import capstone.allbom.facility.domain.Facility;
import capstone.allbom.facility.domain.FacilityType;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class JobRepositoryTest {

    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Nested
    class jobQueryTest {
        // given
        Job job1 = Job.builder()
                .companyName("을지로 일자리")
                .province(Province.SEOUL)
                .latitude(37.564968669228406)
                .longitude(126.98174281416829)
                .deadline(LocalDate.of(2024, 3, 1))
                .build();

        Job job2 = Job.builder()
                .companyName("서대문 일자리")
                .province(Province.SEOUL)
                .latitude(37.56878422452289)
                .longitude(126.96211412458332)
                .deadline(LocalDate.of(2024, 3, 2))
                .build();

        Job job3 = Job.builder()
                .companyName("홍대입구 일자리")
                .province(Province.SEOUL)
                .latitude(37.560010917591285)
                .longitude(126.92841348963161)
                .deadline(LocalDate.of(2024, 3, 12))
                .build();

        Job job4 = Job.builder()
                .companyName("가좌역 일자리")
                .province(Province.INCHEON)
                .latitude(37.56559050617467)
                .longitude(126.91826644529445)
                .deadline(LocalDate.of(2024, 1, 1))
                .build();

        Job job5 = Job.builder()
                .companyName("성수동 일자리")
                .province(Province.SEOUL)
                .latitude(37.54710405787593)
                .longitude(127.04414400511523)
                .deadline(LocalDate.of(2020, 1, 1))
                .build();

        Member member = Member.builder() // 건대입구
                .latitude(37.55062990430541)
                .longitude(127.07422562281847)
                .build();

        @Test
        void 가까운_순으로_일자리를_조회한다() {
            //given
            jobRepository.save(job1);
            jobRepository.save(job2);
            jobRepository.save(job3);
            jobRepository.save(job4);
            jobRepository.save(job5);
            memberRepository.save(member);

            // when
            List<Job> jobs = jobRepository
                    .findJobsOrderByAddress(Province.SEOUL, member.getLatitude(), member.getLongitude());

            for (Job job : jobs) {
                System.out.println("job.getCompanyName() = " + job.getCompanyName());
            }
        }

        @Test
        void 마감일자_순으로_일자리를_조회한다() {
            //given
            jobRepository.save(job1);
            jobRepository.save(job2);
            jobRepository.save(job3);
            jobRepository.save(job4);
            jobRepository.save(job5);
            memberRepository.save(member);

            // when
            List<Job> jobs = jobRepository
                    .findJobsOrderByDeadline(Province.SEOUL);


            // then (5->4->1->2->3)
            for (Job job : jobs) {
                System.out.println("job.getCompanyName() = " + job.getCompanyName());
                System.out.println("job.getDeadline() = " + job.getDeadline());
            }
        }

    }

}