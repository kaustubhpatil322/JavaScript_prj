
class Demo{
    static int N;
    static int[][] grid;
    static col,row;
    List<int[][]> solution = new ArrayList<>();


    public static void main(String[] args){
        N = 4;
        for(int i=0; i<N ;i++){
            grid[i] = new int[4];
            Arrays.fill(grid[i] , 0);
        }
        solveNQ(grid)
    }

    static boolean isSafe(int[][] grid , int col){
        for(int i=0 ; i<grid.length ; i++){
            if(grid[i][col] == 1){
                return false;
            }
           
        } 
        return true
    }

    static void  solveNQ(int[][] grid , int row, int col){
        
        if(!isSafe(grid , col)){
            return;
        }

        grid[row][col] = 1;

        solveNQ(grid , row , col+1)   


        
        
        
    }

}