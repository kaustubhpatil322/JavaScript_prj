
import java.util.*;

class demo{

    public static  List<Integer> visited = new ArrayList<>();
        public static List<List<Integer>> graph = new ArrayList<>();

    static void addEdge(List<List<Integer>> graph , int u , int v){
        graph.get(u).add(v);
        graph.get(v).add(u);
    } 

    static void printGraph(List<List<Integer>> graph) {
        for (int i = 0; i < graph.size(); i++) {
            System.out.print(i + " -> ");
            for (int neighbor : graph.get(i)) {
                System.out.print(neighbor + " ");
            }
            System.out.println();
        }
    }

    public static void main(String[] args){
        int vertices = 5;
        for(int i=0 ; i<vertices; i++){
            graph.add(new ArrayList<>());
        }

        addEdge(graph, 0, 1);
        addEdge(graph, 0, 4);
        addEdge(graph, 1, 2);
        addEdge(graph, 1, 3);
        addEdge(graph, 1, 4);
        addEdge(graph, 2, 3);
        addEdge(graph, 3, 4);



        printGraph1(graph);

        
        for(int i=0 ; i<vertices ; i++){
            visited.add(0);
        }

        DFS(3);

    }

    static void printGraph1(List<List<Integer>> graph){
        for(int i=0; i<graph.size() ; i++){
            System.out.print( i  + " -> ");
            for(int j : graph.get(i)){
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }

    static void DFS(int node){
            visited.set(node , 1);
            System.out.print( node  + " -> ");
    
        for(int neighbour : graph.get(node)){
            if(visited.get(neighbour) == 0){
                DFS(neighbour);
            }
        }

        return;
    }
}