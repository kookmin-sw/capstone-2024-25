package capstone.allbom.medicine.service.dto;

import capstone.allbom.medicine.domain.Medicine;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import org.hibernate.validator.constraints.Range;

import java.util.List;

@Builder
public record MedicineRequest(
        @NotNull(message = "약 이름은 필수입니다.")
        @Range(min = 1, max = 20, message = "약 이름의 길이를 확인해주세요.")
        String MedicineName,
        @NotNull
        List<String> medicineTime
) {

    public Medicine toDomain() {
        return new Medicine(
                null,
                null,
                MedicineName,
                medicineTime
        );
    }
}
