import React from 'react'
import LineItem from './LineItem';

function ItemsList({ items, handleCheck, handleDel }) {
    return (
        <ul>
            {items.map((item) => (
                <LineItem
                    item={item}
                    key={item.id}
                    handleCheck={handleCheck}
                    handleDel={handleDel}
                />
            ))}
        </ul>
    )
}
 
export default ItemsList