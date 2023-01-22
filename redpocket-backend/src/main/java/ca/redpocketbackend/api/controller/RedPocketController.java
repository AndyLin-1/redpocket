package ca.redpocketbackend.api.controller;

import ca.redpocketbackend.api.dto.requests.RedPocketCreateRequest;
import ca.redpocketbackend.api.service.RedPocketService;
import ca.redpocketbackend.model.RedPocket;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

@RestController
@RequestMapping("api/v1/")
public class RedPocketController {

    private final RedPocketService redPocketService;
    public RedPocketController(RedPocketService redPocketService){
        this.redPocketService = redPocketService;
    }

    @ResponseStatus(OK)
    @CrossOrigin
    @GetMapping("/redpocket/{id}/{code}")
    public RedPocket getRedPocket(@PathVariable String id, @PathVariable String code) {
        return this.redPocketService.getRedPocket(id, code);
    }

    @ResponseStatus(OK)
    @CrossOrigin
    @GetMapping("/redpocket/auth/{id}/{code}")
    public Boolean getAuth(@PathVariable String id, @PathVariable String code) {
        return this.redPocketService.getAuth(id, code);
    }

    @ResponseStatus(CREATED)
    @CrossOrigin
    @PostMapping("/redpocket")
    public RedPocket createRedPocket(@RequestBody RedPocketCreateRequest request) {
        return this.redPocketService.createRedPocket(request);
    }

    @ResponseStatus(CREATED)
    @CrossOrigin
    @PostMapping("/redpocket/open/{id}")
    public RedPocket openRedPocket(@PathVariable String id, @RequestBody String input) {
        return this.redPocketService.openRedPocket(id, input);
    }



}
