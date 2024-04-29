package capstone.allbom.common.jwt;

import capstone.allbom.common.log.context.MemberIdHolder;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final List<String> ALLOWED_URIS = List.of(
            "/auth/kakao/callback",
            "/auth/logout",
            "/auth/login",
            "/auth/register",
            "/auth/general/login",
            "/auth/token",
            "/api/member/duplicate",
            "/swagger-custom-ui.html",
            "/swagger-ui/index.html",
            "/swagger-ui/swagger-initializer.js",
            "/api-docs/swagger-config",
            "/swagger-ui",
            "/api-docs"
    );

    private static final List<String> ALLOWED_START_URIS = List.of(
//            "/"
            "/swagger-custom-ui.html"
            /**
             * TODO
             * 시작 URI 설정
             */
    );

//    private static final List<String> ALLOWED_END_URIS = List.of(
//
//    );

    private static final Map<String, String> MATCH_URI_METHOD = new HashMap<>(
            /**
             * TODO
             */
    );

    private final MemberIdHolder memberIdHolder;
    private final TokenProcessor tokenProcessor;

    @Override
    protected void doFilterInternal(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final FilterChain filterChain
    ) throws ServletException, IOException {
        log.info("doFilter internal");

        final String token = request.getHeader(HttpHeaders.AUTHORIZATION);
//        log.info("token = {}", token);
        System.out.println("token = " + token);

        final String tokenWithoutType = tokenProcessor.extractAccessToken(token);
//        log.info("tokenWithoutType = {}", tokenWithoutType);
        System.out.println("tokenWithoutType = " + tokenWithoutType);

        tokenProcessor.validateToken(tokenWithoutType);
        final TokenPayload tokenPayload = tokenProcessor.decodeToken(tokenWithoutType);
        System.out.println("tokenPayload.memberId = " + tokenPayload.memberId());
        memberIdHolder.setId(tokenPayload.memberId());
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(final HttpServletRequest request) {
        /**
         * TODO
         * ALLOWED_START_URIS 설정 후에 return 값에 startsWithAllowedStartUris(request) 추가
         */

        System.out.println("request = " + request.getRequestURI());

        log.info("shouldnotFilter1 = {}", containsAllowedUris(request));
        log.info("shouldnotFilter2 = {}", matchesUriPattern(request));

        return containsAllowedUris(request) || matchesUriPattern(request);
//        return containsAllowedUris(request) || startsWithAllowedStartUris(request)
//                || matchesUriPattern(request);
    }

    private boolean containsAllowedUris(final HttpServletRequest request) {
        return ALLOWED_URIS.stream()
                .anyMatch(url -> request.getRequestURI().contains(url));
    }

    private boolean startsWithAllowedStartUris(final HttpServletRequest request) {
        return ALLOWED_START_URIS.stream()
                .anyMatch(url -> request.getRequestURI().startsWith(url));
    }

//    private boolean matchesGuestRequest(final HttpServletRequest request) {
//        return ALLOWED_END_URIS.stream()
//                .anyMatch(url -> request.getRequestURI().endsWith(url) &&
//                        Objects.equals(request.getMethod(), HttpMethod.GET.name()));
//    }

    private boolean matchesUriPattern(final HttpServletRequest request) {
        return MATCH_URI_METHOD.keySet()
                .stream()
                .anyMatch(key -> isMatchUriAndMethod(request, key));
    }

    private boolean isMatchUriAndMethod(final HttpServletRequest request, final String uriPattern) {
        return request.getRequestURI().matches(uriPattern)
                && MATCH_URI_METHOD.get(uriPattern).equalsIgnoreCase(request.getMethod());
    }
}
