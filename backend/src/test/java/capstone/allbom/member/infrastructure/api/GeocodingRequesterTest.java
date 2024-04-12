package capstone.allbom.member.infrastructure.api;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class GeocodingRequesterTest {

    @Autowired private GeocodingRequester geocodingRequester;

    @Test
    public void 사용자의_주소를_위경도로_변환한다() {
        //given
        String address = "서울특별시 성북구 정릉동";

        //when
        geocodingRequester.convertAddress(address);
    }

}