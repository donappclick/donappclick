function abrirModal(producto) {
    console.log("Producto abierto en modal:", producto);
    
    const modal = document.getElementById('productoModal');
    document.getElementById('modalImagen').src = producto.imagen;
    document.getElementById('modalTitulo').innerText = producto.titulo;
    document.getElementById('modalDescripcion').innerText = producto.descripcion;
    document.getElementById('modalPrecio').innerText = producto.precio;
    document.getElementById('agregarCarrito').setAttribute('data-id', producto.id);
    modal.style.display = "block";
}

function cerrarModal() {
    const modal = document.getElementById('productoModal');
    modal.style.display = "none";
}
