package cz.upce.sandra.coachapp.service;

import cz.upce.sandra.coachapp.dto.UserDto;
import cz.upce.sandra.coachapp.entity.City;
import cz.upce.sandra.coachapp.entity.Role;
import cz.upce.sandra.coachapp.entity.TeamMember;
import cz.upce.sandra.coachapp.repository.TeamMemberRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private TeamMemberRepository repository; // Předstíráme databázi

    @InjectMocks
    private UserService userService; // Testujeme tuhle službu

    @Test
    void getAllUsers_ShouldReturnMappedDto() {
        // 1. PŘÍPRAVA (Given)
        Role adminRole = new Role();
        adminRole.setName("ADMIN");

        City testCity = new City();
        testCity.setName("Parubice");

        TeamMember member = new TeamMember();
        member.setId(1L);
        member.setFirstName("Sandra");
        member.setLastName("Studentka");
        member.setEmail("sandra@upce.cz");

        member.setRole(adminRole);
        member.setCity(testCity);

        // Řekneme "databázi", co má vrátit, až se jí zeptáme
        when(repository.findAll()).thenReturn(List.of(member));

        // 2. AKCE (When)
        List<UserDto> result = userService.getAllUsers();

// 3. KONTROLA (Then)
        assertEquals(1, result.size());
        assertEquals("Sandra", result.getFirst().getFirstName()); // Přidáno "get" a velké "F"
        assertEquals("ADMIN", result.getFirst().getRoleName());   // Přidáno "get" a velké "R"
        // Tady testujeme, že heslo v DTO není (v UserDto ani není políčko, takže to projde)
    }
}