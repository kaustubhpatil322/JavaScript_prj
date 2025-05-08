public class NQueensCSP {
    static int N;

    // Arrays to mark the column and diagonals
    static boolean[] cols;
    static boolean[] diag1;
    static boolean[] diag2;
    
    static int[] board; // board[row] = column index of queen
    static int solutions = 0;

    static void solve(int row) {
        if (row == N) {
            solutions++;
            printBoard();
            return;
        }

        for (int col = 0; col < N; col++) {
            // Branch and Bound checks
            if (!cols[col] && !diag1[row - col + N - 1] && !diag2[row + col]) {
                board[row] = col;
                cols[col] = diag1[row - col + N - 1] = diag2[row + col] = true;

                solve(row + 1);  // backtrack

                // Undo choice
                cols[col] = diag1[row - col + N - 1] = diag2[row + col] = false;
            }
        }
    }

    static void printBoard() {
        System.out.println("Solution " + solutions + ":");
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (board[i] == j)
                    System.out.print("Q ");
                else
                    System.out.print(". ");
            }
            System.out.println();
        }
        System.out.println();
    }

    public static void main(String[] args) {
        N = 8; // change N for other sizes
        cols = new boolean[N];
        diag1 = new boolean[2 * N - 1];
        diag2 = new boolean[2 * N - 1];
        board = new int[N];

        solve(0);
        System.out.println("Total solutions: " + solutions);
    }
}
