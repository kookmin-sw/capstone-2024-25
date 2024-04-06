package capstone.allbom.routine.service;

import capstone.allbom.Facility.domain.Facility;
import capstone.allbom.Facility.domain.FacilityType;
import capstone.allbom.routine.domain.Routine;
import capstone.allbom.routine.domain.RoutineRepository;
import jakarta.persistence.EntityManager;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class RoutineServiceTest {

    @Autowired EntityManager entityManager;
    @Autowired RoutineService routineService;
    @Autowired RoutineRepository routineRepository;

    @Test
    public void 모든_루틴_필드를_매일_업데이트한다() throws Exception{
        // given
        Routine routine1 = Routine.builder()
                .dailyExercise("맨몸 운동")
                .dailyGrowth("책 읽기")
                .dailyRest("잠 자기")
                .dailyFruit("바나나")
                .dailySnack("과자")
                .dailyHobby("영화 시청")
                .dailyEat("과자 먹기")
                .build();
        routineRepository.save(routine1);

        Routine routine2 = Routine.builder()
                .dailyExercise("몸 운동")
                .dailyGrowth("신문 읽기")
                .dailyRest("명상하기")
                .dailyFruit("딸기")
                .dailySnack("쿠키")
                .dailyHobby("자전거 타기")
                .dailyEat("쿠키 먹기")
                .build();
        routineRepository.save(routine2);

        // when
        routineService.dailyRoutineAutoUpdate();
        boolean condition1 = routine1.getDailyEatStatus() && routine1.getDailyGrowthStatus() &&
                routine1.getDailyExerciseStatus() && routine1.getDailyHobbyStatus() && routine1.getDailyRestStatus();

        boolean condition2 = routine2.getDailyEatStatus() && routine2.getDailyGrowthStatus() &&
                routine2.getDailyExerciseStatus() && routine2.getDailyHobbyStatus() && routine2.getDailyRestStatus();

        // then
        List<Routine> all = routineRepository.findAll();
        for (Routine routine : all) {
            System.out.println("routine = " + routine);
            System.out.println("exercise = " + routine.getDailyExercise());
            System.out.println("rest = " + routine.getDailyRest());
            System.out.println("growth = " + routine.getDailyGrowth());
            System.out.println("hobby = " + routine.getDailyHobby());
            System.out.println("fruit = " + routine.getDailyFruit());
            System.out.println("snack = " + routine.getDailySnack());
            System.out.println("eat = " + routine.getDailyEat());
        }
        assertThat(routine1.getDailyExercise()).isEqualTo(routine2.getDailyExercise());
        assertThat(routine1.getDailyRest()).isEqualTo(routine2.getDailyRest());
        assertThat(routine1.getDailyGrowth()).isEqualTo(routine2.getDailyGrowth());
        assertThat(routine1.getDailyEat()).isEqualTo(routine2.getDailyEat());

        assertFalse(condition1);
        assertFalse(condition2);
    }

}