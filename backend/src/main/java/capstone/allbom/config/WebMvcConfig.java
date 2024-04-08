package capstone.allbom.config;

import capstone.allbom.common.jwt.JwtAuthenticationFilter;
import capstone.allbom.common.jwt.JwtAuthorizationArgumentResolver;
import capstone.allbom.common.jwt.TokenProcessor;
import capstone.allbom.common.log.context.MemberIdHolder;
import capstone.allbom.common.log.presentation.RequestLogInterceptor;
import capstone.allbom.common.log.presentation.RequestResponseCacheFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private static final String LOCALHOST_FRONTEND = "http://localhost:3000";
    private static final String HTTPS_LOCALHOST_FRONTEND = "https://localhost:3000";
//    private static final String PROD_SERVER = "https://allbom.com";

    private final MemberIdHolder memberIdHolder;
    private final RequestLogInterceptor requestLogInterceptor;
    private final TokenProcessor tokenProcessor;
    private final JwtAuthorizationArgumentResolver jwtAuthorizationArgumentResolver;

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilterRegistrationBean() {
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin(LOCALHOST_FRONTEND);
        config.addAllowedOrigin(HTTPS_LOCALHOST_FRONTEND);
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.addExposedHeader(HttpHeaders.LOCATION);
        config.addExposedHeader(HttpHeaders.SET_COOKIE);

        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        final FilterRegistrationBean<CorsFilter> filterBean = new FilterRegistrationBean<>(new CorsFilter(source));
        filterBean.setOrder(0);

        return filterBean;
    }

//    @Bean
//    public FilterRegistrationBean<RequestResponseCacheFilter> requestResponseCacheFilter() {
//        final FilterRegistrationBean<RequestResponseCacheFilter> filterRegistrationBean = new FilterRegistrationBean<>();
//        filterRegistrationBean.setFilter(new RequestResponseCacheFilter());
//        filterRegistrationBean.addUrlPatterns("/*");
//        filterRegistrationBean.setOrder(1);
//        return filterRegistrationBean;
//    }

    @Bean
    public FilterRegistrationBean<JwtAuthenticationFilter> jwtAuthenticationFilter() {
        final FilterRegistrationBean<JwtAuthenticationFilter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new JwtAuthenticationFilter(memberIdHolder, tokenProcessor));
        filterRegistrationBean.addUrlPatterns("/*");
        filterRegistrationBean.setOrder(1);
        /**
         * TODO
         * setOrder(2) -> (1)
         * filterRegistrationBean 구현
         */
        return filterRegistrationBean;
    }

//    @Override
//    public void addInterceptors(final InterceptorRegistry registry) {
//        registry.addInterceptor(requestLogInterceptor)
//                .addPathPatterns("/**")
//                .order(1);
//    }

    @Override
    public void addArgumentResolvers(final List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(jwtAuthorizationArgumentResolver);
    }
}
