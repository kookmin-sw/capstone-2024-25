package capstone.allbom.job.infrastructure.api;

import capstone.allbom.job.domain.Job;
import capstone.allbom.job.dto.JobRequest;
import capstone.allbom.job.service.JobService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RequiredArgsConstructor
@Component
@Slf4j
public class JobRequester {

    private final JobService jobService;
    private final String JOB_REQUEST_URL = "../data/work/workData.json";

    public String readFileAsString(String file) throws Exception {
        return new String(Files.readAllBytes(Paths.get(file)));
    }

    public List<Job> requestJob(){

//        Resource resource = resourceLoader.getResource("file:" + filePath);
//        byte[] bytes = FileCopyUtils.copyToByteArray(resource.getInputStream());

        try {
            String jobData = readFileAsString(JOB_REQUEST_URL);
            return makeJobs(jobData);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Job> makeJobs(String rawData) {
        ObjectMapper objectMapper = new ObjectMapper();

        List<JobRequest> jobRequests;

        try {
            jobRequests = objectMapper.readValue(rawData, new TypeReference<List<JobRequest>>() {
            });
        } catch (JsonProcessingException e) {
            log.error("객체로 변환하는 과정에서 문제가 발생했습니다.");
            throw new RuntimeException(e);
        }

        return jobRequests.stream()
                .map(JobRequest::toJob)
                .peek(jobService::saveJob)
                .toList();
    }
}
