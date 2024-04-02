package capstone.allbom.auth.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Entity
@Getter
@AllArgsConstructor
public class RefreshToken {
    @Id
    private String token;

    private Long memberId;
}
