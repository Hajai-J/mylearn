import React from 'react'
import ItemsList from './ItemsList'

const Content = ({ items, handleCheck, handleDel }) => {
    return (
        <>
            {(items.length) ? (
                <ItemsList
                    items={items}
                    handleCheck={handleCheck}
                    handleDel={handleDel}
                />
            ) : (
                <p>Your List is Empty</p>
            )
            }
        </>

    )
}

export default Content