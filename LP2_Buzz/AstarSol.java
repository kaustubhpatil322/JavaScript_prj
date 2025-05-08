import java.util.*;  // Import everything we need for data structures like PriorityQueue, HashSet, etc.

public class AStar8Puzzle {

    // The goal state we're trying to reach
    static final int[] GOAL = {1, 2, 3, 4, 5, 6, 7, 8, 0};

    // These numbers represent possible moves of the empty tile (0)
    // -1 = left, 1 = right, -3 = up, 3 = down (since the puzzle is 3x3)
    static final int[] DIRS = {-1, 1, -3, 3};

    // 🧱 Node represents a state of the puzzle at a certain time
    static class Node implements Comparable<Node> {
        int[] state;     // Current puzzle configuration (e.g., [1, 2, 3, 4, 5, 6, 7, 0, 8])
        int g;           // Cost to reach this node (number of steps taken so far)
        int h;           // Estimated cost from this node to goal (heuristic)
        Node parent;     // Link to previous state (used for reconstructing the solution path)

        // Constructor for Node
        Node(int[] state, int g, int h, Node parent) {
            this.state = state;
            this.g = g;
            this.h = h;
            this.parent = parent;
        }

        // Total cost function: f(n) = g(n) + h(n)
        int f() {
            return g + h;
        }

        // Allows PriorityQueue to sort nodes based on total cost
        public int compareTo(Node other) {
            return Integer.compare(this.f(), other.f());
        }

        // Equality check for HashSet/HashMap
        @Override
        public boolean equals(Object o) {
            return Arrays.equals(this.state, ((Node) o).state);
        }

        @Override
        public int hashCode() {
            return Arrays.hashCode(this.state);
        }
    }

    // 📏 Heuristic function: Manhattan distance
    // Measures how far each number is from where it should be
    static int getHeuristic(int[] state) {
        int dist = 0;
        for (int i = 0; i < state.length; i++) {
            if (state[i] == 0) continue; // Skip the empty tile
            int target = state[i] - 1; // Where the tile *should* be
            int currentRow = i / 3, currentCol = i % 3;
            int targetRow = target / 3, targetCol = target % 3;
            // Manhattan distance = vertical moves + horizontal moves
            dist += Math.abs(currentRow - targetRow) + Math.abs(currentCol - targetCol);
        }
        return dist;
    }

    // 🔍 Find the index of the empty space (0)
    static int findZero(int[] state) {
        for (int i = 0; i < state.length; i++) {
            if (state[i] == 0) return i;
        }
        return -1; // Should never happen
    }

    // 🎮 Generate all possible next moves from the current puzzle state
    static List<int[]> generateNextStates(int[] state) {
        List<int[]> nextStates = new ArrayList<>();
        int zeroPos = findZero(state); // Find the 0 (empty tile)

        for (int d : DIRS) {
            int newPos = zeroPos + d;

            // Check for invalid positions (off the board)
            if (newPos < 0 || newPos >= 9) continue;

            // Prevent wrapping from left to right or vice versa
            if (zeroPos % 3 == 0 && d == -1) continue; // Can't go left from left edge
            if (zeroPos % 3 == 2 && d == 1) continue;  // Can't go right from right edge

            // Copy the state to make a new one
            int[] newState = state.clone();

            // Swap the zero with the tile in the new position
            newState[zeroPos] = newState[newPos];
            newState[newPos] = 0;

            nextStates.add(newState); // Add new state to the list
        }

        return nextStates;
    }

    // 🧠 The main A* algorithm to solve the puzzle
    static List<int[]> solvePuzzle(int[] start) {
        PriorityQueue<Node> openList = new PriorityQueue<>(); // Priority queue sorted by f(n)
        Set<Node> closedList = new HashSet<>(); // Visited states

        // Create the starting node
        Node startNode = new Node(start, 0, getHeuristic(start), null);
        openList.add(startNode); // Add starting node to the queue

        // Loop until we find the solution or run out of options
        while (!openList.isEmpty()) {
            Node current = openList.poll(); // Get the node with lowest cost

            // Check if we reached the goal
            if (Arrays.equals(current.state, GOAL)) {
                return reconstructPath(current); // Success: build and return the path
            }

            closedList.add(current); // Mark as visited

            // Generate possible next states
            for (int[] next : generateNextStates(current.state)) {
                Node nextNode = new Node(next, current.g + 1, getHeuristic(next), current);

                // Skip if already visited
                if (closedList.contains(nextNode)) continue;

                openList.add(nextNode); // Add to queue
            }
        }

        return null; // No solution found
    }

    // 🔙 Build the solution path by going backwards using the parent pointers
    static List<int[]> reconstructPath(Node node) {
        List<int[]> path = new ArrayList<>();
        while (node != null) {
            path.add(node.state);
            node = node.parent;
        }
        Collections.reverse(path); // Reverse to get path from start to goal
        return path;
    }

    // 🖨️ Nicely print the 3x3 puzzle board
    static void printPuzzle(int[] state) {
        for (int i = 0; i < 9; i++) {
            System.out.print((state[i] == 0 ? "_" : state[i]) + " ");
            if ((i + 1) % 3 == 0) System.out.println(); // New line after each row
        }
    }

    // 🚀 Entry point of the program
    public static void main(String[] args) {
        // You can change this to any valid starting state
        int[] startState = {
            1, 2, 3,
            5, 6, 0,
            7, 8, 4
        };

        System.out.println("Starting Puzzle:");
        printPuzzle(startState);

        List<int[]> solution = solvePuzzle(startState); // Run the A* algorithm

        if (solution != null) {
            System.out.println("\nSteps to solve the puzzle:");
            for (int[] step : solution) {
                printPuzzle(step);
                System.out.println();
            }
        } else {
            System.out.println("No solution found.");
        }
    }
}
