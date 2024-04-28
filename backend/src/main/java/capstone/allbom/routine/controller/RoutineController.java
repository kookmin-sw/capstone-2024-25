package capstone.allbom.routine.controller;

import capstone.allbom.common.jwt.Auth;
import capstone.allbom.member.domain.Member;
import capstone.allbom.routine.domain.Routine;
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


}
