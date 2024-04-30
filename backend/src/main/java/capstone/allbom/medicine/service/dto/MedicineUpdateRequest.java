package capstone.allbom.medicine.service.dto;

import capstone.allbom.common.util.Validator;
import capstone.allbom.medicine.domain.Medicine;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Range;

import java.util.List;

@Schema(description = "약 수정 요청")
public record MedicineUpdateRequest(
        @Schema(description = "약 이름", example = "지르텍")
        @NotNull(message = "약 이름은 필수입니다.")
        @Range(min = 1, max = 20, message = "약 이름의 길이를 확인해주세요.")
        String medicineName,

        @Schema(description = "약 시간대", example = "[\"점심\", \"저녁\"]")
        @NotNull
        List<String> medicineTime
) {

    public MedicineUpdateRequest {
        Validator.notNull(medicineName, "medicineName");
        Validator.notNull(medicineTime, "medicineTime");
        Validator.minLength(medicineName, 1, "medicineName");
        Validator.maxLength(medicineName, 20, "medicineName");
    }
    }