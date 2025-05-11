import java.util.*;

class Demo
{
    static int bestScore(int[] ages , int[] scores){
        int n = ages.length;
        int maxScore = 0;
        int[][] player =new int[n][2];
        for(int i=0 ; i< n ; i++){
            player[i][0] = ages[i];
            player[i][1] = scores[i];
        }

        Arrays.sort(player , (a,b) -> a[0]==b[0] ? a[1]-b[1] : a[0]-b[0]);

        int[] dp = new int[n];
        for(int i=0 ; i<n;i++){
            dp[i] = player[i][1];
            for(int j=0 ; j<i ; j++){
                if(player[i][1] >= player[j][1]){
                    dp[i]  = Math.max( dp[i] , dp[j] + player[i][1]);
                }
            }
            maxScore = Math.max(dp[i] , maxScore);
        }
        return maxScore;
    }
    static void printDp(int[] dp){
        for(int i=0; i< dp.length ; i++){
            System.out.println(dp[i]);
        }
    }
    public static void main(String[] args){
        
        int[] scores={4,5,3,6};
        int[] ages={16,18,16,17};

        System.out.println("Score = "+bestScore(ages , scores));
    }
}