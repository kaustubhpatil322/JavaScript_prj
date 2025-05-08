import java.util.*;

class CB{

    public static void main(String[] args){

        System.out.println("Courses Helpdesk :-\n");

        System.out.println("Hey There, happy to solve your doubts😄");
        
        Scanner scanner = new Scanner(System.in);

        String input;
        while(true){
            System.out.print("You : ");
            input = scanner.nextLine();

            if(input.contains("exit") || input.contains("bye")){
                System.out.println("\n I hope that your doubts are cleared, Have a nice day😊");
                break; 
            }
            else if(input.contains("courses") && input.contains("what") || input.contains("programs")){
                System.out.println("We offer Courses such as:\n1.B.tec\n2.BBA\n3.BCom");

            }
            else if(input.contains("fees") || input.contains("money") || input.contains("price")){
                System.out.println("We have the prices as per given below:\n1.Btech : 100000Rs\n2. BBA : 20,000\n3. BCom : 30,000");
            }
            else{
                System.out.println("Sorry, Could you rephrase your Question.😅");
            }
        }
    
    
    }
}