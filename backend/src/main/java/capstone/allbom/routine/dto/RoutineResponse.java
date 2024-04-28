package capstone.allbom.routine.dto;


public record RoutineResponse(
        String type,
        String routine
) {
    public RoutineResponse {
    }

    public static RoutineResponse from(String type, String routine) {
        return new RoutineResponse(type, routine);
    }
}
