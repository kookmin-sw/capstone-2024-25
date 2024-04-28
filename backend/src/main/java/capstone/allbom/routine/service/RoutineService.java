package capstone.allbom.routine.service;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
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

    public void checkDailyStatus(Routine routine, String type) {
        if (type == "exercise") {
            if (routine.getDailyExerciseStatus() == true) {
                throw new BadRequestException(DefaultErrorCode.COMPLETE_ROUTINE_EXERCISE);
            }
        } else if (type == "growth") {
                if (routine.getDailyGrowthStatus() == true) {
                    throw new BadRequestException(DefaultErrorCode.COMPLETE_ROUTINE_GROWTH);
                }
        } else if (type == "hobby") {
            if (routine.getDailyHobbyStatus() == true) {
                throw new BadRequestException(DefaultErrorCode.COMPLETE_ROUTINE_HOBBY);
            }
        } else if (type == "rest") {
            if (routine.getDailyRestStatus() == true) {
                throw new BadRequestException(DefaultErrorCode.COMPLETE_ROUTINE_REST);
            }
        } else {
            if (routine.getDailyEatStatus() == true) {
                throw new BadRequestException(DefaultErrorCode.COMPLETE_ROUTINE_EAT);
            }
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
            String eat = routineRequester.getRoutine(requestType, routine.getDailyEat().toString());
            if (eat.equals("간식 먹기")) {
                String snack = routineRequester.getRoutine("간식", routine.getDailySnack().toString());
                eat = snack + " 먹기";
            } else if (eat.equals("과일 먹기")) {
                String fruit = routineRequester.getRoutine("과일", routine.getDailyFruit().toString());
                eat = fruit + " 먹기";
            }
            return eat;
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
            default -> throw new IllegalArgumentException("Unexpected value: " + type);
        };
        return requestType;
    }

    public Integer getRoutineDataSize(String type) {
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

        switch (type) {
            case "exercise":
                if (totalSize <= routine.getDailyExercise()) {
                    routine.setDailyExercise(1);
                } else {
                    routine.setDailyExercise(routine.getDailyExercise() + 1);
                }
                break;
            case "growth":
                if (totalSize <= routine.getDailyGrowth()) {
                    routine.setDailyGrowth(1);
                } else {
                    routine.setDailyGrowth(routine.getDailyGrowth() + 1);
                }
                break;
            case "hobby":
                if (totalSize <= routine.getDailyHobby()) {
                    routine.setDailyHobby(1);
                } else {
                    routine.setDailyHobby(routine.getDailyHobby() + 1);
                }
                break;
            case "eat":
                if (totalSize <= routine.getDailyEat()) {
                    routine.setDailyEat(1);
                } else {
                    routine.setDailyEat(routine.getDailyEat() + 1);
                }
                break;
            default:
                if (totalSize <= routine.getDailyRest()) {
                    routine.setDailyRest(1);
                } else {
                    routine.setDailyRest(routine.getDailyRest() + 1);
                }
                break;
        }
    }

    @Transactional
    public void updateToPreviousRoutine(Routine routine, String type) {
        /**
         * TODO
         * daily status가 false인 경우에민 query 호출 가능하도록 예외 처리
         */
        String requestType = convertToRequestType(type);
        Integer totalSize = routineRequester.getRoutineData(requestType).size();

        switch (type) {
            case "exercise":
                if (routine.getDailyExercise() <= 1) {
                    routine.setDailyExercise(totalSize);
                } else {
                    routine.setDailyExercise(routine.getDailyExercise() - 1);
                }
                break;
            case "growth":
                if (routine.getDailyGrowth() <= 1) {
                    routine.setDailyGrowth(totalSize);
                } else {
                    routine.setDailyGrowth(routine.getDailyGrowth() - 1);
                }
                break;
            case "hobby":
                if (routine.getDailyHobby() <= 1) {
                    routine.setDailyHobby(totalSize);
                } else {
                    routine.setDailyHobby(routine.getDailyHobby() - 1);
                }
                break;
            case "eat":
                if (routine.getDailyEat() <= 1) {
                    routine.setDailyEat(totalSize);
                } else {
                    routine.setDailyEat(routine.getDailyEat() - 1);
                }
                break;
            default:
                if (routine.getDailyRest() <= 1) {
                    routine.setDailyRest(totalSize);
                } else {
                    routine.setDailyRest(routine.getDailyRest() - 1);
                }
                break;
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
