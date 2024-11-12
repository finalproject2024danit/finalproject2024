package com.project.project.security.SysUser.service;



import com.project.project.security.SysUser.SysUser;
import com.project.project.security.SysUser.db.MemberRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class MemberService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<SysUser> sysUser = memberRepository.findByUserName(username);
        if (sysUser.isEmpty()) {
            throw new UsernameNotFoundException(username);
        }
        List<SimpleGrantedAuthority> authorities = sysUser.get().getSysRoles().stream()
                .map(r -> new SimpleGrantedAuthority(r.getRoleName()))
                .toList();
        return new User(sysUser.get().getUserName(), sysUser.get().getEncryptedPassword(), authorities);
    }

    public List<SysUser> findAll() {
        return memberRepository.findAll();
    }

    public boolean createUser(String username, String password) {
        Optional<SysUser> sysUser = memberRepository.findByUserName(username);
        if (sysUser.isPresent()) {
            throw new RuntimeException("User already exists.");
        }
        String encryptedPassword = passwordEncoder.encode(password);
        SysUser newUser = new SysUser();
        newUser.setUserName(username);
        newUser.setEncryptedPassword(encryptedPassword);
        newUser.setEnabled(true);
        memberRepository.save(newUser);
        return true;
    }

    public Optional<SysUser> getUserByLogin(String username) {
        return memberRepository.findByUserName(username);
    }
}
