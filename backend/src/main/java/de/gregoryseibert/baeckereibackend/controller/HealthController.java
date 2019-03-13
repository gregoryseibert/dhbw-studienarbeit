package de.gregoryseibert.baeckereibackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * The HealthController class implements a rest endpoint to check the uptime of the backend.
 *
 * @author Gregory Seibert
 * @version 1.0
 */

@RestController
@RequestMapping("/health")
public class HealthController {
    /**
     * A rest endpoint to check the uptime of the backend.
     *
     * @return A greeting
     */
    @GetMapping
    public String hello() {
        return "hello";
    }
}
