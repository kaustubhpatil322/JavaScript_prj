import java.util.*;

class Demo{

   static List<List<Integer>> graph = new  ArrayList<>();
   static int[] visited;
   static int[] visited1;
   

    static void addEdge(List<List<Integer>> graph , int u , int v){
        graph.get(u).add(v);
        graph.get(v).add(u);
    }

    static void printGraph(List<List<Integer>> graph){
        for(int i = 0 ; i< graph.size() ; i++){
            System.out.print( i + " -> ");
            for(int j : graph.get(i)){
                System.out.print( j + " ");
            }
            System.out.println();
        }
    }

    static void DFS(int node){
        System.out.print(node + " -> ");
        visited[node] = 1;
        for(int n : graph.get(node)){
            if(visited[n] == 0){
                DFS(n);
            }
        }
    }

    static void BFS(int node){
        Queue<Integer> queue = new LinkedList<>();
        queue.add(node);
        visited1[node] = 1;
        while(!queue.isEmpty()){
           int curr = queue.poll();
           System.out.print( curr + " -> ");
           for(int n: graph.get(curr)){
            if(visited1[n] == 0){
                visited1[n] = 1 ; 
                 queue.add(n);
            }
           }
        }
    }
   public static void main(String[] args){
   int vertices = 5;
   for(int i=0 ;i< vertices ; i++){
        graph.add(new ArrayList<>());
   }

   visited = new int[vertices];
   Arrays.fill(visited , 0);

    visited1 = new int[vertices];
    Arrays.fill(visited1 , 0);
   addEdge(graph , 0 , 1);
   addEdge(graph , 0 , 2);
   addEdge(graph , 1 , 3);
   addEdge(graph , 1 , 2);
   addEdge(graph , 2 , 4);
   addEdge(graph , 3 , 4);
   addEdge(graph , 3 , 0);

    printGraph(graph);

    System.out.println("DFS :-");
    System.out.print("START -> ");
    DFS(0);
    System.out.println(" END");

    System.out.println("BFS : -");
    System.out.print("START -> ");
    BFS(0);
    System.out.println(" END");
   }
}