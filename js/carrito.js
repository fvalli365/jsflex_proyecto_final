
// Variables globales
let cantidades_mostradas = []

let canti=localStorage.getItem('cant_libros')
let cantidad=parseInt(canti)
let libros_agre=localStorage.getItem('libros_agregados')
let libros_agregados = Array.from(libros_agre.split(","));
let precios_agre=localStorage.getItem('precios_agregados')
let precios_agregados = Array.from(precios_agre.split(","));
let cantidades_agre=localStorage.getItem('cantidades_agregadas')
let cantidades_agregadas= Array.from(cantidades_agre.split(","));

let libros_agregados_num=[]
for(libro of libros_agregados) {
    libros_agregados_num.push(parseInt(libro))
}

mostrar_carrito()

function mostrar_carrito() {
     if (cantidad==0) {
        let mensaje=document.getElementById("resultado_carr")
        mensaje.innerHTML="No hay libros agregados al carrito"
    } else {
        fetch("../db/data.JSON").
        then(response => response.json()).
        then(data => filtra_datos(data)).
        then(data2 => genera_cards(data2)) 
    }
}

function filtra_datos(libros) {
    let l=[]
    for(let i=0;i<libros.length;i++) {
        for(let j=0;j<libros_agregados_num.length;j++) {
            if (libros[i].id==libros_agregados_num[j]) {
                l.push(libros[i])
            }
        }
    }        
    return l
}

function genera_cards(libros) {
        let mensaje=document.getElementById("resultado_carr")
        mensaje.innerHTML="Mostrando " + cantidad + " libro(s) agregados"

        cantidades_mostradas.length=0

        for (libro of libros) {
            const elemento = document.createElement("div");
            elemento.className = "product_container";
            texto1 = libro.titulo
            texto2 = libro.autor
            texto3 = libro.anio
            texto4 = libro.precio
            texto5 = "."+libro.imagen
            texto6 = libro.id  // Id del libro e Id del botón eliminar
            aux1 = texto6.toString()
            aux2 = libros_agregados.indexOf(aux1)
            texto7 = cantidades_agregadas[aux2]
            texto8 = "b1_"+texto6 // botón -
            texto9 = "b2_"+texto6 // botón +
            texto10 = 100+texto6  // id del span que muestra las cantidades a agregar
            texto11 = 200+texto6  // id del botón modificar
            texto12 = 300+texto6

            cantidades_mostradas.push(0)

            elemento.innerHTML=`<div class="item"><img src=${texto5} /></div>
                            <div class="item">
                            <b>Título:</b> ${texto1}<br>
                            <b>Autor:</b> ${texto2}<br>
                            <b>Año:</b> ${texto3}<br>
                            <b>Precio:</b> ${texto4}<br>
                            <b>Cantidad agregada:</b><span class="cspan2" id="${texto12}">${texto7}</span><br>
                            <button class="item2 b_cantidad_resta" type="button" id="${texto8}">-</button>
                            <span id="${texto10}" class="cspan">0</span>
                            <button class="item2 b_cantidad_suma" type="button" id="${texto9}">+</button>
                            <button class="item2 b_modifica" type="button" id="${texto11}">Modificar</button><br>
                            <button class="item2 b_eliminar" type="button" id="${texto6}">Eliminar</button>
                            </div>`

            mensaje.appendChild(elemento)
        }
        genera_eventos_botones()
        update_carrito()
}


// Botón eliminar onclick="elimina(${texto6})

function genera_eventos_botones() {
    // Botón eliminar
    be=document.getElementsByClassName("b_eliminar")
    for(b of be) {
        aux3=b.id
         b.setAttribute("onclick",`elimina(${aux3})`)
    }
    // Botones + y -
    spans=document.getElementsByClassName("cspan")
    bcs=document.getElementsByClassName("b_cantidad_suma")
    bcr=document.getElementsByClassName("b_cantidad_resta")
    for(let i=0;i<bcs.length;i++) {
        sp=spans[i].id
        aux4=be[i].id
        bcs[i].setAttribute("onclick", `suma_unidad(${sp},${aux4},${i})`)
        bcr[i].setAttribute("onclick", `resta_unidad(${sp},${aux4},${i})`)
    }
    // Botón modificar
    bm=document.getElementsByClassName("b_modifica")
    bc=document.getElementsByClassName("cspan2")
    for(let i=0;i<bm.length;i++) {
        aux5=be[i].id
        sp=spans[i].id
        sp2=bc[i].id
        bm[i].setAttribute("onclick", `modifica(${sp},${aux5},${sp2},${i})`)

    }    
}

