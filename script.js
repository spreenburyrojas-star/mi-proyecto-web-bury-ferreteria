let carrito = [];
const botones = document.querySelectorAll('.add-cart');
const listaCarrito = document.getElementById('lista-carrito');
const btnComprar = document.getElementById('comprar');
const carritoDiv = document.getElementById('carrito');
const buscador = document.getElementById('buscador');
const secciones = document.querySelectorAll('.seccion.productos');

// Crear ícono de carrito
const iconoCarrito = document.createElement('img');
iconoCarrito.src = "img/carrito.png"; // Pon un ícono de carrito en /img/carrito.png
carritoDiv.appendChild(iconoCarrito);

// Crear burbuja cantidad
const cantidadCarrito = document.createElement('div');
cantidadCarrito.classList.add('cantidad');
cantidadCarrito.textContent = carrito.length;
carritoDiv.appendChild(cantidadCarrito);

// Añadir productos al carrito
botones.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const producto = btn.parentElement.querySelector('h3').innerText;
        const precio = btn.parentElement.querySelector('p').innerText;
        carrito.push({ producto, precio });
        actualizarCarrito();
    });
});

// Actualizar carrito
function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.producto} - ${item.precio}`;
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'X';
        btnEliminar.addEventListener('click', (e) => {
            e.stopPropagation();
            carrito.splice(index, 1);
            actualizarCarrito();
        });
        li.appendChild(btnEliminar);
        listaCarrito.appendChild(li);
    });
    cantidadCarrito.textContent = carrito.length;
}

// Comprar por WhatsApp
btnComprar.addEventListener('click', (e) => {
    e.stopPropagation();
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    let mensaje = 'Hola, quiero comprar:\n';
    carrito.forEach(item => {
        mensaje += `${item.producto} - ${item.precio}\n`;
    });
    const urlWhatsapp = `https://wa.me/59175369812?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsapp, '_blank');
});

// Abrir/cerrar carrito
carritoDiv.addEventListener('click', (e) => {
    carritoDiv.classList.toggle('open');
});

// Buscador por sección activa
buscador.addEventListener('input', () => {
    // Detectar sección activa por scroll o click en menú
    let seccionActiva = null;
    secciones.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            seccionActiva = sec;
        }
    });
    if (seccionActiva) {
        const texto = buscador.value.toLowerCase();
        const productos = seccionActiva.querySelectorAll('.producto');
        productos.forEach(prod => {
            const nombre = prod.dataset.nombre.toLowerCase();
            prod.style.display = nombre.includes(texto) ? 'inline-block' : 'none';
        });
    }
});
