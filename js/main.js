/////////////////////////////////////////////////////
// Aplicación de e-commerce de libros de computación
/////////////////////////////////////////////////////


// Variables globales
let resultados = []
let libros_agregados = []
let precios_agregados = []
let cantidades_agregadas = []
let cant_libros = 0
let cantidades_mostradas = []

// Detecta datos previamente guardados en el storage y actualiza el carrito (cantidad y costo total)
// sino, es porque se entra por primera vez y entonces muestra todos los libros
let cant=localStorage.getItem('cant_libros')
if (parseInt(cant)>0) {
    cant_libros=cant
    let libros_agre=localStorage.getItem('libros_agregados')
    libros_agregados = Array.from(libros_agre.split(","));
    let precios_agre=localStorage.getItem('precios_agregados')
    precios_agregados= Array.from(precios_agre.split(","));
    let cantidades_agre=localStorage.getItem('cantidades_agregadas')
    cantidades_agregadas= Array.from(cantidades_agre.split(","));
    update_carrito()
} else {
   fetch("./db/data.JSON").
   then(response => response.json()).
   then(data => mostrar_libros(data))
}

// Comienzo
let boton_buscar=document.getElementById("boton_buscar")

boton_buscar.onclick = () => {
    texto=document.getElementById("lenguaje").value
    let salida=document.getElementById("resultado")
    switch (texto.toLowerCase()) {
        case "python":
            fetch("./db/data.JSON").
            then(response => response.json()).
            then(data => data.filter(e => e.lenguaje == "python")).
            then(data2 => {
                salida.innerHTML="Mostrando "+ data2.length +" resultados de Python";
                mostrar_libros(data2);
            })
            break
        case "javascript":
            fetch("./db/data.JSON").
            then(response => response.json()).
            then(data => data.filter(e => e.lenguaje == "javascript")).
            then(data2 => {
                salida.innerHTML="Mostrando "+ data2.length +" resultados de Javascript";
                mostrar_libros(data2);
            })
            break
        case "sql":
            fetch("./db/data.JSON").
            then(response => response.json()).
            then(data => data.filter(e => e.lenguaje == "sql")).
            then(data2 => {
                salida.innerHTML="Mostrando "+ data2.length +" resultados de SQL";
                mostrar_libros(data2);
            })
            break
        case "c++":
            fetch("./db/data.JSON").
            then(response => response.json()).
            then(data => data.filter(e => e.lenguaje == "c++")).
            then(data2 => {
                salida.innerHTML="Mostrando "+ data2.length +" resultados de C++";
                mostrar_libros(data2);
            })
            break
        case "c#":
            fetch("./db/data.JSON").
            then(response => response.json()).
            then(data => data.filter(e => e.lenguaje == "c#")).
            then(data2 => {
                salida.innerHTML="Mostrando "+ data2.length +" resultados de C#";
                mostrar_libros(data2);
            })
            break
        default:
            salida.innerHTML="No encontrado. Ingrese nuevamente"
    }
}

function mostrar_libros(libros) {
    let etiqueta = document.getElementById("resultado")
    let precios=[]
    cantidades_mostradas.length=0

    for (let libro of libros) {

        const elemento = document.createElement("div");
        elemento.className = "product_container";
        texto1 = libro.titulo
        texto2 = libro.autor
        texto3 = libro.anio
        texto4 = libro.precio
        texto5 = libro.imagen
        texto6 = libro.id    // id del boton para agregar y ademas id del libro en la base
        texto7 = "b1_"+texto6
        texto8 = "b2_"+texto6
        texto9 = 100+texto6  // id del span que muestra las cantidades a agregar
        precios.push(parseInt(texto4))

        cantidades_mostradas.push(0)

        elemento.innerHTML=`<div class="item"><img src=${texto5} /></div>
                        <div class="item">
                        <b>Título:</b> ${texto1}<br>
                        <b>Autor:</b> ${texto2}<br>
                        <b>Año:</b> ${texto3}<br>
                        <b>Precio:</b> ${texto4}<br>
                        <button class="item2 b_cantidad_resta" type="button" id="${texto7}">-</button><span id="${texto9}" class="cspan">0</span><button class="item2 b_cantidad_suma" type="button" id="${texto8}">+</button><br>
                        <button class="item2 b_agrega" type="button" id="${texto6}">Agregar al carrito</button>
                        </div>`
        
        etiqueta.appendChild(elemento)
    }
    genera_eventos_botones(precios)
}

