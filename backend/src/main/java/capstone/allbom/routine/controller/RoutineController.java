package capstone.allbom.routine.controller;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.jwt.Auth;
import capstone.allbom.member.domain.Member;
import capstone.allbom.routine.domain.Routine;
import capstone.allbom.routine.domain.RoutineRepository;
import capstone.allbom.routine.dto.RoutineResponse;
import capstone.allbom.routine.service.RoutineService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/todo")
@Slf4j
public class RoutineController {

    private final RoutineService routineService;

    @GetMapping
    public ResponseEntity<List<RoutineResponse>> getAllRoutine(
            @Auth final Member member
    ) {
        Routine routine = routineService.findByMember(member);
        List<String> categories = Arrays.asList("exercise", "growth", "hobby", "rest", "eat");
        List<String> notCompletedCategories = new ArrayList<>();
        List<RoutineResponse> routineResponses = new ArrayList<>();

        categories.forEach(category -> {
            try {
                routineService.checkDailyStatus(routine, category);
                notCompletedCategories.add(category);
            } catch (BadRequestException e) {
            }
        });

        if (notCompletedCategories.isEmpty()) {
            throw new BadRequestException(DefaultErrorCode.COMPLETE_ALL_ROUTINE);
        }
        notCompletedCategories.forEach(category -> {
            String contents = routineService.getRoutine(routine, category);
            routineResponses.add(RoutineResponse.from(category, contents));
        });
        return ResponseEntity.ok(routineResponses);
    }
}
