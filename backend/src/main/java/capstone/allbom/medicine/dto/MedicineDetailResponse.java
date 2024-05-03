package capstone.allbom.medicine.dto;

import capstone.allbom.medicine.domain.Medicine;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Schema(description = "약 응답")
public record MedicineDetailResponse(
        @Schema(description = "약 ID", example = "1")
        Long id,

        @Schema(description = "약 이름", example = "지르텍")
        String medicineName,

        @Schema(description = "약 시간대", example = "[\"점심\", \"저녁\"]")
        List<String> medicineTime
) {
    public MedicineDetailResponse {
    }

    public static MedicineDetailResponse from(Medicine medicine) {
        return new MedicineDetailResponse(medicine.getId(), medicine.getMedicineName(), medicine.getMedicineTime());
    }
}
