// ── Referencias al DOM ─────────────────────────────────────
const form  = document.getElementById('form-mov');
const lista = document.getElementById('lista');

// ── Instancia del presupuesto ──────────────────────────────
const miPresupuesto = new Presupuesto();

// ── Movimientos de ejemplo ─────────────────────────────────
miPresupuesto.agregar(new Movimiento('Salario',   'ingreso', 3000));
miPresupuesto.agregar(new Movimiento('Cena',      'gasto',   45.50));
miPresupuesto.agregar(new Movimiento('Freelance', 'ingreso', 500));

// ── Genera el HTML de un <li> ──────────────────────────────
function liHTML(m) {
  const ingreso = m.esIngreso();

  let caja, texto, signo;

  if (ingreso) {
    caja  = 'bg-green-50 border-green-500 dark:bg-green-900 dark:border-green-600';
    texto = 'text-green-700 dark:text-green-400';
    signo = '+';
  } else {
    caja  = 'bg-red-50 border-red-500 dark:bg-red-900 dark:border-red-600';
    texto = 'text-red-700 dark:text-red-400';
    signo = '-';
  }

  // Logro 3 — badge de categoría
  const badge = `<span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full ml-2">${m.tipo}</span>`;

  // antiguedadEnDias() — muestra días desde que se registró
  const dias = m.antiguedadEnDias();
  const antiguedad = `<span class="text-xs text-gray-400 dark:text-gray-500 ml-2">${dias === 0 ? 'hoy' : `hace ${dias} día${dias !== 1 ? 's' : ''}}`}</span>`;

  return `
    <li class="flex items-center justify-between p-3 border-l-4 rounded ${caja}">
      <span>
        <span class="font-medium text-gray-800 dark:text-white">${m.nombre}</span>
        ${badge}
        ${antiguedad}
      </span>
      <span class="font-semibold ${texto}">${signo}$${m.valor.toFixed(2)}</span>
    </li>`;
}

// ── Render: actualiza toda la UI ───────────────────────────
function render() {
  // Lista de movimientos
  lista.innerHTML = miPresupuesto.movimientos.map(liHTML).join('');

  // Saldo
  document.getElementById('saldo').textContent =
    '$' + miPresupuesto.saldo().toFixed(2);

  // Reto — cajitas ingresos y gastos
  document.getElementById('total-ingresos').textContent =
    '$' + miPresupuesto.totalIngresos().toFixed(2);
  document.getElementById('total-gastos').textContent =
    '$' + miPresupuesto.totalGastos().toFixed(2);

  // verificarLimites() — alerta visual sobre el presupuesto
  const mensaje   = miPresupuesto.verificarLimites();
  const esAlerta  = mensaje.startsWith('⚠️');
  const colorCaja = esAlerta
    ? 'bg-red-50 border-red-400 text-red-700 dark:bg-red-900 dark:border-red-600 dark:text-red-300'
    : 'bg-green-50 border-green-400 text-green-700 dark:bg-green-900 dark:border-green-600 dark:text-green-300';

  document.getElementById('alerta-limites').innerHTML = `
    <div class="p-4 border-l-4 rounded-lg text-sm font-medium ${colorCaja}">
      ${mensaje}
    </div>`;
}

// ── Escucha el formulario ──────────────────────────────────
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const tipo   = document.getElementById('tipo').value;
  const valor  = parseFloat(document.getElementById('monto').value);

  if (!nombre || isNaN(valor) || valor <= 0) {
    alert('Datos inválidos. Revisa el nombre y el monto.');
    return;
  }

  miPresupuesto.agregar(new Movimiento(nombre, tipo, valor));
  render();
  e.target.reset();
});

// ── Pinta al cargar ────────────────────────────────────────
render();