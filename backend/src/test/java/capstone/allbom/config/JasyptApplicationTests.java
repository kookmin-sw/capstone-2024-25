package capstone.allbom.config;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class JasyptApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    void jasypt() {
        StandardPBEStringEncryptor pbeEnc = new StandardPBEStringEncryptor();
        pbeEnc.setAlgorithm("PBEWithMD5AndDES");
        pbeEnc.setPassword("toma");

        String value = "test";

        System.out.println("기존  value :: " + value + " | 변경 value :: " + pbeEnc.encrypt(value));
    }

    public String jasyptEncoding(String value) {

        String key = "tomas";
        StandardPBEStringEncryptor pbeEnc = new StandardPBEStringEncryptor();
        pbeEnc.setAlgorithm("PBEWithMD5AndDES");
        pbeEnc.setPassword(key);

        String encryptedText = pbeEnc.encrypt(value);
        String decryptedText = pbeEnc.decrypt(encryptedText);

        System.out.println("encryptedText = " + encryptedText +"!!!");
        System.out.println("decryptedText = " + decryptedText+"!!!");
        return pbeEnc.encrypt(value);
    }

}
