import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';

function LineItem({item, handleCheck, handleDel}) {
    return (
        <li className='item' key={item.id}>
            <input
                type="checkbox"
                checked={item.check}
                onChange={() => handleCheck((item.id))}
            />
            <label onDoubleClick={() => handleCheck((item.id))}>{item.item}</label>
            <FaTrashAlt
                tabIndex="0"
                onClick={() => handleDel(item.id)}
                role='button'
                aria-label={`Delete ${item.item}`}
            />
        </li>
    )
}

export default LineItem