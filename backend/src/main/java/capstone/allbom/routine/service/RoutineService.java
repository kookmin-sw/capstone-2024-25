package capstone.allbom.routine.service;

import capstone.allbom.routine.domain.Routine;
import capstone.allbom.routine.domain.RoutineRepository;
import capstone.allbom.routine.infrastructure.api.RestTemplateRoutineRequester;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@EnableScheduling
@Slf4j
public class RoutineService {

    private final RoutineRepository routineRepository;
    private final RestTemplateRoutineRequester restTemplateRoutineRequester;

    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정에 실행
//    @Scheduled(cron = "0 32 11 * * ?")
    public void dailyRoutineAutoUpdate() {
        log.info("매일 자동으로 루틴이 업데이트된다.");
        List<Routine> all = routineRepository.findAll();
        List<String> routines = restTemplateRoutineRequester.getRandomRoutineFields();

        for (int i = 0; i < all.size(); i++) {
            Routine routineToUpdate = all.get(i);

            // "운동", "휴식", "성장", "취미", "과일", "간식", "식사"
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
}
