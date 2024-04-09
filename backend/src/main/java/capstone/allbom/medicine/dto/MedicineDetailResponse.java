package capstone.allbom.medicine.dto;

import capstone.allbom.medicine.domain.Medicine;

import java.util.List;

public record MedicineDetailResponse(
        Long id,
        String medicineName,
        List<String> medicineTime
) {
    public MedicineDetailResponse {
    }

    public static MedicineDetailResponse from(Medicine medicine) {
        return new MedicineDetailResponse(medicine.getId(), medicine.getMedicineName(), medicine.getMedicineTime());
    }
}
