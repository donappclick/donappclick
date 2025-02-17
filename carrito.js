let carrito = [];

function agregarCarrito() {
    const idProducto = document.getElementById('agregarCarrito').getAttribute('data-id');
    const producto = productosFiltrados.find(p => p.id === idProducto);
    
    // Verificamos si el producto es encontrado
    console.log("Producto a agregar al carrito:", producto);
    
    if (producto) {
        carrito.push(producto);
    }
}

function mostrarCarrito() {
    if (carrito.length > 0) {
        alert('Carrito: ' + carrito.map(p => p.titulo).join(', '));
    } else {
        alert('El carrito está vacío');
    }
}

function imprimirCarrito() {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Carrito de Compras", 20, 20);
    carrito.forEach((producto, index) => {
        doc.text(`${index + 1}. ${producto.titulo} - ${producto.precio}`, 20, 30 + (index * 10));
    });

    doc.save("carrito.pdf");
}
