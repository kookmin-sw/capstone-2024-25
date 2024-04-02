package capstone.allbom.auth.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {

    RefreshToken save(RefreshToken refreshToken);

    Optional<RefreshToken> findByMemberId(Long memberId);
}
