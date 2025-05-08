import java.util.*;

class Job{

    String id;
    int deadline;
    int profit;

    Job(String id , int deadline , int profit){
        this.id= id;
        this.deadline = deadline;
        this.profit = profit;
    }

}

class Demo{

    static int minValue(int x , int y){
            return (x < y ? x : y);
    }


    public static void main(String[] args){

        List<Job> jobs = new ArrayList<>();

        jobs.add(new Job("j1" , 2 , 10));
        jobs.add(new Job("j2" , 1 , 3));
        jobs.add(new Job("j3" , 3 , 140));
        jobs.add(new Job("j4" , 2 , 65));
        jobs.add(new Job("j5" , 1 , 20));

        int n = jobs.size();

        for(int i=0 ; i< n ; i++){
            for(int j=i+1 ; j<n ; j++){
                if(jobs.get(i).profit < jobs.get(j).profit){
                    Job temp = jobs.get(i);
                    jobs.set(i , jobs.get(j));
                    jobs.set(j , temp);
                }
            }
        }

        int dMax = 0 ;
        for(int i=0 ; i< n ; i++){
            if(dMax < jobs.get(i).deadline){
                dMax = jobs.get(i).deadline;
            }
        }

        //Create a timeslot array to keep track of free slots
        int[] timeslot = new int[dMax + 1];

        Arrays.fill(timeslot , -1);

        int filledTimeSlot = 0;
        int maxProfit =  0 ;

        
        for(int i=0 ; i<n ; i++){
            int k = minValue(dMax , jobs.get(i).deadline);
            while(k >= 1){
                if(timeslot[k] == -1){
                    timeslot[k] = i;
                    filledTimeSlot++;
                    break;
                }
                k--;
            }
            if(filledTimeSlot == dMax){
                break;
            }
        }

        //Display the selected Jobs : =
        System.out.println("\nRequired Jobs :");
        System.out.print("START -> ");
        for(int i=0; i<= dMax ; i++){
            if(timeslot[i] != -1){
                maxProfit += jobs.get(timeslot[i]).profit;
                System.out.print(jobs.get(timeslot[i]).id + " -> ");
            }
        }
        System.out.println("END");

        System.out.println("Maximum Profit : " + maxProfit);
    }
}