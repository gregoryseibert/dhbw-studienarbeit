package de.gregoryseibert.baeckereibackend;

import de.gregoryseibert.baeckereibackend.model.ApplicationUser;
import de.gregoryseibert.baeckereibackend.model.ApplicationUserRole;
import de.gregoryseibert.baeckereibackend.repository.UserRepository;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.TimeZone;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class BackendApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        setTimezone();

        SpringApplication.run(BackendApplication.class, args);
    }

    private static void setTimezone() {
        TimeZone.setDefault(TimeZone.getTimeZone("CET"));
    }

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());

        return modelMapper;
    }

    @Override
    public void run(String... params) {
        createSampleUsers();
    }

    private void createSampleUsers() {
        ApplicationUser admin = new ApplicationUser();
        admin.setUsername("administrator");
        admin.setPassword(passwordEncoder.encode("t93CD9GK"));
        admin.setName("Administrator");
        admin.setActive(true);
        admin.addRole(ApplicationUserRole.ROLE_ADMIN);
        admin.addRole(ApplicationUserRole.ROLE_USER);

        if (!userRepository.existsByUsername(admin.getUsername())) userRepository.save(admin);

        ApplicationUser user = new ApplicationUser();
        user.setUsername("benutzer");
        user.setPassword(passwordEncoder.encode("pwbenutzer"));
        user.setName("Benutzer");
        user.setActive(true);
        user.addRole(ApplicationUserRole.ROLE_USER);

        if (!userRepository.existsByUsername(user.getUsername())) userRepository.save(user);
    }
}