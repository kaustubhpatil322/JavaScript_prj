import List from "./List.jsx";
import UserGreeting from "./UserGreeting"
import ListWithProps from "./ListWithProps.jsx";

function App() {
  const fruits = [{ id:1 ,name:"Apple" , calories:95},
                  {id:2 , name:"Banana" , calories: 45},
                   {id:3 , name:"Pineapple" , calories:37},
                   {id:4 , name:"Coconut" , calories:150},
                    {id:5 , name:"Guava" , calories:112}];

  const vegetables = [{ id:1 ,name:"Potatoes" , calories:170},
                  {id:2 , name:"Corn" , calories: 115},
                   {id:3 , name:"Onion" , calories:122},
                   {id:4 , name:"Tomato" , calories:160},
                    {id:5 , name:"Carrots" , calories:112}];

  return (
    <>
      {/* <List/> */}
     {/* <UserGreeting isLoggedIn={false} username="Kaustubh"/> */}
      {fruits.length>0 && <ListWithProps items={fruits} category="Fruits"/>}
      {vegetables.length>0 && <ListWithProps items={vegetables} category="Vegetables"/>}
      {/* Here if There are No elements in the List Not to Show the Header of The List  */}
    </>
  )
}

export default App
