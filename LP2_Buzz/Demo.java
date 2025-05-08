
import java.util.*;

public class Demo{
    
    static final int[] GOAL = { 1 ,2 ,3 , 4, 5, 6, 7, 8, 0};

    static final int[] DIRS = { -1 , 1 , -3 , 3};

    static class Node implements Comparable<Node>{

        int[] state;
        int g;
        int h;
        Node parent;

        Node( int[] state , int g , int h , Node parent){
            this.state = state;
            this.g = g;
            this.h = h;
            this.parent = parent;
        }

        int f(){
            return (g+h);
        }

        
        public int compareTo(Node other){
            return Integer.compare(this.f() , other.f() );
        }

        @Override
        public boolean equals(Object o){
            return Arrays.equals( this.state , ((Node) o).state);
        } 

        
    }
    // Ending of Class Node


        static int getHeuristic(int[] state){
            int dist=0;
            for(int i=0 ; i< state.length ; i++){
                int targetX = (state[i]-1)/3;
                int targetY = (state[i]-1) % 3;
                int currentX =  i / 3;
                int currentY = i % 3;

                dist += ( Math.abs( targetX - currentX) + Math.abs( targetY - currentY) );
            }

            return dist;
        }

            static int findZero(int[] state){
                for(int i=0 ; i< state.length ; i++){
                    if(state[i] == 0){
                        return i;
                    }
                }
                return -1;
            }

            static List<int[]> generateNextStates(int[] state){

                List<int[]> nextStates = new ArrayList<>();

                int zeroPos = findZero(state);

                for(int dir : DIRS){ 

                    if(zeroPos % 3 ==0 &&  dir == -1){
                        continue;
                    }
                    if(zeroPos % 3 == 2 && dir == 1 ){
                        continue;
                    }
                    int newPos = zeroPos + dir ;
                    if(newPos < 0 || newPos >= state.length){
                        continue;
                    }
                    
                    int[] newState = state.clone();
                    newState[zeroPos] = newState[newPos];
                    newState[newPos] = 0;

                    nextStates.add(newState);
                }
                return nextStates;
            }


            static List<int[]> solvePuzzle(int[] start){

                PriorityQueue<Node> openList = new PriorityQueue<>();
                Set<Node> closedList = new HashSet<>();

                Node startNode = new Node(start , 0 , getHeuristic(start) , null);

                openList.add(startNode);

                while(!openList.isEmpty()){
                    Node current = openList.poll();

                    if( Arrays.equals(current.state , GOAL)){
                
                        return reconstructPath(current);
                    }

                    closedList.add(current);

                    for(int[] next : generateNextStates(current.state)){
                            Node nextNode = new Node(next , current.g + 1 , getHeuristic(next) , current);
                            if(closedList.contains(nextNode)) continue;

                            openList.add(nextNode);
                    }
                }

                return null;
            }

            static List<int[]> reconstructPath( Node node){
                List<int[]> path = new ArrayList<>();
                while(node != null){
                    path.add(node.state);
                    node = node.parent;
                }
        

                Collections.reverse(path);
                return path;

            }


            public static void printPuzzle(int[] state){

                for(int i=0; i< state.length ; i++){
                    System.out.print(( state[i]==0 ? "_" : state[i]) + "  ");
                    if((i+1) % 3 == 0){
                        System.out.println();
                    }
                }
            }

    

     public static void main(String[] args){

            int[] startState = {
                1,2,3,
                5,6,0,
                7,8,4
            };

            System.out.println("StartState :");
            printPuzzle(startState);

            List<int[]> solution = solvePuzzle(startState);

            if(solution == null){
                System.out.println("No Solutions Found");
                return;
            }

            System.out.println("Steps to solve this Puzzle :");
            for(int[] step : solution){
                printPuzzle(step);
                System.out.println();
            }
        }
}