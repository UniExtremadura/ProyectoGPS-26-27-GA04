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
