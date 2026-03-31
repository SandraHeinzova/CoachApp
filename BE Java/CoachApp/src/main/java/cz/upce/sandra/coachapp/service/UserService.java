package cz.upce.sandra.coachapp.service;

import cz.upce.sandra.coachapp.dto.UserDto;
import cz.upce.sandra.coachapp.dto.UserRegistrationDto;
import cz.upce.sandra.coachapp.entity.Player;
import cz.upce.sandra.coachapp.entity.TeamMember;
import cz.upce.sandra.coachapp.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final TeamMemberRepository teamMemberRepository;
    private final RoleRepository roleRepository;
    private final PlayerRepository playerRepository;
    private final CityRepository cityRepository;
    private final PositionRepository positionRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(TeamMemberRepository teamMemberRepository,
                       RoleRepository roleRepository,
                       PlayerRepository playerRepository,
                       CityRepository cityRepository,
                       PositionRepository positionRepository,
                       PasswordEncoder passwordEncoder) {
        this.teamMemberRepository = teamMemberRepository;
        this.roleRepository = roleRepository;
        this.playerRepository = playerRepository;
        this.cityRepository = cityRepository;
        this.positionRepository = positionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void registerUser(UserRegistrationDto regDto) {
        TeamMember newUser = new TeamMember();
        newUser.setFirstName(regDto.firstName());
        newUser.setLastName(regDto.lastName());
        newUser.setEmail(regDto.email());
        newUser.setPhoneNumber(regDto.phone());
        newUser.setDateOfBirth(regDto.birthDate());
        newUser.setUsername(regDto.email());

        String tempPassword = "Coach" + (int)(Math.random() * 1000);
        newUser.setPassword(passwordEncoder.encode(tempPassword));

        roleRepository.findById(regDto.roleId()).ifPresent(newUser::setRole);
        cityRepository.findById(regDto.cityId()).ifPresent(newUser::setCity);

        TeamMember savedMember = teamMemberRepository.save(newUser);

        roleRepository.findByName("PLAYER").ifPresent(playerRole -> {
            if (savedMember.getRole().equals(playerRole)) {

                Player newPlayer = new Player();
                newPlayer.setTeamMember(savedMember);
                newPlayer.setFacrId(regDto.facrId());
                newPlayer.setWeight(regDto.weight());
                newPlayer.setHeight(regDto.height());
                newPlayer.setFoot(regDto.foot());

                if (regDto.positionId() != null) {
                    positionRepository.findById(regDto.positionId())
                            .ifPresent(newPlayer::setPosition);
                }

                playerRepository.save(newPlayer);
            }
        });

        System.out.println("DEBUG: Registrace OK. Dočasné heslo pro " + regDto.email() + ": " + tempPassword);
    }

    public List<UserDto> getAllUsers() {
        return teamMemberRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private UserDto mapToDto(TeamMember member) {
        return new UserDto(
                member.getId(),
                member.getFirstName(),
                member.getLastName(),
                member.getEmail(),
                member.getRole() != null ? member.getRole().getName() : "N/A"
        );
    }

    public UserDto getUserByEmail(String email) {
        TeamMember member = teamMemberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Uživatel s tímto emailem neexistuje"));

        return new UserDto(
                member.getId(),
                member.getFirstName(),
                member.getLastName(),
                member.getEmail(),
                member.getRole().getName()
        );
    }
}