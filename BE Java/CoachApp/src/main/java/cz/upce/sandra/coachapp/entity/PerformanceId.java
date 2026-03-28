package cz.upce.sandra.coachapp.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode

public class PerformanceId implements Serializable {

    private Long playerId;
    private Long performanceId ;
}
