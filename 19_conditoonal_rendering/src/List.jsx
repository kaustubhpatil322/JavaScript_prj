
function List(){
    const fruits = [{ id:1 ,name:"apple" , calories:95},
                  {id:2 , name:"banana" , calories: 45},
                   {id:3 , name:"pineapple" , calories:37},
                   {id:4 , name:"coconut" , calories:150},
                    {id:5 , name:"Guava" , calories:112}];
    // fruits.sort();
    // fruits.sort((a,b)=> a.name.localeCompare(b));  REVERSE ALPHA SORT
    // fruits.sort((a,b)=> a.calories - b.calories); NUMERIC SORT
    // fruits.sort((a,b) => b.calories - a.calories); REVERSE NUMERIC
        
    const lowCalFruits = fruits.filter(fruit => fruit.calories<100);
    lowCalFruits.sort((a,b)=> a.calories - b.calories);

    const highCalFruits = fruits.filter(fruit => fruit.calories>100);
    highCalFruits.sort((a,b) => b.calories - a.calories);
    

    const listItems = fruits.map(fruit => <li key={fruit.id}>
                                            {fruit.name}: &nbsp;
                                            <b>{fruit.calories}</b></li>);
    const lowCalItems = lowCalFruits.map(fruit => <li key={fruit.id}>
                                            {fruit.name}: &nbsp;
                                            <b>{fruit.calories}</b></li>);
    const highCalFruitItems = highCalFruits.map(fruit => <li key={fruit.id}>
                                                {fruit.name} &nbsp;
                                                <b>{fruit.calories} </b></li>)

    return (
        <div>
            <h2>Fruits List</h2>
            <ol>
            {listItems}
             </ol>
             <h2>Low Calories Fruits</h2>
            <ol>
                {lowCalItems}
            </ol>
            <h2>High Calories Fruits</h2>
            <ol>
                {highCalFruitItems}
            </ol>
        </div>
        
    )
}
export default List;