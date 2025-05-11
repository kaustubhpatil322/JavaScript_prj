
function ListWithProps(props){
    const itemList = props.items;
    const category = props.category;
    const listItems = itemList.map(item =><li key={item.id}>
                                        {item.name}: &nbsp;      
                                        <b>{item.calories}</b> </li>)

    return (
        <div>
            <h2 className="list-category">{category}</h2>
            <ol className="list-items">
            {listItems}
            </ol>
        </div>
    )
}

export default ListWithProps;