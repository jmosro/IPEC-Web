/**
* @brief   Diseño de página web para la empresa InfoIPEC, se dedica a la venta y reparación de equipo informático.
* @file    main.js
* @author  Jesús Alberto Moscoso Agüero
* @author  J. Mosro - jmosro.14@gmail.com
* @date    2021-mayo-14
* @version 1
*/

/* ----------
Base de Datos
---------- */
// Referencia de catálogo: 09mayo2021 fuente: https://extremetechcr.com/
var productosnombres = ["Laptop", "Disco duro", "Teclado", "Ratón", "Memoría Ram", "Router", "Auricular", "Micrófono", "Llave Maya"];
var productosimagenes = ["resources/productos/producto01.jpg", "resources/productos/producto02.jpg", "resources/productos/producto03.jpg",
  "resources/productos/producto04.jpg", "resources/productos/producto05.jpg", "resources/productos/producto06.jpg",
  "resources/productos/producto07.jpg", "resources/productos/producto08.jpg", "resources/productos/producto09.jpg"];
var productosprecios = [319000, 39000, 3000, 5000, 35000, 160000, 32000, 35000, 9000];
var productosstocks = [20, 15, 10, 10, 8, 5, 5, 3, 30];
var IVA = 0.13; // Impuesto al Valor Agregado - Ministerio de Hacienda Costa Rica
var precioTransporte = [5000, 4000, 3000, "gratis"]; // Transporte
var unidadesUser;


/* ------------------------------
Ejecutar cuando carga la pantalla 
------------------------------ */
window.onload = function () {

  // Cargar los productos
  var Fichas = document.getElementsByName("Fichas");
  for (i in productosnombres) {
    Fichas[i].innerHTML =
      '<div class="ficha_contenedor_franja">' +
      '<div class="ficha_contenedor_datos">' +
      '<img class="ficha_imagen" src="' + productosimagenes[i] + '"><br />' +
      '<span class="ficha_etiqueta">' + productosnombres[i] + ' : ₡' + productosprecios[i] + '</span><br />' +
      '<span class="ficha_stock">Hay en stock ' + productosstocks[i] + ' unidades<br />¿Cuántas quiere?: </span>' +
      '<input class="uniBien" type="number" id="unidadesUser' + i + '" name="unidadesUser" value="0" style="width:45px" />' +
      '</div>' +
      '</div>';
  }

  // Cargar numeración de fecha nacimiento
  var fecha = new Date();
  var anio = fecha.getFullYear();
  for (var i = 1; i <= 31; i++) {
    document.getElementById("fecha_nacimiento_dia").innerHTML =
      document.getElementById("fecha_nacimiento_dia").innerHTML +
      '<option value="' + i + '">' + i + '</option>';
  }
  for (var i = anio; i >= (anio - 110); i--) {
    document.getElementById("fecha_nacimiento_anio").innerHTML =
      document.getElementById("fecha_nacimiento_anio").innerHTML +
      '<option value="' + i + '">' + i + '</option>';
  }

  // Cargar numeración de tarjeta de crédito
  for (var i = 1; i <= 12; i++) {
    document.getElementById("mes_tarjeta").innerHTML =
      document.getElementById("mes_tarjeta").innerHTML +
      '<option value="' + i + '">' + i + '</option>';
  }
  for (var i = anio; i <= (anio + 21); i++) {
    document.getElementById("anio_tarjeta").innerHTML =
      document.getElementById("anio_tarjeta").innerHTML +
      '<option value="' + i + '">' + i + '</option>';
  }

  nuevoPedido();
}


/* ----------------------------------------
Función de enlazar acciones con los botones 
---------------------------------------- */
function nuevoPedido(elEvento) {
  // Acciones inicial de los botones
  document.getElementById("boton_Catalogo").onclick = mostrarCatalogo;
  document.getElementById("boton_Facturar").onclick = validarUnidades;
  document.getElementById("boton_Datos_Personales").onclick = mostrarDatosPersonales;
  document.getElementById("boton_Metodo_Pago").onclick = validaDatosPersonales;
  document.getElementById("boton_Confirmar_Pedido").onclick = validarDatosPago;
  document.getElementById("boton_Nuevo").onclick = nuevoPedido;
  // Estado inicial de los botones
  document.getElementById("boton_Catalogo").disabled = false;
  document.getElementById("boton_Facturar").disabled = false;
  document.getElementById("boton_Datos_Personales").disabled = true;
  document.getElementById("boton_Metodo_Pago").disabled = true;
  document.getElementById("boton_Confirmar_Pedido").disabled = true;
  document.getElementById("boton_Nuevo").style.display = "none";
  // Rellenar el valor por defecto de las unidades del usuario
  unidadesUser = document.getElementsByName("unidadesUser");
  for (i in productosnombres) {
    unidadesUser[i].value = 0;
  }

  mostrarCatalogo();
}


