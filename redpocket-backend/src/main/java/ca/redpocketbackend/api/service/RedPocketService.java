package ca.redpocketbackend.api.service;

import ca.redpocketbackend.api.dto.requests.RedPocketCreateRequest;
import ca.redpocketbackend.exceptions.RedPocketException;
import ca.redpocketbackend.model.RedPocket;
import ca.redpocketbackend.model.repo.RedPocketRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.util.Arrays;
import java.util.Random;

@Service
public class RedPocketService {
    private final RedPocketRepository redPocketRepository;

    public RedPocketService(RedPocketRepository redPocketRepository){
        this.redPocketRepository = redPocketRepository;
    }

    //Get RedPocket Info
    public RedPocket getRedPocket(String id, String code){
        if(redPocketRepository.findById(id).isEmpty()){
            throw new RedPocketException("Red Pocket does not exist", HttpStatus.BAD_REQUEST);
        }
        RedPocket redpocket = redPocketRepository.findById(id).get();
        if(redpocket.getMethod().equalsIgnoreCase("email") && !code.equalsIgnoreCase(redpocket.getCode())){
            redpocket.setWinners(censorEmail(redpocket.getWinners()));
        }
        return redpocket;
    }

    //Get Auth Info
    public Boolean getAuth(String id, String code){
        if(redPocketRepository.findById(id).isEmpty()){
            throw new RedPocketException("Red Pocket does not exist", HttpStatus.BAD_REQUEST);
        }
        RedPocket redpocket = redPocketRepository.findById(id).get();
        return code.equalsIgnoreCase(redpocket.getCode());
    }


    //Create RedPocket
    public RedPocket createRedPocket(RedPocketCreateRequest request){
        RedPocket redPocket = new RedPocket();
        redPocket.setTitle(request.getTitle());
        redPocket.setMethod(request.getMethod());
        redPocket.setType(request.getType());
        redPocket.setAmounts(splitMoney(request.getParticipants(), request.getPoolTotal(), request.getType()));
        redPocket.setWinners(new String[0]);
        redPocket.setPoolTotal(request.getPoolTotal());
        redPocket.setCode(generateCode());
        return redPocketRepository.save(redPocket);
    }

    //Opens Red Pocket and returns the new Pocket Data
    public RedPocket openRedPocket(String id, String input){
        if(redPocketRepository.findById(id).isEmpty()){
            throw new RedPocketException("Red Pocket does not exist", HttpStatus.BAD_REQUEST);
        }
        RedPocket redpocket = redPocketRepository.findById(id).get();
        if(!duplicate(redpocket.getWinners(), input) && redpocket.getWinners().length < redpocket.getAmounts().length) {
            String[] newWinners = Arrays.copyOf(redpocket.getWinners(), redpocket.getWinners().length + 1);
            newWinners[redpocket.getWinners().length] = input;
            redpocket.setWinners(newWinners);
        }
        redpocket = redPocketRepository.save(redpocket);
        if(redpocket.getMethod().equalsIgnoreCase("email")){
            redpocket.setWinners(censorEmail(redpocket.getWinners()));
        }
        return redpocket;
    }

    //Helper Method to Detect Dupes in Winners Array ( NO same Email wins)
    private boolean duplicate(String [] array, String input){
        boolean flag = false;
        for(int i = 0; i < array.length; i++){
            if(array[i].equalsIgnoreCase(input)){
                flag = true;
                break;
            }
        }
        return flag;
    }

    //Helper Method to Censor Emails
    private String[] censorEmail(String email[]){
        for(int i = 0; i < email.length; i++){
            email[i] = email[i].replaceAll("(^[^@]{3}|(?!^)\\G)[^@]", "$1*");
        }
        return email;
    }

    //Helper Method to Generate Code
    private String generateCode(){
        int num = (int) (Math.random() * 999999);
        String code = String.format("%06d", num);
        return code;
    }

    private double[] splitMoney(int participants, double amount, String type){
        double[] split = new double[participants];
        DecimalFormat df = new DecimalFormat("0.00");

        if(type.equalsIgnoreCase("random")){
            //Partition amount into random pieces
            int [] n = randSum(participants, 1, (int) (amount * 100));
            for(int i = 0; i < split.length; i++){
                split[i] = Double.parseDouble(df.format((double) (n[i])/100));
            }
        }
        else{ //Evenly Split
            for(int i = 0; i < split.length; i++){
                split[i] = Double.parseDouble(df.format(amount/participants));
            }
        }
        return split;
    }

    //Helper Method to Split numbers
    private int[] randSum(int n, int min, int m) {
        Random rand = new Random();
        int[] nums = new int[n];
        int max = m - min*n;
        if(max <= 0)
            throw new IllegalArgumentException();
        for(int i=1; i<nums.length; i++) {
            nums[i] = rand.nextInt(max);
        }
        Arrays.sort(nums, 1, nums.length);
        for(int i=1; i<nums.length; i++) {
            nums[i-1] = nums[i]-nums[i-1]+min;
        }
        nums[nums.length-1] = max-nums[nums.length-1]+min;
        return nums;
    }
}
