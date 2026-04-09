package cz.upce.sandra.coachapp.service;

import cz.upce.sandra.coachapp.dto.UserDto;
import cz.upce.sandra.coachapp.dto.UserRegistrationDto;
import cz.upce.sandra.coachapp.dto.UserUpdateDto;
import cz.upce.sandra.coachapp.entity.*;
import cz.upce.sandra.coachapp.repository.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
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

    private String generateRandomPassword(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        java.util.Random random = new java.util.Random();

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(chars.length());
            sb.append(chars.charAt(index));
        }
        return sb.toString();
    }

    @Transactional
    public String registerUser(UserRegistrationDto regDto) {
        String username = regDto.firstName() + "." + regDto.lastName().toLowerCase();

        if (teamMemberRepository.findByEmail(regDto.email()).isPresent()) {
            throw new RuntimeException("Uživatel s tímto emailem již existuje!");
        }

        if (teamMemberRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Uživatel s touto přezdívkou již existuje!");
        }

        if (playerRepository.findByFacrId(regDto.facrId()).isPresent()) {
            throw new RuntimeException("Uživatel s tímto FAČR číslem již existuje!");
        }

        Role role = roleRepository.findById(regDto.roleId())
                .orElseThrow(() -> new RuntimeException("Role s ID " + regDto.roleId() + " neexistuje!"));
        City city;
        if (regDto.cityName() != null && !regDto.cityName().trim().isEmpty()) {
            String newCityName = regDto.cityName().trim();
            Optional<City> existingCity = cityRepository.findByNameIgnoreCase(newCityName);
            if (existingCity.isPresent()) {
                city = existingCity.get();
            } else {
                City newCity = new City();
                newCity.setName(newCityName);
                city =  cityRepository.save(newCity);
            }
        } else {
            city = cityRepository.findById(regDto.cityId())
                    .orElseThrow(() -> new RuntimeException("Město s ID " + regDto.cityId() + " neexistuje!"));
        }

        String password = generateRandomPassword(10);

        if (role.isNamed("Hráč")) {
            Player p = new Player();
            fillCommonData(p, regDto, role, city, password, username);
            p.setFacrId(regDto.facrId());
            p.setWeight(regDto.weight());
            p.setHeight(regDto.height());
            p.setFoot(regDto.foot());
            positionRepository.findById(regDto.positionId()).ifPresent(p::setPosition);
            playerRepository.save(p);
        } else {
            TeamMember m = new TeamMember();
            fillCommonData(m, regDto, role, city, password, username);
            teamMemberRepository.save(m);
        }
        return password;
    }

    private void fillCommonData(TeamMember member, UserRegistrationDto dto, Role role, City city,
                                String password, String username) {
        member.setFirstName(dto.firstName());
        member.setLastName(dto.lastName());
        member.setEmail(dto.email());
        member.setPhoneNumber(dto.phone());
        member.setDateOfBirth(dto.birthDate());
        member.setRole(role);
        member.setCity(city);
        member.setUsername(username);
        member.setPassword(passwordEncoder.encode(password));
    }

    public List<UserDto> getAllUsers() {
        return teamMemberRepository.findAllByIsActive("Yes").stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    public List<Position> getAllPositions() {
        return positionRepository.findAll();
    }

    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    private UserDto mapToDto(TeamMember member) {
        String facrId = null;
        Integer weight = null;
        Integer height = null;
        String foot = null;
        String positionName = null;

        if (member instanceof Player player) {
            facrId = player.getFacrId();
            weight = player.getWeight();
            height = player.getHeight();
            foot = player.getFoot();
            positionName = player.getPosition() != null ? player.getPosition().getName() : "N/A";
        }
        return new UserDto(
                member.getId(),
                member.getFirstName(),
                member.getLastName(),
                member.getCity() != null ? member.getCity().getName(): "N/A",
                member.getEmail(),
                member.getRole() != null ? member.getRole().getName() : "N/A",
                member.getPhoneNumber(),
                facrId, weight, height, foot, positionName,
                member.getDateOfBirth()
        );
    }

    public UserDto getUserByEmail(String email) {
        TeamMember member = teamMemberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Uživatel s tímto emailem neexistuje"));
        return mapToDto(member);
    }

    public UserDto authenticate(String email, String rawPassword) {
        TeamMember member = teamMemberRepository.findByEmail(email.trim())
                .orElseThrow(() -> new RuntimeException("Uživatel nenalezen"));

        if (!passwordEncoder.matches(rawPassword, member.getPassword())) {
            throw new RuntimeException("Špatné přihlašovací údaje");
        }

        return mapToDto(member);
    }

    @Transactional
    public void deactivateUser(Long id) {
        TeamMember member = teamMemberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Uživatel s ID " + id + " nebyl nalezen."));

        member.setIsActive("No");
        teamMemberRepository.save(member);
    }

    @Transactional
    public void updateUser(Long id, UserUpdateDto dto) {
        TeamMember member = teamMemberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Uživatel nenalezen"));

        member.setEmail(dto.email());
        member.setPhoneNumber(dto.phone());

        if (dto.cityName() != null && !dto.cityName().trim().isEmpty()) {
            String name = dto.cityName().trim();
            City city = cityRepository.findByNameIgnoreCase(name)
                    .orElseGet(() -> {
                        City newCity = new City();
                        newCity.setName(name);
                        return cityRepository.save(newCity);
                    });
            member.setCity(city);
        }

        teamMemberRepository.save(member);
    }
}