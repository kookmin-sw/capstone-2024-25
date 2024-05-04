package capstone.allbom.job.domain;

import capstone.allbom.facility.domain.Facility;
import capstone.allbom.facility.domain.FacilityType;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class JobRepositoryTest {

    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Test
    void 가까운_순으로_일자리를_조회한다() {
        // given
        Job job1 = Job.builder()
                .companyName("을지로 일자리")
                .province(Province.SEOUL)
                .latitude(37.564968669228406)
                .longitude(126.98174281416829)
                .build();
        jobRepository.save(job1);

        Job job2 = Job.builder()
                .companyName("서대문 일자리")
                .province(Province.SEOUL)
                .latitude(37.56878422452289)
                .longitude(126.96211412458332)
                .build();
        jobRepository.save(job2);

        Job job3 = Job.builder()
                .companyName("홍대입구 일자리")
                .province(Province.SEOUL)
                .latitude(37.560010917591285)
                .longitude(126.92841348963161)
                .build();
        jobRepository.save(job3);

        Job job4 = Job.builder()
                .companyName("가좌역 일자리")
                .province(Province.INCHEON)
                .latitude(37.56559050617467)
                .longitude(126.91826644529445)
                .build();
        jobRepository.save(job4);

        Job job5 = Job.builder()
                .companyName("성수동 일자리")
                .province(Province.SEOUL)
                .latitude(37.54710405787593)
                .longitude(127.04414400511523)
                .build();
        jobRepository.save(job5);

        Member member = Member.builder() // 건대입구
                .latitude(37.55062990430541)
                .longitude(127.07422562281847)
                .build();
        memberRepository.save(member);

        // when
        List<Job> jobs = jobRepository
                .findJobsNearbyMemberAddress(Province.SEOUL, member.getLatitude(), member.getLongitude());

        for (Job job : jobs) {
            System.out.println("job.getCompanyName() = " + job.getCompanyName());
        }


    }

}