/* ---------------------------
Función de mostrar el catálogo
--------------------------- */
function mostrarCatalogo(elEvento) {
  // Ocultar secciones del carrito
  document.getElementById("carrito_catalogo_contenedor").style.display = "block";
  document.getElementById("carrito_factura_contenedor").style.display = "none";
  document.getElementById("carrito_datos_personales_contenedor").style.display = "none";
  document.getElementById("carrito_metodo_pago_contenedor").style.display = "none";
  document.getElementById("carrito_confirmar_pedido_contenedor").style.display = "none";
}


/* ---------------------------
Función de mostrar la factura
--------------------------- */
function mostrarFactura(elEvento) {
  // Ocultar secciones del carrito
  document.getElementById("carrito_catalogo_contenedor").style.display = "none";
  document.getElementById("carrito_factura_contenedor").style.display = "block";
  document.getElementById("carrito_datos_personales_contenedor").style.display = "none";
  document.getElementById("carrito_metodo_pago_contenedor").style.display = "none";
  document.getElementById("carrito_confirmar_pedido_contenedor").style.display = "none";
  // Estado de los botones
  document.getElementById("boton_Catalogo").disabled = false;
  document.getElementById("boton_Facturar").disabled = false;
  document.getElementById("boton_Datos_Personales").disabled = false;
  document.getElementById("boton_Metodo_Pago").disabled = true;
  document.getElementById("boton_Confirmar_Pedido").disabled = true;
  document.getElementById("boton_Nuevo").style.display = "none";
}


/* ------------------------------------
Función de mostrar los datos personales
------------------------------------ */
function mostrarDatosPersonales(elEvento) {
  // Ocultar secciones del carrito
  document.getElementById("carrito_catalogo_contenedor").style.display = "none";
  document.getElementById("carrito_factura_contenedor").style.display = "none";
  document.getElementById("carrito_datos_personales_contenedor").style.display = "block";
  document.getElementById("carrito_metodo_pago_contenedor").style.display = "none";
  document.getElementById("carrito_confirmar_pedido_contenedor").style.display = "none";
  // Estado de los botones
  document.getElementById("boton_Catalogo").disabled = false;
  document.getElementById("boton_Facturar").disabled = false;
  document.getElementById("boton_Datos_Personales").disabled = false;
  document.getElementById("boton_Metodo_Pago").disabled = false;
  document.getElementById("boton_Confirmar_Pedido").disabled = true;
  document.getElementById("boton_Nuevo").style.display = "none";
}


/* -----------------------------------
Función de mostrar los métodos de pago
----------------------------------- */
function mostrarMetodoPago(elEvento) {
  // Ocultar secciones del carrito
  document.getElementById("carrito_catalogo_contenedor").style.display = "none";
  document.getElementById("carrito_factura_contenedor").style.display = "none";
  document.getElementById("carrito_datos_personales_contenedor").style.display = "none";
  document.getElementById("carrito_metodo_pago_contenedor").style.display = "block";
  document.getElementById("carrito_confirmar_pedido_contenedor").style.display = "none";
  // Estado de los botones
  document.getElementById("boton_Catalogo").disabled = false;
  document.getElementById("boton_Facturar").disabled = false;
  document.getElementById("boton_Datos_Personales").disabled = false;
  document.getElementById("boton_Metodo_Pago").disabled = false;
  document.getElementById("boton_Confirmar_Pedido").disabled = false;
  document.getElementById("boton_Nuevo").style.display = "none";
}


