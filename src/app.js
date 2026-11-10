// === DATOS MOCK Y UTILIDADES BASE (US-001-S2) ===
const USUARIO_ACTUAL = "Adolfo Lozano";

const PIEZAS_MOCK_INICIALES = [
    { codigo: "P-001", nombre: "Rodamiento axial de bolas", categoria: "Mecánica", stock: 12 },
    { codigo: "P-002", nombre: "Filtro hidráulico de alta presión", categoria: "Hidráulica", stock: 0 },
    { codigo: "P-003", nombre: "Sensor inductivo de proximidad", categoria: "Electrónica", stock: 8 },
    { codigo: "P-004", nombre: "Correa dentada de transmisión", categoria: "Mecánica", stock: 5 },
    { codigo: "P-005", nombre: "Válvula solenoide direccional", categoria: "Neumática", stock: 3 },
    { codigo: "P-006", nombre: "Rodamiento rígido de rodillos", categoria: "Mecánica", stock: 0 },
    { codigo: "P-007", nombre: "Bomba centrífuga auxiliar", categoria: "Hidráulica", stock: 2 },
    { codigo: "P-008", nombre: "Relé térmico de sobrecarga", categoria: "Eléctrica", stock: 15 },
    { codigo: "P-009", nombre: "Junta tórica de nitrilo", categoria: "Consumibles", stock: 40 },
    { codigo: "P-010", nombre: "Manómetro glicerinado 0-250 bar", categoria: "Instrumentación", stock: 6 },
    { codigo: "P-011", nombre: "Cilindro neumático de doble efecto", categoria: "Neumática", stock: 4 },
    { codigo: "P-012", nombre: "Fusible industrial ultrarrápido", categoria: "Eléctrica", stock: 0 },
    { codigo: "P-013", nombre: "Aceite sintético de engranajes 5L", categoria: "Consumibles", stock: 9 },
    { codigo: "P-014", nombre: "Termopar tipo K blindado", categoria: "Instrumentación", stock: 7 },
    { codigo: "P-015", nombre: "Acoplamiento elástico de garras", categoria: "Mecánica", stock: 1 }
];

function inicializarDatos() {
    if (!localStorage.getItem("centinela_piezas")) {
        localStorage.setItem("centinela_piezas", JSON.stringify(PIEZAS_MOCK_INICIALES));
    }
}

function obtenerPiezas() {
    inicializarDatos();
    return JSON.parse(localStorage.getItem("centinela_piezas")) || [];
}

function guardarPiezas(lista) {
    localStorage.setItem("centinela_piezas", JSON.stringify(lista));
}

