package capstone.allbom.job.dto;

import capstone.allbom.facility.dto.MapDetailResponse;
import capstone.allbom.job.domain.Job;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import static lombok.AccessLevel.PRIVATE;

@Getter
@AllArgsConstructor
public class JobMapDetailResponse extends MapDetailResponse {
    private final Long id;
    private final String type; // 정적으로 선언
    private final String occupation;
    private final String address;

    public static JobMapDetailResponse from(Job job) {
        String type = "JOB";
        return new JobMapDetailResponse(
                job.getId(),
                type, // 직접 정적 필드를 사용
                job.getOccupation(),
                job.getAddress()
        );
    }
}
