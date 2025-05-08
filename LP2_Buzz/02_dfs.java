
import java.util.*;


class Demo{

    public static List<List<Integer>> graph = new ArrayList<>();
    public static List<Integer> visited = new ArrayList<>(); 
    public static List<Integer> met = new ArrayList<>(); 

    public static void main(String[] args){

        int vertices = 5;

        for(int i =0 ; i< vertices ; i++ ){
            graph.add(new ArrayList<>());
        }

        addEdge(graph, 0, 2);
        addEdge(graph, 0, 3);
        addEdge(graph, 1, 3);
        addEdge(graph, 1, 4);
        addEdge(graph, 2, 4);

        printGraph(graph);

        for(int i=0 ; i<vertices ; i++){
            visited.add(0);
        }

        
        System.out.print("START->")  ;
        DFS(0);
        System.out.print("END\n");  
       

       for(int i=0 ; i<vertices ; i++){
            met.add(0);
       }

         System.out.print("START -> ")  ;
        BFS(0);
        System.out.print("END"); 
    }

    static void BFS(int start){
        Queue<Integer> queue = new LinkedList<>();

        met.set(start , 1);
        queue.add(start);

        while(!queue.isEmpty()){
            int curr = queue.poll();
           
            System.out.print(curr + " -> ");
            for(int neighbour : graph.get(curr)){
                if(met.get(neighbour) == 0){  
                    met.set(neighbour , 1);          
                    queue.add(neighbour);
                }
            }
            
        }

    }

    static void printGraph(List<List<Integer>> graph){
        for(int i=0 ; i< graph.size() ; i++){
            System.out.print( i + " -> ");
            for( int j : graph.get(i)){
                System.out.print( j + " ");
            }
            System.out.println();
        }
    }

    static void DFS( int node){
            visited.set(node , 1);
            System.out.print( node + " ->");
            for(int neighbour : graph.get(node)){
                if(visited.get(neighbour) == 0){
                    DFS(neighbour);
                }
            }

    }

    static void addEdge(List<List<Integer>> graph , int u , int v){
        graph.get(u).add(v);
        graph.get(v).add(u);
    }
}