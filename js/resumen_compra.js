let canti=localStorage.getItem('cant_libros')
let cantidad=parseInt(canti)
let libros_agre=localStorage.getItem('libros_agregados')
let libros_agregados = Array.from(libros_agre.split(","));
let precios_agre=localStorage.getItem('precios_agregados')
let precios_agregados= Array.from(precios_agre.split(","));
let cantidades_agre=localStorage.getItem('cantidades_agregadas')
let cantidades_agregadas= Array.from(cantidades_agre.split(","));

let libros_agregados_num=[]
for(libro of libros_agregados) {
    libros_agregados_num.push(parseInt(libro))
}


let nombre = localStorage.getItem('nombre')
let dni = localStorage.getItem('dni')
let email = localStorage.getItem('email')
let calle = localStorage.getItem('calle')
let altura = localStorage.getItem('altura')
let localidad = localStorage.getItem('localidad')
let provincia = localStorage.getItem('provincia')
let cod_post = localStorage.getItem('cod_post')
let pais = localStorage.getItem('pais')
let forma_pag = localStorage.getItem('forma_pag')

genera_resumen()

function genera_resumen() {
    let mensaje=document.getElementById("resumen_pag")

    texto1 = document.createElement("h1")
    texto1.innerHTML="Paso 2 - Revisa el resumen"
    texto2 = document.createElement("p")
    texto2.innerHTML="Puedes volver al inicio y cambiar los items comprados"

    mensaje.appendChild(texto1)
    mensaje.appendChild(texto2)

    texto3 = document.createElement("p")
    texto3.innerHTML=`Envío a: <br>`
    mensaje.appendChild(texto3)
    texto4 = document.createElement("div")
    texto4.className = "dat_pers_container";
    texto4.innerHTML=`${nombre}<br>${calle} ${altura}<br>${localidad}<br>${provincia}<br>${cod_post}<br>${pais}<br>`
    mensaje.appendChild(texto4)

    texto5 = document.createElement("p")
    texto5.innerHTML=`De los siguientes libros: <br>`
    mensaje.appendChild(texto5)

    fetch("../db/data.JSON").
    then(response => response.json()).
    then(data => filtra_datos(data)).
    then(data2 => genera_cards(data2)) 
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
    let costo_libros=0
    let costo_envio=0
    let unidades=0
    for (let i=0; i<libros_agregados.length;i++) {
        costo_libros=costo_libros+parseInt(precios_agregados[i])*parseInt(cantidades_agregadas[i])
        costo_envio=costo_envio+parseInt(cantidades_agregadas[i])*5  // Se asume un costo de 5 por libro enviado
        unidades=unidades+parseInt(cantidades_agregadas[i])
    }
    let costo_total=costo_libros+costo_envio
    
    let mensaje=document.getElementById("resumen_pag")

    for (libro of libros) {
        const elemento = document.createElement("div");
        elemento.className = "resumen_container";
        texto1 = libro.titulo
        texto2 = libro.precio  // Precio de cada libro
        texto3 = libro.id  // Id del libro e Id del botón eliminar
        aux1 = texto3.toString()
        aux2 = libros_agregados.indexOf(aux1)
        texto4 = cantidades_agregadas[aux2]  // Unidades compradas de cada libro
        texto5 = parseInt(texto2)*parseInt(texto4) // Costo total de cada libro

        elemento.innerHTML=`<div class="item">${texto4} x $${texto2} de ${texto1} = $${texto5}<br></div>`

        mensaje.appendChild(elemento)
    }
    
    texto = document.createElement("p")
    texto.innerHTML=`Por un costo de: <br>`
    mensaje.appendChild(texto)

    cost=document.createElement("div")
    cost.className = "dat_pers_container";
    cost.innerHTML=`<div>Costo de los libros = $${costo_libros}<br>Costo del envío = $${costo_envio}<br>Costo total = $${costo_total}<br>Forma de pago: ${forma_pag}</div>`
    mensaje.appendChild(cost)
    
    texto2 = document.createElement("p")
    texto2.innerHTML=`<button id="comprar">Comprar</button>`
    mensaje.appendChild(texto2)
    b=document.getElementById("comprar")
    b.setAttribute("onclick", `window.location.href = '../html/pago_final.html'`)
}

