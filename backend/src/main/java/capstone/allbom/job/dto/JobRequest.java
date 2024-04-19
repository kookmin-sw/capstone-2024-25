package capstone.allbom.job.dto;

import capstone.allbom.job.domain.Job;
import capstone.allbom.job.domain.Province;

import java.time.LocalDate;

public record JobRequest(
        String worknetId,
        String province,
        String title,
        String deadline,
        String dday,
        String career,
        String scholarship,
        String address,
        Double latitude,
        Double longitude,
        String pay,
        String companyImageUrl,
        String companyName,
        String employmentType,
        String workType,
        String occupation,
        String contents,
        String worknetUrl
) {
    public Job toJob() {
        return Job.builder()
                .worknetId(worknetId)
                .province(Province.valueOf(province.toUpperCase()))
                .title(title)
                .deadline(LocalDate.parse(deadline))
                .dday(dday)
                .career(career)
                .scholarship(scholarship)
                .address(address)
                .latitude(latitude)
                .longitude(longitude)
                .pay(pay)
                .companyImageUrl(companyImageUrl)
                .companyName(companyName)
                .employmentType(employmentType)
                .workType(workType)
                .occupation(occupation)
                .contents(contents)
                .worknetUrl(worknetUrl)
                .build();
    }
}
