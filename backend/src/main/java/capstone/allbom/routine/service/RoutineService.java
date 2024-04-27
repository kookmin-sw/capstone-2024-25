package capstone.allbom.routine.service;

import capstone.allbom.routine.domain.Routine;
import capstone.allbom.routine.domain.RoutineRepository;
import capstone.allbom.routine.infrastructure.api.RestTemplateRoutineRequester;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@EnableScheduling
@Slf4j
public class RoutineService {

    private final RoutineRepository routineRepository;
    private final RestTemplateRoutineRequester routineRequester;

    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정에 실행
//    @Scheduled(cron = "0 32 11 * * ?")
    public void dailyRoutineAutoUpdate() {
        log.info("매일 자동으로 루틴이 업데이트된다.");
        List<Routine> all = routineRepository.findAll();
        List<Integer> routines = randomRoutine();

        for (int i = 0; i < all.size(); i++) {
            Routine routineToUpdate = all.get(i);

            routineToUpdate.setDailyExercise(routines.get(0));
            routineToUpdate.setDailyRest(routines.get(1));
            routineToUpdate.setDailyGrowth(routines.get(2));
            routineToUpdate.setDailyHobby(routines.get(3));
            routineToUpdate.setDailyFruit(routines.get(4));
            routineToUpdate.setDailySnack(routines.get(5));
            routineToUpdate.setDailyEat(routines.get(6));

            routineToUpdate.setDailyStatus();
        }
    }

    public String getRoutine(Routine routine, String type) {
        /**
         * TODO
         * 반환값 dto로 변경
         * eat 예외처리
         */
        String requestType = convertToRequestType(type);
        if (requestType.equals("운동")) {
            return routineRequester.getRoutine(requestType, routine.getDailyExercise().toString());
        } else if (requestType.equals("성장")) {
            return routineRequester.getRoutine(requestType, routine.getDailyGrowth().toString());
        } else if (requestType.equals("취미")) {
            return routineRequester.getRoutine(requestType, routine.getDailyHobby().toString());
        } else if (requestType.equals("식사")) {
            return routineRequester.getRoutine(requestType, routine.getDailyEat().toString());
        } else {
            return routineRequester.getRoutine(requestType, routine.getDailyRest().toString());
        }
    }

    private String convertToRequestType(String type) {
        String requestType = switch (type) {
            case "exercise" -> "운동";
            case "growth" -> "성장";
            case "hobby" -> "취미";
            case "eat" -> "식사";
            case "rest" -> "휴식";
            case "snack" -> "간식";
            case "fruit" -> "과일";
            default -> throw new IllegalArgumentException("Unexpected value: " + type);
        };
        return requestType;
    }

    public Integer getRoutineDataSize(String type) {
        System.out.println("type = " + type);
        String routineType = convertToRequestType(type);
        return routineRequester.getRoutineData(routineType).size();
    }

    @Transactional
    public void updateToNextRoutine(Routine routine, String type) {
        /**
         * TODO
         * daily status가 false인 경우에민 query 호출 가능하도록 예외 처리
         */
        String requestType = convertToRequestType(type);
        Integer totalSize = routineRequester.getRoutineData(requestType).size();

        if (type.equals("exercise")) {
            if (totalSize <= routine.getDailyExercise()) { // 현재의 문제가 마지막 루이거나 인덱스 범위를 초과했다면
                routine.setDailyExercise(0);
            } else {
                routine.setDailyExercise(routine.getDailyExercise() + 1);
            }
        } else if (type.equals("growth")) {
            if (totalSize <= routine.getDailyGrowth()) {
                routine.setDailyGrowth(0);
            } else {
                routine.setDailyGrowth(routine.getDailyGrowth() + 1);
            }
        } else if (type.equals("hobby")) {
            if (totalSize <= routine.getDailyHobby()) {
                routine.setDailyHobby(0);
            } else {
                routine.setDailyHobby(routine.getDailyHobby() + 1);
            }
        } else if (type.equals("eat")) {
            if (totalSize <= routine.getDailyEat()) {
                routine.setDailyEat(0);
            } else {
                routine.setDailyEat(routine.getDailyEat() + 1);
            }
        } else {
            if (totalSize <= routine.getDailyRest()) {
                routine.setDailyRest(0);
            } else {
                routine.setDailyRest(routine.getDailyRest() + 1);
            }
        }
    }

    public List<Integer> randomRoutine() {
        List<String> categories = Arrays.asList("운동", "휴식", "성장", "취미", "과일", "간식", "식사");
        return categories.stream()
                    .map(category -> (JSONObject) routineRequester.getRoutineData(category))
                    .map(this::selectRandomRoutine)
                    .collect(Collectors.toList());
    }

    public Integer selectRandomRoutine(JSONObject routineData) {
        Random random = new Random();
        int randomIndex = random.nextInt(routineData.size()) + 1;

        return randomIndex;
    }

}
