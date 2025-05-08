import java.util.*;

class Demo{

    static int[] GOAL = {1,2,3,4,5,6,7,8,0};
    static int[] DIRS = { -1 , 1 , -3 , 3};

    static class Node implements Comparable<Node>{
        int[] state;
        int g;
        int h;
        Node parent;
        Node(int[] state , int g , int h , Node parent){
            this.state = state;
            this.g = g;
            this.h = h;
            this.parent = parent;
        }

        int f(){
            return g+h;
        }

        public int compareTo(Node other){
            return Integer.compare(this.f() , other.f());
        }

        @Override
        public boolean equals(Object o){
            return (Arrays.equals( this.state , ((Node) o).state));
        }


    }

    static int getHeuristic(int[] state){
        int dist =0 ;
        for(int i=0; i< state.length ; i++){
            if( state[i] == 0) continue;
            int targetX = (state[i] - 1 ) /3 ;
            int targetY  = (state[i] - 1) % 3;
            int currentX = i /3;
            int currentY = i%3;
            dist += (Math.abs( targetX - currentX) + Math.abs(targetY - currentY));
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
        int zeroPos = findZero(state);
        List<int[]> nextStates = new ArrayList<>();
        for(int dir : DIRS){
            if(zeroPos %3 ==0 && dir == -1) continue;

            if(zeroPos % 3 == 2 && dir == 1) continue;

            int newPos = zeroPos + dir ;
            if(newPos < 0 || newPos >= state.length) continue;

            int[] newState = state.clone();
            newState[zeroPos] = newState[newPos];
            newState[newPos] = 0;
            nextStates.add(newState);
        }
        return nextStates;
    }

    static List<int[]> solvePuzzle(int[] state){
        PriorityQueue<Node> openList = new PriorityQueue<>();
        Set<Node> closeList = new HashSet<>();

        Node node = new Node( state , 0 , getHeuristic(state) , null);
        
        openList.add(node);

        while(!openList.isEmpty()){
            Node current = openList.poll();

            if(Arrays.equals( current.state , GOAL )){
                return reconstructPath(current);
            }

            closeList.add(current);

            for( int[] states : generateNextStates(current.state)){
                Node next = new Node(states , current.g + 1 , getHeuristic(states) , current);
                if(!closeList.contains(next)){
                    openList.add(next);
                }
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

    static void printPuzzle(int[] state){
        for(int i=0 ; i<state.length ; i++){
            System.out.print( (state[i]==0 ? "_" : state[i]) + "  ");
            if(i % 3 == 2){
                System.out.println();
            }
        }
    }
    public static void main(String[] args){
        int[] start = {1,0,3,
                        4,5,6,
                        7,8,2};

        
        List<int[]> solution = solvePuzzle(start);

        if(solution == null){
            System.out.println("Solutions not Found  for this Puzzle");
            return;
        }
        for(int i=0 ; i< solution.size() ; i++){
            printPuzzle(solution.get(i));
        }

        System.out.println("Total chances needed : "+ solution.size());
        
    }
}