function genera_eventos_botones(prec) {
    spans=document.getElementsByClassName("cspan")
    bcs=document.getElementsByClassName("b_cantidad_suma")
    bcr=document.getElementsByClassName("b_cantidad_resta")
    for(let i=0;i<bcs.length;i++) {
        sp=spans[i].id
        bcs[i].setAttribute("onclick", `suma_unidad(${sp},${i})`)
        bcr[i].setAttribute("onclick", `resta_unidad(${sp},${i})`)
    }
    bagrega=document.getElementsByClassName("b_agrega")
    for(let j=0;j<bagrega.length;j++) {
        bid=bagrega[j].id
        sp=spans[j].id
        pre=parseInt(prec[j])
        bagrega[j].setAttribute("onclick",`agrega(${bid},${sp},${pre},${j})`)
    }
}

// Boton - onclick="resta_unidad(${texto9})"
// Boton + onclick="suma_unidad(${texto9})"
// onclick="agrega(${texto6},${texto9})"

function suma_unidad(idspan,id) {
    let aux=document.getElementById(idspan)
    let q=parseInt(cantidades_mostradas[id])+1
    cantidades_mostradas[id]=q
    aux.innerHTML=q
}

function resta_unidad(idspan,id) {
    let aux=document.getElementById(idspan)
    let q=parseInt(cantidades_mostradas[id])-1
    if (q<0) {
        q=0
    }
    cantidades_mostradas[id]=q
    aux.innerHTML=q
}


function agrega(id_agregado,idspan,pr,id) {

    if (cantidades_mostradas[id] != 0) {
        // Detecta si el libro ya está agregado y en ese caso solo aumenta la cantidad
        let i = libros_agregados.indexOf(id_agregado.toString())
        if (i == -1) {
            cant_libros++;
            libros_agregados.push(id_agregado.toString())
            precios_agregados.push(parseInt(pr))
            let aux=document.getElementById(idspan)
            let q=parseInt(cantidades_mostradas[id])
            cantidades_mostradas[id]=0
            cantidades_agregadas.push(q)
            aux.innerHTML="0"
        } else {
            let aux=document.getElementById(idspan)
            let q=parseInt(cantidades_mostradas[id])
            aux.innerHTML="0"
            cantidades_mostradas[id]=0
            cantidades_agregadas[i]=parseInt(cantidades_agregadas[i])+q
        }

        localStorage.setItem('cant_libros',cant_libros)
        localStorage.setItem('libros_agregados',libros_agregados)
        localStorage.setItem('precios_agregados',precios_agregados)
        localStorage.setItem('cantidades_agregadas',cantidades_agregadas)
    
        Toastify({
            text: "Agregado al carrito",
            duration: 1500,
            destination: "#",
            newWindow: false,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
        }).showToast();
        update_carrito()
    } else {
        Toastify({
            text: "Elige la cantidad a agregar",
            duration: 1500,
            destination: "#",
            newWindow: false,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #ffb3b3, #ff6666)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
    }
}

function update_carrito() {
    let c=document.getElementById("carrito")
    let total=0
    let cant_libros=0
    for (let i=0; i<precios_agregados.length;i++) {
        total=total+parseInt(precios_agregados[i])*parseInt(cantidades_agregadas[i])
        cant_libros=cant_libros+parseInt(cantidades_agregadas[i])
    }
    let texto="Ver el carrito (" + cant_libros + ") " + total + " $ 🛒"
    c.innerHTML=texto
}

//Boton Vaciar carrito
let boton_reset=document.getElementById("boton_reset")

boton_reset.onclick = () => {
    if (libros_agregados.length!=0) {
        Swal.fire({
            title: "Quieres vaciar el carrito?",
            showDenyButton: true,
            //showCancelButton: true,
            confirmButtonText: "Sí, vaciar el carrito",
            denyButtonText: `No, mantener el carrito`,
            color: "#00ff00",
            background: "#333333"
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                libros_agregados.length=0
                precios_agregados.length=0
                cantidades_agregadas.length=0
                cant_libros = 0
                localStorage.setItem('cant_libros',cant_libros)
                localStorage.setItem('libros_agregados',libros_agregados)
                localStorage.setItem('precios_agregados',precios_agregados)
                localStorage.setItem('cantidades_agregadas',cantidades_agregadas)
                let c=document.getElementById("carrito")
                let texto="Ver el carrito (0) 0 $ 🛒"
                c.innerHTML=texto  
                Swal.fire({
                    title: "Carrito eliminado",
                    text: "Puedes volver a ingresar libros",
                    icon: "info",
                    color: "#00ff00",
                    background: "#333333"
                });
            } else if (result.isDenied) {
                Swal.fire({
                    title: "Carrito guardado",
                    text: "Puedes seguir comprando",
                    icon: "info",
                    color: "#00ff00",
                    background: "#333333"
                });
            }
        });
    } else {
        Swal.fire({
            title: "El carrito ya está vacio",
            text: "",
            icon: "warning",
            color: "#00ff00",
            background: "#333333"
        });
    }
}