function normalizarTexto(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

// === US-001-S2: Búsqueda de piezas por nombre o código ===
function buscarPiezas(texto) {
    const piezas = obtenerPiezas();
    const termino = normalizarTexto(texto);
    if (!termino) {
        return piezas;
    }
    return piezas.filter(function(pieza) {
        return normalizarTexto(pieza.codigo).includes(termino) ||
               normalizarTexto(pieza.nombre).includes(termino);
    });
}

function renderizarTablaCatalogo(lista) {
    const tbody = document.getElementById("tbodyCatalogo");
    const msgVacio = document.getElementById("mensajeSinPiezas");
    if (!tbody) {
        return;
    }
    tbody.innerHTML = "";
    if (!lista || lista.length === 0) {
        if (msgVacio) {
            msgVacio.style.display = "block";
        }
        return;
    }
    if (msgVacio) {
        msgVacio.style.display = "none";
    }
    lista.forEach(function(p) {
        const disponible = p.stock > 0;
        const badgeClass = disponible ? "badge-disponible" : "badge-sinstock";
        const badgeText = disponible ? "Disponible" : "Sin stock";
        const tr = document.createElement("tr");
        tr.innerHTML =
            "<td>" + p.codigo + "</td>" +
            "<td>" + p.nombre + "</td>" +
            "<td>" + p.categoria + "</td>" +
            "<td>" + p.stock + "</td>" +
            "<td><span class=\"badge " + badgeClass + "\">" + badgeText + "</span></td>" +
            "<td><a class=\"btn btn-sm\" href=\"solicitar.html?pieza=" + encodeURIComponent(p.codigo) + "\">Solicitar</a></td>";
        tbody.appendChild(tr);
    });
}

function inicializarVistaCatalogo() {
    const inputBusqueda = document.getElementById("inputBusqueda");
    const btnBuscar = document.getElementById("btnBuscar");
    if (!inputBusqueda || !btnBuscar) {
        return;
    }
    const ejecutar = function() {
        const resultados = buscarPiezas(inputBusqueda.value);
        renderizarTablaCatalogo(resultados);
    };
    btnBuscar.addEventListener("click", ejecutar);
    inputBusqueda.addEventListener("input", ejecutar);
    ejecutar();
}

document.addEventListener("DOMContentLoaded", function() {
    inicializarDatos();
    inicializarVistaCatalogo();
});

// === US-002-S2: Modelo de solicitud y función crearSolicitud() ===
function obtenerSolicitudes() {
    const raw = localStorage.getItem("centinela_solicitudes");
    return raw ? JSON.parse(raw) : [];
}

function guardarSolicitudes(lista) {
    localStorage.setItem("centinela_solicitudes", JSON.stringify(lista));
}

function crearSolicitud(datos) {
    const piezas = obtenerPiezas();
    const piezaObj = piezas.find(function(p) { return p.codigo === datos.pieza; });
    const cantidadNum = Number(datos.cantidad);
    const tareaTexto = String(datos.tarea || "").trim();

    const errores = {};
    if (!piezaObj) {
        errores.pieza = "Debe seleccionar una pieza existente en el catálogo.";
    }
    if (!Number.isInteger(cantidadNum) || cantidadNum < 1) {
        errores.cantidad = "La cantidad debe ser un número entero mayor o igual a 1.";
    }
    if (!tareaTexto) {
        errores.tarea = "La tarea de mantenimiento asociada es obligatoria.";
    }

    if (Object.keys(errores).length > 0) {
        return { exito: false, errores: errores };
    }

    const solicitudes = obtenerSolicitudes();
    const nuevoId = "SOL-" + String(solicitudes.length + 1).padStart(3, "0");
    const nuevaSolicitud = {
        id: nuevoId,
        pieza: piezaObj.codigo,
        nombrePieza: piezaObj.nombre,
        cantidad: cantidadNum,
        tarea: tareaTexto,
        solicitante: USUARIO_ACTUAL,
        estado: "Pendiente",
        fecha: new Date().toISOString().split("T")[0]
    };

    solicitudes.push(nuevaSolicitud);
    guardarSolicitudes(solicitudes);
    return { exito: true, solicitud: nuevaSolicitud };
}

function inicializarVistaSolicitar() {
    const form = document.getElementById("formSolicitud");
    const selectPieza = document.getElementById("selectPieza");
    if (!form || !selectPieza) {
        return;
    }

    const piezas = obtenerPiezas();
    selectPieza.innerHTML = '<option value="">-- Seleccione una pieza --</option>';
    piezas.forEach(function(p) {
        const opt = document.createElement("option");
        opt.value = p.codigo;
        opt.textContent = p.codigo + " — " + p.nombre + " (Stock: " + p.stock + ")";
        selectPieza.appendChild(opt);
    });

    const params = new URLSearchParams(window.location.search);
    const piezaPre = params.get("pieza");
    if (piezaPre) {
        selectPieza.value = piezaPre;
    }

    form.addEventListener("submit", function(ev) {
        ev.preventDefault();
        const errPieza = document.getElementById("errorPieza");
        const errCantidad = document.getElementById("errorCantidad");
        const errTarea = document.getElementById("errorTarea");
        const alerta = document.getElementById("alertaFormulario");

        errPieza.style.display = "none";
        errCantidad.style.display = "none";
        errTarea.style.display = "none";
        alerta.style.display = "none";

        const resultado = crearSolicitud({
            pieza: selectPieza.value,
            cantidad: document.getElementById("inputCantidad").value,
            tarea: document.getElementById("inputTarea").value
        });

        if (!resultado.exito) {
            if (resultado.errores.pieza) {
                errPieza.textContent = resultado.errores.pieza;
                errPieza.style.display = "block";
            }
            if (resultado.errores.cantidad) {
                errCantidad.textContent = resultado.errores.cantidad;
                errCantidad.style.display = "block";
            }
            if (resultado.errores.tarea) {
                errTarea.textContent = resultado.errores.tarea;
                errTarea.style.display = "block";
            }
            alerta.className = "alert alert-error";
            alerta.textContent = "Por favor, corrija los errores del formulario antes de continuar.";
            alerta.style.display = "block";
            return;
        }

        alerta.className = "alert alert-success";
        alerta.textContent = "Solicitud " + resultado.solicitud.id + " registrada correctamente en estado Pendiente.";
        alerta.style.display = "block";
        document.getElementById("inputCantidad").value = "1";
        document.getElementById("inputTarea").value = "";
    });
}

document.addEventListener("DOMContentLoaded", function() {
    inicializarVistaSolicitar();
});

// === US-003-S2: Consulta de solicitudes propias (obtenerSolicitudesDeUsuario) ===
const SOLICITUDES_MOCK_INICIALES = [
    {
        id: "SOL-001",
        pieza: "P-009",
        nombrePieza: "Junta tórica de nitrilo",
        cantidad: 4,
        tarea: "OT-095 Sellado circuito secundario",
        solicitante: USUARIO_ACTUAL,
        estado: "Entregada",
        fecha: "2026-10-18"
    },
    {
        id: "SOL-002",
        pieza: "P-003",
        nombrePieza: "Sensor inductivo de proximidad",
        cantidad: 1,
        tarea: "OT-099 Sustitución sensor puerta",
        solicitante: USUARIO_ACTUAL,
        estado: "Aceptada",
        fecha: "2026-10-20"
    },
    {
        id: "SOL-003",
        pieza: "P-001",
        nombrePieza: "Rodamiento axial de bolas",
        cantidad: 2,
        tarea: "OT-101 Ajuste eje principal",
        solicitante: USUARIO_ACTUAL,
        estado: "Pendiente",
        fecha: "2026-10-22"
    }
];

function inicializarSolicitudesMock() {
    if (!localStorage.getItem("centinela_solicitudes")) {
        guardarSolicitudes(SOLICITUDES_MOCK_INICIALES);
    }
}

function obtenerSolicitudesDeUsuario(usuario) {
    inicializarSolicitudesMock();
    const todas = obtenerSolicitudes();
    return todas
        .filter(function(s) { return s.solicitante === usuario; })
        .slice()
        .sort(function(a, b) {
            if (a.fecha !== b.fecha) {
                return b.fecha.localeCompare(a.fecha);
            }
            return b.id.localeCompare(a.id);
        });
}

function obtenerClaseEstado(estado) {
    const mapa = {
        "Pendiente": "badge-pendiente",
        "Aceptada": "badge-aceptada",
        "Entregada": "badge-entregada",
        "Rechazada": "badge-sinstock",
        "Cancelada": "badge-cancelada"
    };
    return mapa[estado] || "badge-pendiente";
}

function renderizarMisSolicitudes() {
    const tbody = document.getElementById("tbodyMisSolicitudes");
    const msgVacio = document.getElementById("mensajeSinMisSolicitudes");
    if (!tbody) {
        return;
    }
    const lista = obtenerSolicitudesDeUsuario(USUARIO_ACTUAL);
    tbody.innerHTML = "";
    if (lista.length === 0) {
        if (msgVacio) {
            msgVacio.style.display = "block";
        }
        return;
    }
    if (msgVacio) {
        msgVacio.style.display = "none";
    }
    lista.forEach(function(s) {
        const tr = document.createElement("tr");
        const badgeClass = obtenerClaseEstado(s.estado);
        tr.innerHTML =
            "<td>" + s.id + "</td>" +
            "<td>" + s.pieza + " — " + (s.nombrePieza || "") + "</td>" +
            "<td>" + s.cantidad + "</td>" +
            "<td>" + s.tarea + "</td>" +
            "<td>" + s.fecha + "</td>" +
            "<td><span class=\"badge " + badgeClass + "\">" + s.estado + "</span>" +
            (s.estado === "Rechazada" && s.motivoRechazo ? "<span class=\"motivo-texto\">Motivo: " + s.motivoRechazo + "</span>" : "") + "</td>" +
            "<td>" + (s.estado === "Pendiente" ? "<button class=\"btn btn-danger btn-sm\" onclick=\"manejarCancelarSolicitud('" + s.id + "')\">Cancelar</button>" : "—") + "</td>";
        tbody.appendChild(tr);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    inicializarSolicitudesMock();
    renderizarMisSolicitudes();
});

// === US-004-S2: Listado de solicitudes pendientes en almacén (obtenerSolicitudesPendientes) ===
function obtenerSolicitudesPendientes() {
    inicializarSolicitudesMock();
    const solicitudes = obtenerSolicitudes();
    const piezas = obtenerPiezas();
    return solicitudes
        .filter(function(s) { return s.estado === "Pendiente"; })
        .slice()
        .sort(function(a, b) {
            if (a.fecha !== b.fecha) {
                return a.fecha.localeCompare(b.fecha);
            }
            return a.id.localeCompare(b.id);
        })
        .map(function(s) {
            const p = piezas.find(function(item) { return item.codigo === s.pieza; });
            return Object.assign({}, s, {
                stockActual: p ? p.stock : 0
            });
        });
}

function renderizarPendientesAlmacen() {
    const tbody = document.getElementById("tbodyPendientesAlmacen");
    const msgVacio = document.getElementById("mensajeSinPendientes");
    if (!tbody) {
        return;
    }
    const pendientes = obtenerSolicitudesPendientes();
    tbody.innerHTML = "";
    if (pendientes.length === 0) {
        if (msgVacio) {
            msgVacio.style.display = "block";
        }
        return;
    }
    if (msgVacio) {
        msgVacio.style.display = "none";
    }
    pendientes.forEach(function(s) {
        const tr = document.createElement("tr");
        tr.innerHTML =
            "<td>" + s.id + "</td>" +
            "<td>" + s.solicitante + "</td>" +
            "<td>" + s.pieza + " — " + (s.nombrePieza || "") + "</td>" +
            "<td>" + s.cantidad + "</td>" +
            "<td>" + s.tarea + "</td>" +
            "<td>" + s.fecha + "</td>" +
            "<td>" + s.stockActual + "</td>" +
            "<td>" +
            "<button class=\"btn btn-success btn-sm\" onclick=\"manejarAceptarSolicitud('" + s.id + "')\">Aceptar</button>" +
            "<button class=\"btn btn-danger btn-sm\" onclick=\"manejarRechazarSolicitud('" + s.id + "')\">Rechazar</button>" +
            "</td>";
        tbody.appendChild(tr);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    renderizarPendientesAlmacen();
    if (typeof renderizarAceptadasAlmacen === 'function') { renderizarAceptadasAlmacen(); }
});

// === US-005-S2: Aceptar y rechazar solicitudes pendientes ===
function aceptarSolicitud(id) {
    const solicitudes = obtenerSolicitudes();
    const sol = solicitudes.find(function(s) { return s.id === id; });
    if (!sol || sol.estado !== "Pendiente") {
        return { exito: false, mensaje: "La solicitud ya fue gestionada o no está Pendiente." };
    }
    sol.estado = "Aceptada";
    guardarSolicitudes(solicitudes);
    return { exito: true, mensaje: "Solicitud " + id + " marcada como Aceptada." };
}

function rechazarSolicitud(id) {
    const solicitudes = obtenerSolicitudes();
    const sol = solicitudes.find(function(s) { return s.id === id; });
    if (!sol || sol.estado !== "Pendiente") {
        return { exito: false, mensaje: "La solicitud ya fue gestionada o no está Pendiente." };
    }
    sol.estado = "Rechazada";
    guardarSolicitudes(solicitudes);
    return { exito: true, mensaje: "Solicitud " + id + " marcada como Rechazada." };
}

function mostrarAlertaAlmacen(exito, texto) {
    const alerta = document.getElementById("alertaAlmacen");
    if (!alerta) {
        return;
    }
    alerta.className = exito ? "alert alert-success" : "alert alert-error";
    alerta.textContent = texto;
    alerta.style.display = "block";
}

function manejarAceptarSolicitud(id) {
    const res = aceptarSolicitud(id);
    mostrarAlertaAlmacen(res.exito, res.mensaje);
    renderizarPendientesAlmacen();
    if (typeof renderizarAceptadasAlmacen === 'function') { renderizarAceptadasAlmacen(); }
}

function manejarRechazarSolicitud(id) {
    const res = rechazarSolicitud(id);
    mostrarAlertaAlmacen(res.exito, res.mensaje);
    renderizarPendientesAlmacen();
    if (typeof renderizarAceptadasAlmacen === 'function') { renderizarAceptadasAlmacen(); }
}

// === US-006-S2: Función centralizada modificarStock y entregarSolicitud ===
function modificarStock(codigo, deltaCantidad) {
    const piezas = obtenerPiezas();
    const pieza = piezas.find(function(p) { return p.codigo.toUpperCase() === String(codigo).toUpperCase(); });
    if (!pieza) {
        return { exito: false, mensaje: "Pieza no encontrada" };
    }
    const nuevoStock = pieza.stock + Number(deltaCantidad);
    if (nuevoStock < 0) {
        return { exito: false, mensaje: "Stock insuficiente" };
    }
    pieza.stock = nuevoStock;
    guardarPiezas(piezas);
    return { exito: true, stockResultante: nuevoStock, pieza: pieza };
}

function entregarSolicitud(id) {
    const solicitudes = obtenerSolicitudes();
    const sol = solicitudes.find(function(s) { return s.id === id; });
    if (!sol || sol.estado !== "Aceptada") {
        return { exito: false, mensaje: "Solo se pueden entregar solicitudes en estado Aceptada." };
    }
    const resultadoStock = modificarStock(sol.pieza, -sol.cantidad);
    if (!resultadoStock.exito) {
        return { exito: false, mensaje: "Stock insuficiente" };
    }
    sol.estado = "Entregada";
    guardarSolicitudes(solicitudes);
    return {
        exito: true,
        mensaje: "Solicitud " + id + " entregada. Nuevo stock de " + sol.pieza + ": " + resultadoStock.stockResultante + " uds."
    };
}

function renderizarAceptadasAlmacen() {
    const tbody = document.getElementById("tbodyAceptadasAlmacen");
    const msgVacio = document.getElementById("mensajeSinAceptadas");
    if (!tbody) {
        return;
    }
    const solicitudes = obtenerSolicitudes();
    const piezas = obtenerPiezas();
    const aceptadas = solicitudes.filter(function(s) { return s.estado === "Aceptada"; });
    tbody.innerHTML = "";
    if (aceptadas.length === 0) {
        if (msgVacio) {
            msgVacio.style.display = "block";
        }
        return;
    }
    if (msgVacio) {
        msgVacio.style.display = "none";
    }
    aceptadas.forEach(function(s) {
        const p = piezas.find(function(item) { return item.codigo === s.pieza; });
        const stockDisp = p ? p.stock : 0;
        const tr = document.createElement("tr");
        tr.innerHTML =
            "<td>" + s.id + "</td>" +
            "<td>" + s.solicitante + "</td>" +
            "<td>" + s.pieza + " — " + (s.nombrePieza || "") + "</td>" +
            "<td>" + s.cantidad + "</td>" +
            "<td>" + stockDisp + "</td>" +
            "<td><span class=\"badge badge-aceptada\">Aceptada</span></td>" +
            "<td><button class=\"btn btn-success btn-sm\" onclick=\"manejarEntregarSolicitud('" + s.id + "')\">Marcar como entregada</button></td>";
        tbody.appendChild(tr);
    });
}

function manejarEntregarSolicitud(id) {
    const res = entregarSolicitud(id);
    mostrarAlertaAlmacen(res.exito, res.mensaje);
    renderizarAceptadasAlmacen();
    renderizarPendientesAlmacen();
}

document.addEventListener("DOMContentLoaded", function() {
    renderizarAceptadasAlmacen();
});

// === US-007-S2: Alta manual de nueva pieza en inventario (crearPieza) ===
function crearPieza(datos) {
    const piezas = obtenerPiezas();
    const codigoLimpio = String(datos.codigo || "").trim().toUpperCase();
    const nombreLimpio = String(datos.nombre || "").trim();
    const categoriaLimpia = String(datos.categoria || "").trim();
    const stockNum = Number(datos.stock);

    const errores = {};
    if (!codigoLimpio) {
        errores.codigo = "El código de la pieza no puede estar vacío.";
    } else if (piezas.some(function(p) { return p.codigo.toUpperCase() === codigoLimpio; })) {
        errores.codigo = "Ya existe una pieza registrada con ese código.";
    }
    if (!nombreLimpio) {
        errores.nombre = "El nombre de la pieza es obligatorio.";
    }
    if (!categoriaLimpia) {
        errores.categoria = "La categoría es obligatoria.";
    }
    if (datos.stock === "" || !Number.isInteger(stockNum) || stockNum < 0) {
        errores.stock = "El stock inicial debe ser un número entero mayor o igual a 0.";
    }

    if (Object.keys(errores).length > 0) {
        return { exito: false, errores: errores };
    }

    const nuevaPieza = {
        codigo: codigoLimpio,
        nombre: nombreLimpio,
        categoria: categoriaLimpia,
        stock: stockNum
    };
    piezas.push(nuevaPieza);
    guardarPiezas(piezas);
    return { exito: true, pieza: nuevaPieza };
}

function inicializarFormularioNuevaPieza() {
    const form = document.getElementById("formNuevaPieza");
    if (!form) {
        return;
    }
    form.addEventListener("submit", function(ev) {
        ev.preventDefault();
        const errCod = document.getElementById("errorNuevoCodigo");
        const errNom = document.getElementById("errorNuevoNombre");
        const errCat = document.getElementById("errorNuevaCategoria");
        const errStk = document.getElementById("errorNuevoStock");
        const alerta = document.getElementById("alertaNuevaPieza");

        errCod.style.display = "none";
        errNom.style.display = "none";
        errCat.style.display = "none";
        errStk.style.display = "none";
        alerta.style.display = "none";

        const res = crearPieza({
            codigo: document.getElementById("inputNuevoCodigo").value,
            nombre: document.getElementById("inputNuevoNombre").value,
            categoria: document.getElementById("selectNuevaCategoria").value,
            stock: document.getElementById("inputNuevoStock").value
        });

        if (!res.exito) {
            if (res.errores.codigo) { errCod.textContent = res.errores.codigo; errCod.style.display = "block"; }
            if (res.errores.nombre) { errNom.textContent = res.errores.nombre; errNom.style.display = "block"; }
            if (res.errores.categoria) { errCat.textContent = res.errores.categoria; errCat.style.display = "block"; }
            if (res.errores.stock) { errStk.textContent = res.errores.stock; errStk.style.display = "block"; }
            alerta.className = "alert alert-error";
            alerta.textContent = "No se pudo guardar la pieza. Revise los campos marcados.";
            alerta.style.display = "block";
            return;
        }

        alerta.className = "alert alert-success";
        alerta.textContent = "Pieza " + res.pieza.codigo + " (" + res.pieza.nombre + ") creada correctamente.";
        alerta.style.display = "block";
        form.reset();
        document.getElementById("inputNuevoStock").value = "0";
        if (typeof renderizarInventarioAlmacen === "function") {
            renderizarInventarioAlmacen();
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    inicializarFormularioNuevaPieza();
});

// === US-008-S2: Ajuste manual de stock (ajustarStock) ===
function ajustarStock(codigo, nuevaCantidad) {
    const piezas = obtenerPiezas();
    const pieza = piezas.find(function(p) { return p.codigo.toUpperCase() === String(codigo).toUpperCase(); });
    if (!pieza) {
        return { exito: false, mensaje: "La pieza indicada no existe." };
    }
    const cantNum = Number(nuevaCantidad);
    if (nuevaCantidad === "" || !Number.isInteger(cantNum) || cantNum < 0) {
        return { exito: false, mensaje: "El nuevo stock debe ser un número entero mayor o igual a 0." };
    }
    const diferencia = cantNum - pieza.stock;
    const res = modificarStock(codigo, diferencia);
    if (!res.exito) {
        return res;
    }
    return {
        exito: true,
        mensaje: "Stock de " + pieza.codigo + " actualizado a " + cantNum + " unidades."
    };
}

function renderizarInventarioAlmacen() {
    const tbody = document.getElementById("tbodyInventarioAlmacen");
    if (!tbody) {
        return;
    }
    const piezas = obtenerPiezas();
    tbody.innerHTML = "";
    piezas.forEach(function(p) {
        const tr = document.createElement("tr");
        tr.innerHTML =
            "<td>" + p.codigo + "</td>" +
            "<td>" + p.nombre + "</td>" +
            "<td>" + p.categoria + "</td>" +
            "<td>" + p.stock + "</td>" +
            "<td><input type=\"number\" id=\"inputStock_" + p.codigo + "\" min=\"0\" step=\"1\" value=\"" + p.stock + "\" style=\"width:100px;\"></td>" +
            "<td><button class=\"btn btn-sm\" onclick=\"manejarAjusteStock('" + p.codigo + "')\">Ajustar</button></td>";
        tbody.appendChild(tr);
    });
}

function manejarAjusteStock(codigo) {
    const input = document.getElementById("inputStock_" + codigo);
    const alerta = document.getElementById("alertaInventario");
    if (!input || !alerta) {
        return;
    }
    const res = ajustarStock(codigo, input.value);
    alerta.className = res.exito ? "alert alert-success" : "alert alert-error";
    alerta.textContent = res.mensaje;
    alerta.style.display = "block";
    renderizarInventarioAlmacen();
    renderizarPendientesAlmacen();
    renderizarAceptadasAlmacen();
}

document.addEventListener("DOMContentLoaded", function() {
    renderizarInventarioAlmacen();
});

// === US-009-S2: Cancelar una solicitud propia pendiente (cancelarSolicitud) ===
function cancelarSolicitud(id, usuario) {
    const solicitudes = obtenerSolicitudes();
    const sol = solicitudes.find(function(s) { return s.id === id; });
    if (!sol) {
        return { exito: false, mensaje: "La solicitud no existe." };
    }
    if (sol.solicitante !== usuario) {
        return { exito: false, mensaje: "Solo puedes cancelar tus propias solicitudes." };
    }
    if (sol.estado !== "Pendiente") {
        return { exito: false, mensaje: "Solo se pueden cancelar solicitudes en estado Pendiente." };
    }
    sol.estado = "Cancelada";
    guardarSolicitudes(solicitudes);
    return { exito: true, mensaje: "Solicitud " + id + " cancelada correctamente." };
}

function manejarCancelarSolicitud(id) {
    const res = cancelarSolicitud(id, USUARIO_ACTUAL);
    const alerta = document.getElementById("alertaMisSolicitudes");
    if (alerta) {
        alerta.className = res.exito ? "alert alert-success" : "alert alert-error";
        alerta.textContent = res.mensaje;
        alerta.style.display = "block";
    }
    renderizarMisSolicitudes();
}

// === US-010-S2: Motivo obligatorio al rechazar una solicitud ===
let solicitudEnRechazoId = null;

function rechazarSolicitudConMotivo(id, motivo) {
    const motivoLimpio = String(motivo || "").trim();
    if (!motivoLimpio) {
        return { exito: false, mensaje: "El motivo del rechazo no puede estar vacío." };
    }
    if (motivoLimpio.length > 200) {
        return { exito: false, mensaje: "El motivo del rechazo no puede superar los 200 caracteres." };
    }
    const solicitudes = obtenerSolicitudes();
    const sol = solicitudes.find(function(s) { return s.id === id; });
    if (!sol || sol.estado !== "Pendiente") {
        return { exito: false, mensaje: "La solicitud no está en estado Pendiente." };
    }
    sol.estado = "Rechazada";
    sol.motivoRechazo = motivoLimpio;
    guardarSolicitudes(solicitudes);
    return { exito: true, mensaje: "Solicitud " + id + " rechazada con motivo registrado." };
}

rechazarSolicitud = rechazarSolicitudConMotivo;

manejarRechazarSolicitud = function(id) {
    solicitudEnRechazoId = id;
    const modal = document.getElementById("modalRechazo");
    const input = document.getElementById("inputMotivoRechazo");
    const err = document.getElementById("errorMotivoRechazo");
    const lblId = document.getElementById("modalRechazoId");
    const contador = document.getElementById("contadorMotivo");
    if (!modal || !input) {
        return;
    }
    lblId.textContent = id;
    input.value = "";
    contador.textContent = "0";
    err.style.display = "none";
    modal.style.display = "flex";
};

function inicializarModalRechazo() {
    const modal = document.getElementById("modalRechazo");
    const input = document.getElementById("inputMotivoRechazo");
    const contador = document.getElementById("contadorMotivo");
    const btnCancelar = document.getElementById("btnCancelarModalRechazo");
    const btnConfirmar = document.getElementById("btnConfirmarModalRechazo");
    const err = document.getElementById("errorMotivoRechazo");
    if (!modal || !input) {
        return;
    }
    input.addEventListener("input", function() {
        contador.textContent = String(input.value.length);
    });
    btnCancelar.addEventListener("click", function() {
        modal.style.display = "none";
        solicitudEnRechazoId = null;
    });
    btnConfirmar.addEventListener("click", function() {
        const res = rechazarSolicitud(solicitudEnRechazoId, input.value);
        if (!res.exito) {
            err.textContent = res.mensaje;
            err.style.display = "block";
            return;
        }
        modal.style.display = "none";
        solicitudEnRechazoId = null;
        mostrarAlertaAlmacen(true, res.mensaje);
        renderizarPendientesAlmacen();
    });
}

document.addEventListener("DOMContentLoaded", function() {
    inicializarModalRechazo();
});

// === US-011-S2: Filtrar catálogo por categoría (obtenerCategorias y filtrarPiezas) ===
function obtenerCategorias() {
    const piezas = obtenerPiezas();
    const categorias = [];
    piezas.forEach(function(p) {
        if (p.categoria && !categorias.includes(p.categoria)) {
            categorias.push(p.categoria);
        }
    });
    return categorias.sort();
}

function filtrarPiezas(texto, categoria) {
    const porTexto = buscarPiezas(texto);
    if (!categoria || categoria === "Todas") {
        return porTexto;
    }
    return porTexto.filter(function(p) {
        return p.categoria === categoria;
    });
}

function inicializarFiltroCategorias() {
    const selectCat = document.getElementById("selectFiltroCategoria");
    const inputBusqueda = document.getElementById("inputBusqueda");
    const btnBuscar = document.getElementById("btnBuscar");
    if (!selectCat || !inputBusqueda) {
        return;
    }
    const categorias = obtenerCategorias();
    selectCat.innerHTML = '<option value="Todas">Todas</option>';
    categorias.forEach(function(cat) {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        selectCat.appendChild(opt);
    });

    const actualizar = function() {
        const filtradas = filtrarPiezas(inputBusqueda.value, selectCat.value);
        renderizarTablaCatalogo(filtradas);
    };
    selectCat.addEventListener("change", actualizar);
    inputBusqueda.addEventListener("input", actualizar);
    if (btnBuscar) {
        btnBuscar.addEventListener("click", actualizar);
    }
    actualizar();
}

document.addEventListener("DOMContentLoaded", function() {
    inicializarFiltroCategorias();
});
