package capstone.allbom.auth.service.oauth.kakao;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter @Setter
@Component
@ConfigurationProperties(prefix = "kakao.login")
public class KakaoOAuthLoginInfo {
    private String grantType;
    private String clientId;
    private String clientSecret;
    private String redirectUri;

    public KakaoOAuthLoginInfo() {
        // 기본 생성자 필요
    }

    // Getter, Setter 메서드 필요
}