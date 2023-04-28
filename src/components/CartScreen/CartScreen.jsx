import React from 'react'
import { Button } from 'react-bootstrap'
import {BsFillTrashFill} from 'react-icons/bs' 



const CartScreen = () => {
    return (
        <div className='container my-5'>
            <h3>Resumen de Compras</h3>
            <hr />
            <div className='listado'>
                <p>Producto</p>
                <p>$</p>
                <p>Cantidad:</p>
                <Button className="btb btn-danger">
                    <BsFillTrashFill/>
                </Button>
            </div>


        </div>
    )
}

export default CartScreen