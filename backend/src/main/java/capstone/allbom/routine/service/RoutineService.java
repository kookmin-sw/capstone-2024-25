package capstone.allbom.routine.service;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.NotFoundException;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
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
    private final MemberRepository memberRepository;
    private final RestTemplateRoutineRequester routineRequester;

    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정에 실행
//    @Scheduled(cron = "0 32 11 * * ?")
    public void dailyRoutineAutoUpdate() {
        log.info("매일 자동으로 루틴이 업데이트된다.");
        List<Routine> all = routineRepository.findAll();
        List<Integer> routines = randomRoutine();

        for (int i = 0; i < all.size(); i++) {
            Routine routineToUpdate = all.get(i);
            updateRoutine(routineToUpdate, routines);
        }
    }

    @Transactional
    public Routine updateRoutine(Routine routine, List<Integer> randomRoutines) {
        routine.setDailyExercise(randomRoutines.get(0));
        routine.setDailyRest(randomRoutines.get(1));
        routine.setDailyGrowth(randomRoutines.get(2));
        routine.setDailyHobby(randomRoutines.get(3));
        routine.setDailyFruit(randomRoutines.get(4));
        routine.setDailySnack(randomRoutines.get(5));
        routine.setDailyEat(randomRoutines.get(6));

        routine.setDailyStatus();

        return routine;
    }

    @Transactional
    public Routine findByMember(final Member member) {
        Member savedMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));

        return routineRepository.findByMemberId(savedMember.getId())
                .orElseGet(() -> createRoutine(savedMember));
    }

    @Transactional
    public Routine createRoutine(final Member member) {
        final Routine routine = routineRepository.save(new Routine());
        routine.setMember(member);

        List<Integer> routines = randomRoutine();
        Routine updatedRoutine = updateRoutine(routine, routines);
        return updatedRoutine;
    }

    public void checkDailyStatus(Routine routine, String type) {
        boolean isComplete = false;
        switch (type) {
            case "exercise":
                isComplete = routine.getDailyExerciseStatus();
                break;
            case "growth":
                isComplete = routine.getDailyGrowthStatus();
                break;
            case "hobby":
                isComplete = routine.getDailyHobbyStatus();
                break;
            case "rest":
                isComplete = routine.getDailyRestStatus();
                break;
            case "eat":
                isComplete = routine.getDailyEatStatus();
                break;
            default:
                throw new NotFoundException(DefaultErrorCode.INVALID_ROUTINE_TYPE);
        }

        if (isComplete) {
            throw new BadRequestException(DefaultErrorCode.valueOf("COMPLETE_ROUTINE_" + type.toUpperCase()));
        }
    }

    @Transactional
    public void changeDailyStatus(Routine routine, String type) {
        switch (type) {
            case "exercise":
                routine.setDailyExerciseStatus(true);
                break;
            case "growth":
                routine.setDailyGrowthStatus(true);
                break;
            case "hobby":
                routine.setDailyHobbyStatus(true);
                break;
            case "rest":
                routine.setDailyRestStatus(true);
                break;
            case "eat":
                routine.setDailyEatStatus(true);
                break;
            default:
                throw new NotFoundException(DefaultErrorCode.INVALID_ROUTINE_TYPE);
        }
    }
    public String getRoutine(Routine routine, String type) {
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
            default -> throw new NotFoundException(DefaultErrorCode.INVALID_ROUTINE_TYPE);
        };
        return requestType;
    }

    public Integer getRoutineDataSize(String type) {
        String routineType = convertToRequestType(type);
        return routineRequester.getRoutineData(routineType).size();
    }

    @Transactional
    public void updateToNextRoutine(Routine routine, String type) {
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
