package de.gregoryseibert.baeckereibackend.service;

import de.gregoryseibert.baeckereibackend.model.ApplicationUser;
import de.gregoryseibert.baeckereibackend.model.exception.NotFoundException;
import de.gregoryseibert.baeckereibackend.model.exception.UnauthorizedException;
import de.gregoryseibert.baeckereibackend.model.exception.UnprocessableException;
import de.gregoryseibert.baeckereibackend.repository.UserRepository;
import de.gregoryseibert.baeckereibackend.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

/**
 * This class represents a user service for signing in, signing up and searching a user as well as getting the info for the current user.
 *
 * @author Gregory Seibert
 * @version 1.0
 */
@Service
public class ApplicationUserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Value("${auth.minpasswordlength}")
    private int minPasswordLength;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ApplicationUser getUserByUsername(String username) {
        ApplicationUser user = userRepository.findByUsername(username);

        if (user == null) {
            throw new NotFoundException(String.format("The user with the username '%s' doesn't exist.", username));
        }

        if (user.isArchived()) {
            throw new NotFoundException(String.format("The user with the username '%s' is archived.", username));
        }

        return user;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ApplicationUser getUserById(long id) {
        ApplicationUser user = userRepository.findById(id);

        if (user == null) {
            throw new NotFoundException(String.format("The user with the id '%d' doesn't exist.", id));
        }

        if (user.isArchived()) {
            throw new NotFoundException(String.format("The user with the id '%d' is archived.", id));
        }

        return user;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<ApplicationUser> getAllUsers() {
        return userRepository.findAll().stream().filter(user -> !user.isArchived()).collect(Collectors.toList());
    }

    public String login(String username, String password) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

            ApplicationUser user = getUserByUsername(username);

            return jwtTokenProvider.createToken(username, user.getRoles());
        } catch (AuthenticationException e) {
            throw new UnauthorizedException("Invalid username or password supplied.");
        }
    }

    public ApplicationUser whoAmI(HttpServletRequest request) {
        return getUserByUsername(jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(request)));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ApplicationUser createUser(ApplicationUser applicationUser) {
        String username = applicationUser.getUsername();
        String password = applicationUser.getPassword();

        if (userRepository.existsByUsername(username)) {
            throw new UnprocessableException(String.format("The username '%s' is already used.", username));
        }

        if (!isValidUsername(username)) {
            throw new UnprocessableException(String.format("The username '%s' is not valid. Only letters and numbers are allowed.", username));
        }

        if (password.length() < minPasswordLength) {
            throw new UnprocessableException(String.format("Passwords should have a length of at least %d characters.", minPasswordLength));
        }

        applicationUser.setPassword(passwordEncoder.encode(password));

        ApplicationUser savedApplicationUser = userRepository.save(applicationUser);

        jwtTokenProvider.createToken(savedApplicationUser.getUsername(), savedApplicationUser.getRoles());

        return savedApplicationUser;
    }

    private boolean isValidUsername(String username) {
        return username.matches("[a-zA-Z0-9]*");
    }
}