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
//        String url = "admin_esssun";
//
//        System.out.println(jasyptEncoding(url));
        StandardPBEStringEncryptor pbeEnc = new StandardPBEStringEncryptor();
        pbeEnc.setAlgorithm("PBEWithMD5AndDES");
        pbeEnc.setPassword("toma");

        String url = "admin_esssun";
        String username = "toma";
        String password = "toma";

        System.out.println("기존  URL :: " + url + " | 변경 URL :: " + pbeEnc.encrypt(url));
        System.out.println("기존  username :: " + username + " | 변경 username :: " + pbeEnc.encrypt(username));
        System.out.println("기존  password :: " + password + " | 변경 password :: " + pbeEnc.encrypt(password));
    }

    public String jasyptEncoding(String value) {

        String key = "toma";
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
