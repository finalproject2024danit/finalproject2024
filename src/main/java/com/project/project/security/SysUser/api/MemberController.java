package com.project.project.security.SysUser.api;

import com.project.project.security.SysUser.service.MemberService;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/login")
    public String userDetails() {
        return "login";
    }

    @GetMapping("/registration")
    public String userRegistrationPage() {
        return "registration";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }

    @PostMapping("/create")
    public String createNewUser(@RequestParam String username, @RequestParam String password) {
        memberService.createUser(username, password);
        return "redirect:/registration";
    }

}
