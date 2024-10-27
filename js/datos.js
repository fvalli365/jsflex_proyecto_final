let canti=localStorage.getItem('cant_libros')
let cantidad=parseInt(canti)
let libros_agre=localStorage.getItem('libros_agregados')
let libros_agregados = Array.from(libros_agre.split(","));
let precios_agre=localStorage.getItem('precios_agregados')
let precios_agregados= Array.from(precios_agre.split(","));
let cantidades_agre=localStorage.getItem('cantidades_agregadas')
let cantidades_agregadas= Array.from(cantidades_agre.split(","));


let texto_inputs = []  // Array que contiene el texto ingresado en cada input
let completed=-1 // 0 = formulario ok / -1 = formulario incompleto

genera_form()

function genera_form() {
    let costo_libros=0
    let costo_envio=0
    let unidades=0
    for (let i=0; i<libros_agregados.length;i++) {
        costo_libros=costo_libros+parseInt(precios_agregados[i])*parseInt(cantidades_agregadas[i])
    }
    let mensaje=document.getElementById("datos_pag")

    if (!isNaN(costo_libros)) {
        texto1 = document.createElement("h1")
        texto1.innerHTML="Paso 1 - Completa el siguiente formulario"
        
        form1 = document.createElement("p")
        form1.innerHTML=`Nombre y Apellido: <input id="1" class="input" type="text">`
        
        form2 = document.createElement("p")
        form2.innerHTML=`DNI: <input id="2" class="input" type="text">`
        form2_err = document.createElement("p")
        form2_err.innerHTML=`<span id="e2" class="spans"></span>`

        form3 = document.createElement("p")
        form3.innerHTML=`email: <input id="3" class="input" type="email">`
        
        form4 = document.createElement("p")
        form4.innerHTML=`Calle: <input id="4" class="input" type="text">`

        form5 = document.createElement("p")
        form5.innerHTML=`Altura: <input id="5" class="input" type="text">`
        form5_err = document.createElement("p")
        form5_err.innerHTML=`<span id="e5" class="spans"></span>`

        form6 = document.createElement("p")
        form6.innerHTML=`Localidad: <input id="6" class="input" type="text">`

        form7 = document.createElement("p")
        form7.innerHTML=`Provincia: <input id="7" class="input" type="text">`

        form8 = document.createElement("p")
        form8.innerHTML='Código Postal: <input id="8" class="input" type="text">'
        form8_err = document.createElement("p")
        form8_err.innerHTML=`<span id="e8" class="spans"></span>`

        form9 = document.createElement("p")
        form9.innerHTML=`País: <input id="9" class="input" type="text">`

        form10 = document.createElement("p")
        form10.innerHTML=`Forma de pago: <select id="10" class="input">
        <option value="Seleccionar">Seleccionar</option>
        <option value="Tarjeta de crédito">Tarjeta de crédito</option>
        <option value="Tarjeta de débito">Tarjeta de débito</option>
        <option value="Transferencia Bancaria">Transferencia bancaria</option>
        </select>`

        form11 = document.createElement("p")
        form11.innerHTML=`<button disabled id="bsubmit">Enviar</button>`

        mensaje.appendChild(texto1)
        mensaje.appendChild(form1)
        texto_inputs.push("")
        mensaje.appendChild(form2)
        texto_inputs.push("")
        mensaje.appendChild(form2_err)
        mensaje.appendChild(form3)
        texto_inputs.push("")
        mensaje.appendChild(form4)
        texto_inputs.push("")
        mensaje.appendChild(form5)
        texto_inputs.push("")
        mensaje.appendChild(form5_err)
        mensaje.appendChild(form6)
        texto_inputs.push("")
        mensaje.appendChild(form7)
        texto_inputs.push("")
        mensaje.appendChild(form8)
        texto_inputs.push("")
        mensaje.appendChild(form8_err)
        mensaje.appendChild(form9)
        texto_inputs.push("")
        mensaje.appendChild(form10)
        texto_inputs.push("")
        mensaje.appendChild(form11)
        texto_inputs.push("")

        genera_eventos()

    } else {
        const elemento = document.createElement("div");
        elemento.innerHTML="No hay libros agregados al carrito"
        mensaje.appendChild(elemento)
    }
}

