import React, { useState, useContext } from 'react'
import { CartContext } from '../context/CartContex'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import firebase from 'firebase'
import 'firebase/firestore'
import { getFirestore } from '../../Firebase/Config'


const Checkout = () => {

    const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext)

    const [email, setEmail] = useState('')

    const [nombre, setNombre] = useState('')

    const [apellido, setApellido] = useState('')

    const [telefono, setTelefono] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("mail", email)
        console.log("apellido", apellido)
        console.log("nombre", nombre)
        console.log("telefono", telefono)
        const orden = {
            buyer: {
                email,
                nombre,
                apellido,
                telefono
            },
            item: carrito,
            total_price: precioTotal(),
            data: firebase.firestore.Timestamp.fromDate(new Date())
        }
        console.log(orden)

        const db = getFirestore()

        const ordenes = db.collection('ordenes')

        ordenes.add(orden)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Su compra fue realizada con éxito',
                    text: `Guarde su número de compra: ${res.id}`,
                    willClose: () =>{
                        vaciarCarrito()
                    }
                })
            .finally(()=>{
                console.log('Operación finalizada con éxito')
            })

            carrito.forEach((item) =>{
                const docRef = db.collection('productos').doc(item.id)
                docRef.get()
                    .then((doc) =>{
                        docRef.update({
                            stock: doc.data().stock -item.counter
                        })
                    })
            })

            })
    }




    return (
        <div>
            <h3>Terminar Compra</h3>
            <hr />

            <form onSubmit={handleSubmit} className='container mt-3'>

                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input type="text" className='form-control' onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>

                <div className='form-group'>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" className='form-control' onChange={(e) => setNombre(e.target.value)} value={nombre} />
                </div>

                <div className='form-group'>
                    <label htmlFor="apellido">Apellido</label>
                    <input type="text" className='form-control' onChange={(e) => setApellido(e.target.value)} value={apellido} />
                </div>

                <div className='form-group'>
                    <label htmlFor="telefono">Telefono</label>
                    <input type="text" className='form-control' onChange={(e) => setTelefono(e.target.value)} value={telefono} />
                </div>
                <button type='submit' className='btn btn-success'>Finalizar</button>
                <Link to='/cart' className='btn btn-info m-2'>Volver al Carrito</Link>
            </form>
        </div>
    )
}

export default Checkout
