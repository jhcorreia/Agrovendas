let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

            /**Editar nome, preco, etc */
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="Kilograma">1 kg</p>
                <p class="producto-precio">${producto.precio} Akz</p>
                <button class="producto-agregar" id="${producto.id}">Comprar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


//***Mexer as paginas */
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

       

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Produto  Comprado",
        duration: 1500,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #0fa127, #0e691d)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}


///////////////////////////////////////////////////////////////////////
// Formulario elements
const email = document.getElementById('mail');
const pass = document.getElementById('pass');
const passConfirmation = document.getElementById('pass-confirmation');
// Error elements
const errorEmail = document.querySelector('.error-mail');
const errorPass = document.querySelector('.error-pass');
const errorPassConf = document.querySelector('.error-pass-confirmation');
// inputs
const inputs = Array.from(document.querySelectorAll('input'));

// Avoid sumbit the form in any case
document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
})
// Correct email validation
function validateMyEmail() {
  if (email.validity.typeMismatch) {
    email.classList.remove('valid');
    email.classList.add('invalid');
    errorEmail.innerHTML = 'Not valid format for email';
  } else {
    email.classList.remove('invalid');
    email.classList.add('valid');
    errorEmail.innerHTML = '';
  }
}
// Validate fields that are required
function checkRequired(e) {
  const input = document.getElementById(e.target.id);
  const errorInput = document.querySelector(`.error-${e.target.id}`);
  if (input.validity.valueMissing) {
    input.classList.remove('valid');
    input.classList.add('invalid');
    errorInput.innerHTML = 'Preencha este campo, por favor';
  } else {
    input.classList.remove('invalid');
    input.classList.add('valid');
    errorInput.innerHTML = '';
  }
}
// validate password length
function validatePassLength(e) {
  if (e.target.value.length < 8) {
    e.target.classList.add('invalid-pass');
    e.target.classList.remove('valid');
    e.target.classList.remove('invalid');
    console.log(e.target.classList);
    errorPass.innerHTML = 'A senha deve ter no mínimo <strong>8</strong> caracteres.'
  } else {
    e.target.classList.remove('invalid-pass');
    e.target.classList.add('valid');
    console.log(e.target.classList);
  }
}
// validate pass and pass-confirmation match
function validatePasswordsMatch() {
  console.log("confirmation: ", passConfirmation.value);
  console.log("original: ", pass.value);
  if (pass.value !== passConfirmation.value) {
    passConfirmation.classList.add('invalid-pass');
    passConfirmation.classList.remove('valid');
    errorPassConf.innerHTML = 'A senha não corresponde';
  } else {
    passConfirmation.classList.remove('invalid-pass');
    passConfirmation.classList.add('valid');
    errorPassConf.innerHTML = '';
  }
}

// General checks
inputs.forEach(input => {
  document.getElementById(input.id).addEventListener('invalid', checkRequired);
  document.getElementById(input.id).addEventListener('input', checkRequired);
});
// email
email.addEventListener('input', validateMyEmail);
// pass
pass.addEventListener('input', validatePassLength);
// pass confirmation
passConfirmation.addEventListener('input',validatePasswordsMatch);