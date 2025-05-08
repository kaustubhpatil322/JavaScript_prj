import java.util.*;

class Job{
    String id;
    int deadline;
    int profit;
    Job( String id, int deadline , int profit){
        this.id = id;
        this.deadline = deadline;
        this.profit = profit;
    }


}

class Demo{

    public static void main(String[] args){

        Job[] jobs= {
            new Job( "j1" , 3 , 42),
            new Job("j2", 1, 32 ),
            new Job("j3" , 2 , 54),
            new Job("j4" , 1, 17),
            new Job("j5" , 2 , 19)
        };

        int n = jobs.length;

        //Sorting
        for(int i=0 ; i<n ; i++){
            for(int j=i+1; j< n ; j++){
                if( jobs[i].profit < jobs[j].profit){
                    Job temp = jobs[i];
                    jobs[i] = jobs[j];
                    jobs[j] = temp;
                }
            }
        }

        //Find Max. Deadline
        int dMax = 0;
        for(int i=0 ; i<n ; i++){
            if(dMax < jobs[i].deadline){
                dMax = jobs[i].deadline;
            }
        }
        //Make timeslot array

        int[] timeslot = new int[dMax + 1];
        Arrays.fill(timeslot , -1);// -1 for idle state
        int maxProfit = 0;


        // Now fill the timeslot with Jobs giving max Profit
        int filledTimeSlot = 0;

        for(int i =0 ; i<= dMax ; i++){
            int k =  minValue(dMax , jobs[i].deadline);
            while( k >= 1){
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

        System.out.println(" Selected Jobs :-");
        System.out.print("START -> ");
        for(int i=0 ; i<=dMax ; i++){
           if(timeslot[i] != -1){
                maxProfit += jobs[timeslot[i]].profit;
                System.out.print( jobs[timeslot[i]].id + " -> ");
           }

        }
        System.out.println(" -> END");

        System.out.println("Profit : "  + maxProfit);
    }

    static int minValue(int x , int y){
        return (x < y) ? x : y; 
    }
}