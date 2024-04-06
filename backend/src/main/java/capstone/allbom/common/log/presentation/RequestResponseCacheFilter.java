package capstone.allbom.common.log.presentation;

import capstone.allbom.common.util.MultipartUtils;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;

public class RequestResponseCacheFilter implements Filter {

    @Override
    public void doFilter(final ServletRequest request, final ServletResponse response, final FilterChain chain)
            throws IOException, ServletException {
        final ContentCachingResponseWrapper contentCachingResponse =
                new ContentCachingResponseWrapper((HttpServletResponse) response);
        chain.doFilter(getRequest(request), contentCachingResponse);
        contentCachingResponse.copyBodyToResponse();
    }

    private ServletRequest getRequest(final ServletRequest request) {
        if (MultipartUtils.isMultipartRequest((HttpServletRequest) request)) {
            return request;
        }
        return new RepeatReadableRequestWrapper((HttpServletRequest) request);
    }

}
