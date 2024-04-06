package capstone.allbom.common.log.presentation;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.util.stream.Collectors;

public class MessageBodyReader {

    @NotNull
    public static String readBody(final HttpServletRequest request) {
        if (request.getContentLength() == 0) {
            return "";
        }
        try {
            return request.getReader().lines().collect(Collectors.joining("\n"));
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    @NotNull
    public static String readBody(final HttpServletResponse response) {
        return new String(((ContentCachingResponseWrapper) response).getContentAsByteArray());
    }

}
