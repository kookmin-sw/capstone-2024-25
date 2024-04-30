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
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/todo")
@Slf4j
public class RoutineController implements RoutineControllerDocs{

    private final RoutineService routineService;


    @GetMapping
    public ResponseEntity<List<RoutineResponse>> getAllRoutine(@Auth final Member member) {
        Routine routine = routineService.findByMember(member);
        List<String> categories = Arrays.asList("exercise", "growth", "hobby", "rest", "eat");

        List<RoutineResponse> routineResponses = categories.stream()
                .filter(category -> {
                    try {
                        routineService.checkDailyStatus(routine, category);
                        return true; // 예외 없이 통과
                    } catch (BadRequestException e) {
                        return false; // 예외 발생
                    }
                })
                .map(category -> RoutineResponse.from(category, routineService.getRoutine(routine, category)))
                .collect(Collectors.toList());

        if (routineResponses.isEmpty()) {
            throw new BadRequestException(DefaultErrorCode.COMPLETE_ALL_ROUTINE);
        }

        return ResponseEntity.ok(routineResponses);
    }

    @GetMapping("/{type}")
    public ResponseEntity<RoutineResponse> getRoutine(
            @Auth final Member member,
            @PathVariable final String type
    ) {
        Routine routine = routineService.findByMember(member);
        routineService.checkDailyStatus(routine, type);
        String contents = routineService.getRoutine(routine, type);
        return ResponseEntity.ok(RoutineResponse.from(type, contents));
    }

    @PatchMapping("/previous/{type}")
    public ResponseEntity<RoutineResponse> updateToPreviousRoutine(
            @Auth final Member member,
            @PathVariable final String type
    ) {
        Routine routine = routineService.findByMember(member);
        routineService.checkDailyStatus(routine, type);
        routineService.updateToPreviousRoutine(routine, type);
        String contents = routineService.getRoutine(routine, type);
        return ResponseEntity.ok(RoutineResponse.from(type, contents));
    }

    @PatchMapping("/next/{type}")
    public ResponseEntity<RoutineResponse> updateToNextRoutine(
            @Auth final Member member,
            @PathVariable final String type
    ) {
        Routine routine = routineService.findByMember(member);
        routineService.checkDailyStatus(routine, type);
        routineService.updateToNextRoutine(routine, type);
        String contents = routineService.getRoutine(routine, type);
        return ResponseEntity.ok(RoutineResponse.from(type, contents));
    }

    @PostMapping("/{type}")
    public ResponseEntity<Void> changeRoutineStatus(
            @Auth final Member member,
            @PathVariable final String type
    ) {
        Routine routine = routineService.findByMember(member);
        routineService.checkDailyStatus(routine, type);
        routineService.changeDailyStatus(routine, type);
        return ResponseEntity.noContent().build();
    }
}
