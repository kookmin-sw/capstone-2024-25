package capstone.allbom;

import com.ulisesbocchio.jasyptspringboot.annotation.EnableEncryptableProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
@EnableEncryptableProperties
//@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class AllbomApplication {
	public static void main(String[] args) {
		SpringApplication.run(AllbomApplication.class, args);
	}
}
