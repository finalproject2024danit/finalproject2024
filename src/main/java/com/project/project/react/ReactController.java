package com.project.project.react;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReactController {
    @GetMapping(value = {"/{path:[^\\.]*}", "/{path:^(?!api).*}/{subPath:[^\\.]*}"})
    public String redirect() {
        return "forward:/index.html";
    }
}
