let productos = [];
let productosFiltrados = [];
let productosPorPagina = 10;
let paginaActual = 1;

async function cargarProductos() {
    const url = "https://api.allorigins.win/raw?url=https://script.google.com/macros/s/AKfycbzlyIHe_OHMxQg48et57ZJU32ZzCw_y_hpRW3vC3CNQ6W51x0Vu9LXPXV4zvT8COPiFgA/exec";
    
    try {
        let respuesta = await fetch(url);
        productos = await respuesta.json();
        
        // Verificamos que los productos tengan el id
        productos.forEach((producto, index) => {
            if (!producto.id) {
                producto.id = `producto-${index + 1}`;  // Asignamos un id único si no existe
            }
        });
        
        productosFiltrados = productos;
        mostrarProductos();
        mostrarPaginacion();
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
}

function filtrarProductos() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    productosFiltrados = productos.filter(producto => producto.titulo.toLowerCase().includes(query));
    mostrarProductos();
    mostrarPaginacion();
}

function mostrarProductos() {
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = paginaActual * productosPorPagina;
    const productosAPresentar = productosFiltrados.slice(inicio, fin);
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '';

    productosAPresentar.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        
        // Verificamos que cada producto tenga un id
        console.log("Producto a mostrar:", producto);
        
        div.onclick = function() {
            abrirModal(producto);
        };

        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <h2>${producto.titulo}</h2>
            <p>${producto.descripcion}</p>
            <div class="precio">${producto.precio}</div>
        `;
        contenedor.appendChild(div);
    });
}

function mostrarPaginacion() {
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    const paginacion = document.getElementById('pagination');
    paginacion.innerHTML = '';

    for (let i = 1; i <= totalPaginas; i++) {
        const boton = document.createElement('button');
        boton.innerText = i;
        boton.onclick = function() {
            paginaActual = i;
            mostrarProductos();
        };
        paginacion.appendChild(boton);
    }
}

window.onload = cargarProductos;
