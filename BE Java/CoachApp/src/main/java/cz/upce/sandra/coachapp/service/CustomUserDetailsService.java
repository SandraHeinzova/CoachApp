package cz.upce.sandra.coachapp.service;


import cz.upce.sandra.coachapp.entity.TeamMember;
import cz.upce.sandra.coachapp.repository.TeamMemberRepository;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService  implements UserDetailsService {

    private final TeamMemberRepository repository;

    public CustomUserDetailsService(TeamMemberRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        TeamMember member = repository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Uživatel s emailem " + email + " nebyl nalezen."));

        return User.builder()
                .username(member.getEmail())
                .password(member.getPassword()) // Tady je to zašifrované heslo z DB
                .roles(member.getRole().getName()) // Tady je jeho role (PLAYER, COACH...)
                .build();
    }
}
