package ca.redpocketbackend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Getter
@Setter
public class RedPocket {

    @Id
    private String id;

    private LocalDateTime createdAt = LocalDateTime.now();
    private String title;
    private String method;
    private String type;
    private String code;
    private double poolTotal;
    private String[] winners;
    private double[] amounts;




}
