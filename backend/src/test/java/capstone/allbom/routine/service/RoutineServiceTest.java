package capstone.allbom.routine.service;

import capstone.allbom.routine.domain.Routine;
import capstone.allbom.routine.domain.RoutineRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
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
public void 모든_루틴_필드를_매일_업데이트한다() throws Exception {
    // given
    Routine routine1 = Routine.builder()
            .dailyExercise(3)
            .dailyGrowth(1)
            .dailyRest(2)
            .dailyFruit(2)
            .dailySnack(2)
            .dailyHobby(3)
            .dailyEat(2)
            .build();
    routineRepository.save(routine1);

    Routine routine2 = Routine.builder()
            .dailyExercise(2)
            .dailyGrowth(4)
            .dailyRest(2)
            .dailyFruit(1)
            .dailySnack(3)
            .dailyHobby(2)
            .dailyEat(3)
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

    @Test
    public void 루틴_번호_필드로_루틴을_조회한다() {
        // given
        Routine routine1 = Routine.builder()
                .dailyExercise(3)
                .dailyGrowth(1)
                .dailyRest(2)
                .dailyFruit(5)
                .dailySnack(1)
                .dailyHobby(3)
                .dailyEat(4)
                .build();
        routineRepository.save(routine1);

        Routine routine2 = Routine.builder()
                .dailyExercise(2)
                .dailyGrowth(4)
                .dailyRest(2)
                .dailyFruit(1)
                .dailySnack(3)
                .dailyHobby(2)
                .dailyEat(3)
                .build();
        routineRepository.save(routine2);

        // when
        String exercise = routineService.getRoutine(routine1, "exercise");
        String rest = routineService.getRoutine(routine1, "rest");
        String growth = routineService.getRoutine(routine1, "growth");
        String hobby = routineService.getRoutine(routine1, "hobby");
        String eat = routineService.getRoutine(routine1, "eat");

        // then
        assertThat(exercise).isEqualTo("자전거 타기");
        assertThat(growth).isEqualTo("외국어 공부하기");
        assertThat(rest).isEqualTo("사우나 가기");
        assertThat(hobby).isEqualTo("박물관 가기");
        assertThat(eat).isEqualTo("키위 먹기");
    }

}