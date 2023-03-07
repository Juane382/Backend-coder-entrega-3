import fs from 'fs/promises'




export class productManager {
    constructor(path) {
        this.products
        this.path = path
    }


    async loadProducts() {
        const txtProductos = await fs.readFile(this.path, 'utf-8')
        if (txtProductos == '') {
            fs.writeFile(this.path, '[]')
        }
        this.products = JSON.parse(await fs.readFile(this.path, 'utf-8'))

    }

    async addProduct(product) {
        await this.loadProducts()
        let validaCode

        validaCode = this.products.find(prod => prod.code == product.code) ? 1 : 0


        if (!validaCode) {
            let flag = 0

            !product.title ? flag = 0 :
                !product.description ? flag = 0 :
                    !product.price ? flag = 0 :
                        !product.description ? flag = 0 :
                            !product.thumbnail ? flag = 0 :
                                !product.stock ? flag = 0 : flag = 1


            flag === 0 ? product.id :
                this.products.length === 0 ? product.id = 0 : product.id = ((this.products[this.products.length - 1].id) + 1) // id autoincremental segun el valor de id del ultimo elemento del array
            flag ? this.products.push(product) : console.log('pruducto incopleto') // si verifica se hace push a la lista de productos
            //console.log(this.products)
            //console.log(product)
            const json = JSON.stringify(this.products, null, 2)
            await fs.writeFile(this.path, json)
        }


        else { console.log('codigo repetido') }



    }

    async getProducts() {
        await this.loadProducts()
        return this.products
    }

    async getProductById(i) {
        await this.loadProducts()
        const result = this.products.find(({ id }) => id == i)
        return result == undefined ? 'Producto no encontrado' : result

    }

    async updateProduct(i, item, content) {
        let update
        if (item == 'id') { update = 'no se puede modificar id' }

        else {
            update = await this.getProductById(i)
            if (update == 'Producto no encontrado') {
                update = 'el producto no existe con el ID indicado'
            }
            else {
                update[item] = content
                for (const key in this.products) {
                    if (this.products[key].id == i) {
                        this.products[key] = update
                        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2))
                    }

                }
            }


        }
        return update

    }

    async deleteProduct(i) {
        await this.loadProducts()
        let deleteProduct = await this.getProductById(i)
        if (deleteProduct == 'Producto no encontrado') { deleteProduct = 'el producto no existe con el ID indicado' }
        else {
            for (const key in this.products) {
                if (this.products[key].id == i) {
                    this.products.splice(key, 1)
                    await fs.writeFile(this.path, JSON.stringify(this.products, null, 2))
                }

            }

        }
        return deleteProduct
    }

}


export class product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = undefined
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }


}





//lslet productList = new productManager('./static/productos.txt')
//const producto1 = new product('uno', 'decripcion producto uno', 30.0, 'imagen', '001', 20)
//const producto2 = new product('dos', 'decripcion producto uno', 30.0, 'imagen', '005', 20) //producto con codigo repetido
//const producto3 = new product('tres', 'decripcion producto uno', 30.0, 'imagen', '002', 20)
//const producto4 = new product('cuatro', 'decripcion producto uno', 30.0, 'imagen', '003', 20)
//const producto5 = new product('cinco', 'decripcion producto uno', 30.0, 'imagen', '004',40) // producto con falta de datos

//await productList.addProduct(producto1)
//await productList.addProduct(producto2)
//await productList.addProduct(producto3)
//await productList.addProduct(producto4)
//await productList.addProduct(producto5)

//console.log(await productList.getProducts()) // getProduct devuelve un arreglo con todos los productos
//console.log(await productList.getProductById(1)) //busca producto por ID

//console.log(await productList.updateProduct(4,'price','333')) // actualiza producto segun ID y campo del producto
//console.log(await productList.deleteProduct(2)) //  elimina producto segun el ID enviado