package de.gregoryseibert.baeckereibackend.controller;

import de.gregoryseibert.baeckereibackend.model.ApplicationUser;
import de.gregoryseibert.baeckereibackend.model.ApplicationUserCredentials;
import de.gregoryseibert.baeckereibackend.service.ApplicationUserService;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.Map;

/**
 * The UserController class implements rest endpoints to create, get and modify ApplicationUser objects as well as the endpoint to login.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private ApplicationUserService userService;

    /**
     * A rest endpoint to login.
     *
     * @param userCredentials The credentials with the username and password to login
     * @return The JWT string
     */
    @PostMapping("/login")
    public Map<String, String> loginUser(@ApiParam("AccountCredentials") @RequestBody ApplicationUserCredentials userCredentials) {
        String token = userService.login(userCredentials.getUsername(), userCredentials.getPassword());

        return Collections.singletonMap("token", token);
    }

    /**
     * A rest endpoint to get the account infos of the currently logged in user.
     *
     * @param request The submitted http request
     * @return The account infos as an ApplicationUser object
     */
    @GetMapping("/me")
    public ApplicationUser whoAmI(HttpServletRequest request) {
        return userService.whoAmI(request);
    }
}