/* --------------------------------
Función de mostrar confirmar pedido
-------------------------------- */
function mostrarConfirmarPedido(elEvento) {
  // Ocultar secciones del carrito
  document.getElementById("carrito_catalogo_contenedor").style.display = "none";
  document.getElementById("carrito_factura_contenedor").style.display = "none";
  document.getElementById("carrito_datos_personales_contenedor").style.display = "none";
  document.getElementById("carrito_metodo_pago_contenedor").style.display = "none";
  document.getElementById("carrito_confirmar_pedido_contenedor").style.display = "block";
  // Estado de los botones
  document.getElementById("boton_Catalogo").disabled = false;
  document.getElementById("boton_Facturar").disabled = false;
  document.getElementById("boton_Datos_Personales").disabled = false;
  document.getElementById("boton_Metodo_Pago").disabled = false;
  document.getElementById("boton_Confirmar_Pedido").disabled = false;
  document.getElementById("boton_Nuevo").style.display = "none";
}


/* --------------------------------
Función de mostrar confirmar pedido
-------------------------------- */
function desabilitarCompraMenu(elEvento) {
  // Estado de los botones
  document.getElementById("boton_Catalogo").disabled = true;
  document.getElementById("boton_Facturar").disabled = true;
  document.getElementById("boton_Datos_Personales").disabled = true;
  document.getElementById("boton_Metodo_Pago").disabled = true;
  document.getElementById("boton_Confirmar_Pedido").disabled = true;
  document.getElementById("boton_Nuevo").style.display = "inline";
}


/* ----------------------------
Función de validar las unidades
---------------------------- */
function validarUnidades(elEvento) {

  var todoBien = true;
  var todoCero = true;
  unidadesUser = document.getElementsByName("unidadesUser");

  for (i in productosnombres) {
    if (unidadesUser[i].value == "" || unidadesUser[i].value > productosstocks[i] || unidadesUser[i].value < 0) {
      todoBien = false;
      unidadesUser[i].className = "uniMal";
    } else {
      unidadesUser[i].className = "uniBien";
    }
    if (unidadesUser[i].value != 0) {
      todoCero = false;
    }
  }
  if (todoBien && !todoCero) {
    facturar();
  } else if (todoCero) {
    alert("Por favor, elega la cantidad de producto que necesita.");
  } else {
    alert("Por favor, eliga una cantidad de stock suficiente.");
  }
}


/* -----------------------------
Función para calcular la factura
----------------------------- */
function facturar(elEvento) {

  // Añadir el encabezado de la tabla
  document.getElementById("tabla_total_factura").innerHTML =
    '<tr>' +
    '<td class="pro"><b>Producto</b></td>' +
    '<td class="uni"><b>Unidades</b></td>' +
    '<td class="preUni"><b>Precio Unidad</b></td>' +
    '<td class="preTotal"><b>Precio Total</b></td>' +
    '</tr>';

  // Inicializar las variables para esta función
  var carroTotal = 0;
  var numProductos = 0;

  // Mostrar el carrito de la compra
  for (i in productosnombres) {

    var tablaTotal = document.getElementById("tabla_total_factura").innerHTML;
    var preTotal = 0;

    // Contar el numero de productos para saber cuánto costará el transporte
    if (unidadesUser[i].value != 0) {
      numProductos++;
    }

    if (unidadesUser[i].value != 0) {
      // Calcular el total de unidades y rellenar el carro de la compra
      preTotal = productosprecios[i] * unidadesUser[i].value;
      carroTotal = carroTotal + preTotal;
      document.getElementById("tabla_total_factura").innerHTML = tablaTotal +
        '<tr class="proCarrito">' +
        '<td>' + productosnombres[i] + '</td>' +
        '<td>' + unidadesUser[i].value + '</td>' +
        '<td>' + '₡' + new Intl.NumberFormat('es-ES').format(productosprecios[i]) + '</td>' +
        '<td id="preTotal' + i + '" name="preTotal">' + '₡' + new Intl.NumberFormat('es-ES').format(preTotal) + '</td>' +
        '</tr>';
    }
  }

  if (numProductos > 0) {
    mostrarFactura();
  }

  // Calcular el transporte a pagar según la cantidad de productos comprados
  var precioTransporteAPagar;
  if (numProductos <= 2) { precioTransporteAPagar = precioTransporte[0]; }
  else if (numProductos <= 3) { precioTransporteAPagar = precioTransporte[1]; }
  else if (numProductos <= 4) { precioTransporteAPagar = precioTransporte[2]; }
  else if (numProductos >= 5) { precioTransporteAPagar = precioTransporte[3]; }

  // Calcular cuentas del transporte (si lo hubiese), IVA y el total
  var totalTransporte = precioTransporteAPagar;
  if (totalTransporte == "gratis") {
    var totalIVA = (carroTotal * IVA);
    var totalAPagar = carroTotal + totalIVA;
  } else {
    var totalIVA = ((carroTotal + totalTransporte) * IVA);
    var totalAPagar = carroTotal + totalTransporte + totalIVA;
  }

  // Limitar a 2 los decimales a mostrar del IVA
  totalIVA = totalIVA * 100;
  totalIVA = Math.floor(totalIVA);
  totalIVA = totalIVA / 100;
  // Limitar a 2 los decimales a mostrar del total a pagar
  totalAPagar = totalAPagar * 100;
  totalAPagar = Math.floor(totalAPagar);
  totalAPagar = totalAPagar / 100;

  // Se añade a la tabla el total que suma el carrito
  tablaTotal = document.getElementById("tabla_total_factura").innerHTML;
  document.getElementById("tabla_total_factura").innerHTML = tablaTotal +
    '<tr>' +
    '<td></td>' +
    '<td></td>' +
    '<td class="preUni"><b>Transporte: </b></td>' +
    '<td class="preTotal"><b>' + '₡' + new Intl.NumberFormat('es-ES').format(totalTransporte) + '</b></td>' +
    '</tr>' +
    '<tr>' +
    '<td></td>' +
    '<td></td>' +
    '<td class="preUni"><b>IVA (' + (IVA * 100) + '%): </b></td>' +
    '<td class="preTotal"><b>' + '₡' + new Intl.NumberFormat('es-ES').format(totalIVA) + '</b></td>' +
    '</tr>' +
    '<tr>' +
    '<td></td>' +
    '<td></td>' +
    '<td class="preUni"><b>Total: </b></td>' +
    '<td class="preTotal" id="totalAPagar"><b>' + '₡' + new Intl.NumberFormat('es-ES').format(totalAPagar)  + '</b></td>' +
    '</tr>';
}


