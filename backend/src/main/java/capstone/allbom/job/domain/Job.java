package capstone.allbom.job.domain;

import jakarta.persistence.*;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;

@Entity
@Getter @Setter
@Slf4j
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Job {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id")
    private Long id;

    private String worknetId;

    @Enumerated(EnumType.STRING)
    private Province province;

    private String title;

    private LocalDate deadline;

    private String dday;

    private String career;

    private String scholarship;

    private String address;

    private Double latitude;

    private Double longitude;

    private String pay;

    private String companyImageUrl;

    private String companyName;

    private String employmentType; // 고용형태 (근로계약 등)

    private String workType; // 근무형태 (주 몇일 근무)

    private String occupation; // 모집직종

    private String contents; // 직무내용

    private String worknetUrl;

    public void updateDeadline(String deadline) {
        if (deadline.startsWith("D-")) {
            try {
                log.info("deadline = {}", deadline);
                int daysLeft = Integer.parseInt(deadline.substring(2));
                if (daysLeft >= 1) {
                    daysLeft--;
                    deadline = "D-" + daysLeft;
                    log.info("updateDeadline = {}", deadline);
                } else {
                    deadline = "채용마감";
                }
            } catch (NumberFormatException e) {
                log.error("올바른 형식의 {}이 아닙니다.", deadline);
//                System.err.println("올바른 형식의 deadline이 아닙니다.");
            }
        }
    }
}
