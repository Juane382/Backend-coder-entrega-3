import express from 'express'
import { productManager } from './ProductManager.mjs'



let productList = new productManager('./src/static/productos.txt')

const app = express()


app.get('/ruta/products', (peticion, respuesta) => {
    JSON.stringify(productList.getProducts()
        .then(prom => respuesta.send(prom))
        .catch(
            error => {
                console.error( 'Error: ', error );
              }
        ))
})

app.get('/ruta/products/:pid', (peticion, respuesta) => {
    JSON.stringify(productList.getProductById(peticion.params.pid)
        .then(prom => respuesta.send(prom))
        .catch(error => {
            console.error( 'Error: ', error );
          }
        ))
})

const server = app.listen(8080)







/*app.get('/usuarios/:nroUsuario/propiedades',(peticion, respuesta) =>{
    console.log(peticion.params)
    console.log(peticion.query)
    respuesta.send(`<h1>aguate express</h1>
    ${JSON.stringify(peticion.params)}
    ${JSON.stringify(peticion.query)}
    `)
})*/
