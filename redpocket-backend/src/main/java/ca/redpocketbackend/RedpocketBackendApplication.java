package ca.redpocketbackend;

import ca.redpocketbackend.model.RedPocket;
import ca.redpocketbackend.model.repo.RedPocketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RedpocketBackendApplication implements CommandLineRunner {

	@Autowired
	private RedPocketRepository redPocketRepository;

	public static void main(String[] args) {
		SpringApplication.run(RedpocketBackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

	}
}
