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
            "<td><span class=\"badge " + badgeClass + "\">" + badgeText + "</span></td>";
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
