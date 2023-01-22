package ca.redpocketbackend.api.dto.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RedPocketCreateRequest {

    private String title;
    private String method;
    private String type;
    private double poolTotal;
    private int participants;
}