/* ------------------------------------
Función de validar los datos personales
------------------------------------ */
function validaDatosPersonales(elEvento) {
  var todoBien = true;

  // Nombre completo
  var vNombre = document.getElementById("nombre_completo").value;
  if (vNombre == null || vNombre.length == 0 || /^\s+$/.test(vNombre) || !isNaN(vNombre)) {
    todoBien = false;
    document.getElementById("nombre_completo").className = "textMal";
  } else {
    document.getElementById("nombre_completo").className = "textBien";
  }

  // Cédula 
  var cedula = document.getElementById("cedula").value;
  if (!(/^\d{9}$/.test(cedula))) {
    todoBien = false;
    document.getElementById("cedula").className = "textMal";
  } else {
    document.getElementById("cedula").className = "textBien";
  }

  // Fecha de nacimiento día
  var vFechaNacimientoDia = document.getElementById("fecha_nacimiento_dia").selectedIndex;
  if (vFechaNacimientoDia == null || vFechaNacimientoDia == 0) {
    todoBien = false;
    document.getElementById("fecha_nacimiento_dia").className = "incorrecto";
  } else {
    document.getElementById("fecha_nacimiento_dia").className = "correcto";
  }
  // Fecha de nacimiento mes
  var vFechaNacimientoMes = document.getElementById("fecha_nacimiento_mes").selectedIndex;
  if (vFechaNacimientoMes == null || vFechaNacimientoMes == 0) {
    todoBien = false;
    document.getElementById("fecha_nacimiento_mes").className = "incorrecto";
  } else {
    document.getElementById("fecha_nacimiento_mes").className = "correcto";
  }
  // Fecha de nacimiento año
  var vFechaNacimientoAnio = document.getElementById("fecha_nacimiento_anio").selectedIndex;
  if (vFechaNacimientoAnio == null || vFechaNacimientoAnio == 0) {
    todoBien = false;
    document.getElementById("fecha_nacimiento_anio").className = "incorrecto";
  } else {
    document.getElementById("fecha_nacimiento_anio").className = "correcto";
  }

  // Teléfono
  var vMovil = document.getElementById("movil").value;
  if (!(/^\d{8}$/.test(vMovil))) {
    todoBien = false;
    document.getElementById("movil").className = "textMal";
  } else {
    document.getElementById("movil").className = "textBien";
  }

  // Email
  var vEmail1 = document.getElementById("email1").value;
  var vEmail2 = document.getElementById("email2").value;
  // Email 1
  if (!(/^\w+([-.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vEmail1))) {
    todoBien = false;
    document.getElementById("email1").className = "textMal";
  }
  else {
    document.getElementById("email1").className = "textBien";
  }
  // Email 2
  if (!(/^\w+([-.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(vEmail2))) {
    todoBien = false;
    document.getElementById("email2").className = "textMal";
  }
  else {
    document.getElementById("email2").className = "textBien";
  }

  // Comparar email 1 con email 2
  if (vEmail1 != vEmail2) {
    todoBien = false;
    document.getElementById("email2").className = "textMal";
  }

  // Localidad
  var vLocalidad = document.getElementById("localidad").value;
  if (vLocalidad == null || vLocalidad.length == 0 || /^\s+$/.test(vLocalidad) || !isNaN(vLocalidad)) {
    todoBien = false;
    document.getElementById("localidad").className = "textMal";
  } else {
    document.getElementById("localidad").className = "textBien";
  }

  // Código Postal
  var vCodigoPostal = document.getElementById("codigoPostal").value;
  if (vCodigoPostal.length != 5 || vCodigoPostal == "" || isNaN(vCodigoPostal)) {
    todoBien = false;
    document.getElementById("codigoPostal").className = "textMal";
  } else {
    document.getElementById("codigoPostal").className = "textBien";
  }

  // Provincia
  var vProvincia = document.getElementById("provincia").selectedIndex;
  if (vProvincia == null || vProvincia == 0) {
    todoBien = false;
    document.getElementById("provincia").className = "incorrecto";
  }
  else {
    document.getElementById("provincia").className = "correcto";
  }

  if (todoBien) {
    mostrarMetodoPago();
  }
}


/* ---------------------------------
Función de validar los datos de pago
--------------------------------- */
function validarDatosPago(elEvento) {
  var todoBien = true;

  // Titular de la cuenta
  var vTitular = document.getElementById("titular").value;
  if (vTitular == null || vTitular.length == 0 || /^\s+$/.test(vTitular) || !isNaN(vTitular)) {
    todoBien = false;
    document.getElementById("titular").className = "textMal";
  } else {
    document.getElementById("titular").className = "textBien";
  }

  // Tipo de tarjeta
  var vTarjetas = document.getElementsByName("tarjetas");
  var seleccionado = false;
  for (var i = 0; i < vTarjetas.length; i++) {
    if (vTarjetas[i].checked) {
      seleccionado = true;
      //break;
    }
  }
  if (!seleccionado) {
    todoBien = false;
    document.getElementById("texto_tipo_tarjeta").className = "spanMal";
  } else {
    document.getElementById("texto_tipo_tarjeta").className = "spanBien";
  }

  // Número de tarjeta 
  var vNumeroTarjeta = document.getElementById("numero_tarjeta").value;
  if (vNumeroTarjeta.length != 16 || vNumeroTarjeta == "" || isNaN(vNumeroTarjeta)) {
    todoBien = false;
    document.getElementById("numero_tarjeta").className = "textMal";
  } else {
    document.getElementById("numero_tarjeta").className = "textBien";
  }

  // CVC de la tarjeta
  var vCvcTarjeta = document.getElementById("cvc_tarjeta").value;
  if (vCvcTarjeta.length != 3 || vCvcTarjeta == "" || isNaN(vCvcTarjeta)) {
    todoBien = false;
    document.getElementById("cvc_tarjeta").className = "textMal";
  } else {
    document.getElementById("cvc_tarjeta").className = "textBien";
  }

  // Fecha de tarjeta mes
  var vMesTarjeta = document.getElementById("mes_tarjeta").selectedIndex;
  if (vMesTarjeta == null || vMesTarjeta == 0) {
    todoBien = false;
    document.getElementById("mes_tarjeta").className = "incorrecto";
  } else {
    document.getElementById("mes_tarjeta").className = "correcto";
  }
  // Fecha de tarjeta año
  var vAnioTarjeta = document.getElementById("anio_tarjeta").selectedIndex;
  if (vAnioTarjeta == null || vAnioTarjeta == 0) {
    todoBien = false;
    document.getElementById("anio_tarjeta").className = "incorrecto";
  } else {
    document.getElementById("anio_tarjeta").className = "correcto";
  }

  if (todoBien) {
    mostrarConfirmarPedido();
    desabilitarCompraMenu();
  }
}
