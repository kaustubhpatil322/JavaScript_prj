import java.util.*;

class Demo{

    static class Job{
        String id;
        int deadline;
        int profit;
        Job( String id, int deadline , int profit){
            this.id = id ;
            this.deadline = deadline;
            this.profit = profit;
        }

    }

    public static void main(String[] args){
        
        Job[] jobs = { 
            new Job("j1" , 2  , 44 ),
            new Job("j2" , 3 , 131 ),
            new Job("j3" , 1  , 32 ),
            new Job("j4" , 4  , 46 ),
            new Job("j5" , 1  , 34 ),
            new Job("j6" , 3  , 54 )
        };

        int n = jobs.length;

        for(int i=0 ; i< n ; i++){
            for(int j= i+1 ; j < n ; j++){
                if( jobs[i].profit < jobs[j].profit){
                    swap(jobs[i] , jobs[j]);
                }
            }
        }

        int dMax = 0;
        for(int i=0;i<n;i++){
            if( dMax < jobs[i].deadline){
                dMax = jobs[i].deadline;
            }
        }

        int[] timeslot = new int[dMax+1];
        Arrays.fill(timeslot , -1); //  for setting the slot as idle
        int fillTimeSlot = 0;
        int maxProfit = 0 ; 

        for(int i=0 ; i< dMax ; i++){
            int k = minValue(dMax , jobs[i].deadline);
            while( k>= 1){
                if(timeslot[k] == -1){
                    timeslot[k] = i;
                    fillTimeSlot++;
                    break;
                }
                k--;
            }
            if(fillTimeSlot == dMax){
                break;
            }
        }

        System.out.println("Selected Jobs are : =");
        for(int i=0 ; i< dMax ; i++){
            if(timeslot[i] != -1){
                System.out.print(jobs[timeslot[i]].id + " -> ");
                maxProfit += jobs[timeslot[i]].profit;
            }
        }

        System.out.println("\n" + maxProfit);

    }

    static int  minValue(int x , int y){
        return (x<y)? x : y;
    }

    static void swap(Job a , Job b){
        Job temp = a ;
        a = b;
        b = temp;
    }
}