function genera_eventos() {
    const inputs=document.getElementsByClassName("input")
    for(let i=0;i<inputs.length;i++) {
        id=inputs[i].id
        inputs[i].setAttribute("oninput",`actualiza_input(${id},${i})`)
    }
    const bsub=document.getElementById("bsubmit")
    bsub.setAttribute("onclick", `window.location.href = '../html/resumen_compra.html'`)
}

function actualiza_input(id,index) {
    let t1=document.getElementById(id)
    let t2=t1.value
    texto_inputs[index]=t2
    if (t2!="") {
        t1.setAttribute("style", "border: 2px solid #80ff80;"); 
    } else {
        t1.setAttribute("style", "border: 2px solid #ff6666;");
    }
    valida_form()
}

function valida_form() {
    const inputs=document.getElementsByClassName("input")
    completed=0

    for (let i=0;i<inputs.length;i++) {
        id1=inputs[i].id
        let t=document.getElementById(id1).value
        if (t=="") {
            completed=-1
        }
        
        if (i==9 && t=="Seleccionar") {
            completed=-1
        }

        if (i==1) {
            try {
                if (t!="" && Number.isInteger(parseInt(t))!=true) {   // Chequea que el campo DNI contenga solo números
                    inputs[i].setAttribute("style", "border: 2px solid #ff6666;");
                    completed=-1 
                    throw "Debe contener solo números"
                }
                else if (t!="" && Number.isInteger(parseInt(t))==true) {
                    document.getElementById("e2").innerHTML=""
                    inputs[i].setAttribute("style", "border: 2px solid #80ff80;"); 
                }
            }    
            catch (err) {
                document.getElementById("e2").innerHTML=err
            }
        }

        if (i==4) {
            try {
                if (t!="" && Number.isInteger(parseInt(t))!=true) {  // Chequea que el campo Altura contenga solo números
                    inputs[i].setAttribute("style", "border: 2px solid #ff6666;");
                    completed=-1 
                    throw "Debe contener solo números"
                } 
                else if (t!="" && Number.isInteger(parseInt(t))==true) {
                    document.getElementById("e5").innerHTML=""
                    inputs[i].setAttribute("style", "border: 2px solid #80ff80;"); 
                }
            }
            catch (err) {
                document.getElementById("e5").innerHTML=err
            }
        }

        if (i==7) {
            try {
                if (t!="" && Number.isInteger(parseInt(t))!=true) {  // Chequea que el campo Código Postal contenga solo números
                    inputs[i].setAttribute("style", "border: 2px solid #ff6666;");
                    completed=-1 
                    throw "Debe contener solo números"
                }
                else if (t!="" && Number.isInteger(parseInt(t))==true) {
                    document.getElementById("e8").innerHTML=""
                    inputs[i].setAttribute("style", "border: 2px solid #80ff80;"); 
                }
            }
            catch (err) {
                document.getElementById("e8").innerHTML=err
            }        
        }
     }

    if (completed == 0) {

        localStorage.setItem('nombre',texto_inputs[0])
        localStorage.setItem('dni',texto_inputs[1])
        localStorage.setItem('email',texto_inputs[2])
        localStorage.setItem('calle',texto_inputs[3])
        localStorage.setItem('altura',texto_inputs[4])
        localStorage.setItem('localidad',texto_inputs[5])
        localStorage.setItem('provincia',texto_inputs[6])
        localStorage.setItem('cod_post',texto_inputs[7])
        localStorage.setItem('pais',texto_inputs[8])
        localStorage.setItem('forma_pag',texto_inputs[9])

        const bsub=document.getElementById("bsubmit")
        bsub.disabled=false
    }
}
