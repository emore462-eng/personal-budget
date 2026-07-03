// ── Funciones base (ahora operan sobre array de objetos) ───
const obtenerIngresos = movimientos =>
  movimientos.filter(m => m.tipo === 'ingreso');

const obtenerGastos = movimientos =>
  movimientos.filter(m => m.tipo === 'gasto');

// montosAbsolutos queda eliminada: valor ya es siempre positivo

const buscarPrimerGastoMayor = (movimientos, monto) =>
  obtenerGastos(movimientos).find(m => m.valor > monto);

const calcularSaldo = movimientos =>
  totalIngresos(movimientos) - totalGastos(movimientos);

const totalIngresos = movimientos =>
  obtenerIngresos(movimientos).reduce((acc, m) => acc + m.valor, 0);

const totalGastos = movimientos =>
  obtenerGastos(movimientos).reduce((acc, m) => acc + m.valor, 0);

const contarGastos = movimientos =>
  obtenerGastos(movimientos).length;

// ── Composición + DRY ──────────────────────────────────────
const promedioIngresos = movimientos => {
  const ingresos = obtenerIngresos(movimientos);
  if (ingresos.length === 0) return 0;
  return totalIngresos(movimientos) / ingresos.length;
};

// ── Reto C06: validar presupuesto ──────────────────────────
const validarPresupuesto = (movimientos, limite) =>
  totalGastos(movimientos) <= limite;

// ── Reto C07 P1: agrupar por tipo ─────────────────────────
const agruparPorTipo = movimientos =>
  movimientos.reduce((acc, m) => {
    if (m.tipo === 'ingreso') {
      acc.ingresos.push(m);
    } else {
      acc.gastos.push(m);
    }
    return acc;
  }, { ingresos: [], gastos: [] });

// ── Logro 1: estadísticas ──────────────────────────────────
const mediana = movimientos => {
  const vals = movimientos.map(m => m.valor).sort((a, b) => a - b);
  const mid  = Math.floor(vals.length / 2);
  return vals.length % 2 !== 0
    ? vals[mid]
    : (vals[mid - 1] + vals[mid]) / 2;
};

const desviacionEstandar = movimientos => {
  const vals     = movimientos.map(m => m.valor);
  const promedio = vals.reduce((a, b) => a + b, 0) / vals.length;
  const varianza = vals.reduce((acc, v) => acc + (v - promedio) ** 2, 0) / vals.length;
  return Math.sqrt(varianza);
};

// ── Logro 2: categorización por monto ─────────────────────
const categorizarPorMonto = movimientos => ({
  bajo  : movimientos.filter(m => m.valor < 100),
  medio : movimientos.filter(m => m.valor >= 100 && m.valor < 1000),
  alto  : movimientos.filter(m => m.valor >= 1000),
});

// ── Reporte ────────────────────────────────────────────────
const generarValoresReporte = movimientos => [
  movimientos.length,
  totalIngresos(movimientos),
  totalGastos(movimientos),
  calcularSaldo(movimientos),
];

const imprimirReporte = movimientos => {
  console.log('\n===== DETALLE DE MOVIMIENTOS =====');

  movimientos.forEach((m, indice) => {
    console.log(`  ${indice + 1}. ${m.datosMovimiento()}`);
  });

  const reporte = generarValoresReporte(movimientos);
  console.log('\n===== RESUMEN FINAL =====');
  console.log('  Total movimientos : ' + reporte[0]);
  console.log('  Total ingresos    : S/ ' + reporte[1].toFixed(2));
  console.log('  Total gastos      : S/ ' + reporte[2].toFixed(2));
  console.log('  Saldo             : S/ ' + reporte[3].toFixed(2));
};