function suma_unidad(idspan,idlibro,id) {
    let aux=document.getElementById(idspan)
    let q=parseInt(cantidades_mostradas[id])+1
    cantidades_mostradas[id]=q
    aux.innerHTML=q
}

function resta_unidad(idspan,idlibro,id) {
    let aux=document.getElementById(idspan)
    let q=parseInt(cantidades_mostradas[id])-1
    if (q<0) {
        q=0
    }
    cantidades_mostradas[id]=q
    aux.innerHTML=q
}

function modifica(idspan,idlibro,idspan2,id) {
    let aux=document.getElementById(idspan)
    let c=aux.innerHTML
    let d=parseInt(cantidades_mostradas[id])
    if (d==0) {
        elimina(idlibro)
    } else {
        let aux2=idlibro.toString()
        let aux3=libros_agregados.indexOf(aux2)
        cantidades_agregadas[aux3]=d.toString()
        cantidades_mostradas[id]=0
        let aux4=document.getElementById(idspan2)
        aux4.innerHTML=d.toString()
        aux.innerHTML="0"

        Toastify({
            text: "Cantidad modificada",
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
    }
}


function elimina(id) {
    Swal.fire({
        title: "Quieres eliminar el libro del carrito?",
        showDenyButton: true,
        confirmButtonText: "Sí, eliminar",
        denyButtonText: "No, mantener",
        color: "#00ff00",
        background: "#333333"
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            id2=id.toString()

            let libros_agregados3 = []
            let precios_agregados3 = []
            let cantidades_agregadas3 = []
        
            for (let i=0;i<=libros_agregados.length;i++) {
                if (libros_agregados[i]==id2) {
                    continue
                } else {
                    libros_agregados3.push(libros_agregados[i])
                    precios_agregados3.push(precios_agregados[i])
                    cantidades_agregadas3.push(cantidades_agregadas[i])
                }
            }
        
            libros_agregados.length=0
            precios_agregados.length=0
            cantidades_agregadas.length=0
        
            for (let j=0; j<precios_agregados3.length ; j++) {
                libros_agregados.push(libros_agregados3[j])
                precios_agregados.push(precios_agregados3[j])
                cantidades_agregadas.push(cantidades_agregadas3[j])
            }
        
            libros_agregados.pop()
            precios_agregados.pop()
            cantidades_agregadas.pop()
            cantidad=cantidad-1
        
            libros_agregados_num.length=0
            for(let k=0; k<libros_agregados.length ; k++) {
                libros_agregados_num.push(parseInt(libros_agregados[k]))
            }
        
            localStorage.setItem('cant_libros',cantidad)
            localStorage.setItem('libros_agregados',libros_agregados)
            localStorage.setItem('precios_agregados',precios_agregados)
            localStorage.setItem('cantidades_agregadas',cantidades_agregadas)
            update_carrito()    
            mostrar_carrito()
            Swal.fire({
                title: "Libro eliminado",
                text: "",
                icon: "info",
                color: "#00ff00",
                background: "#333333"
            });
        } else if (result.isDenied) {
            Swal.fire({
                title: "Sigues manteniendo el libro en el carrito",
                text: "",
                icon: "info",
                color: "#00ff00",
                background: "#333333"
            });
        }
      });
}

function update_carrito() {
    let c=document.getElementById("carrito2")
    if (cantidad>0) {
        let total=0
        let cant_libros=0
        for (let i=0; i<precios_agregados.length;i++) {
            total=total+parseInt(precios_agregados[i])*parseInt(cantidades_agregadas[i])
            cant_libros=cant_libros+parseInt(cantidades_agregadas[i])
        }
        let texto="Ver el carrito (" + cant_libros + ") " + total + " $ 🛒"
        c.innerHTML=texto
    } else {
        let texto="Ver el carrito (0) 0 $ 🛒"
        c.innerHTML=texto
    }
}