// ── Funciones base ─────────────────────────────────────────
const obtenerIngresos = valores => valores.filter(valor => valor > 0);

const obtenerGastos = valores => valores.filter(valor => valor < 0);

const montosAbsolutos = valores => valores.map(valor => Math.abs(valor));

const buscarPrimerGastoMayor = (valores, monto) =>
  valores.find(valor => valor < -monto);

const calcularSaldo = valores =>
  valores.reduce((acumulador, valor) => acumulador + valor, 0);

const totalIngresos = valores =>
  obtenerIngresos(valores).reduce((acumulador, valor) => acumulador + valor, 0);

const totalGastos = valores =>
  obtenerGastos(valores).reduce((acumulador, valor) => acumulador + valor, 0);

const contarGastos = valores => valores.filter(valor => valor < 0).length;

// ── Composición + DRY ───────────────────────────
const promedioIngresos = valores => {
  const ingresos = obtenerIngresos(valores);
  if (ingresos.length === 0) return 0;
  return totalIngresos(valores) / ingresos.length;
};

// ── Reto: validarPresupuesto ───────────────────────────────
const validarPresupuesto = (valores, limite) =>
  Math.abs(totalGastos(valores)) <= limite;

// ── Logro 1: mediana ──────────────────────────────────────
const mediana = valores => {
  const ordenados = [...valores].sort((a, b) => a - b);
  const mid = Math.floor(ordenados.length / 2);
  return ordenados.length % 2 !== 0
    ? ordenados[mid]
    : (ordenados[mid - 1] + ordenados[mid]) / 2;
};

// ── Logro 1: desviación estándar ──────────────────────────
const desviacionEstandar = valores => {
  const promedio = calcularSaldo(valores) / valores.length;
  const diferencias = valores.map(valor => (valor - promedio) ** 2);
  const varianza = calcularSaldo(diferencias) / diferencias.length;
  return Math.sqrt(varianza);
};

// ── Logro 2: categorización por monto ────────────────────
const categorizarPorMonto = valores => ({
  bajo:  valores.filter(valor => Math.abs(valor) < 100),
  medio: valores.filter(valor => Math.abs(valor) >= 100 && Math.abs(valor) < 1000),
  alto:  valores.filter(valor => Math.abs(valor) >= 1000),
});

// ── Reporte ───────────────────────────────────────────────
const generarValoresReporte = valores => [
  valores.length,
  totalIngresos(valores),
  totalGastos(valores),
  calcularSaldo(valores),
];

const imprimirReporte = (nombres, valores) => {
  console.log('\n===== DETALLE DE MOVIMIENTOS =====');

  valores.forEach((valor, indice) => {
    const tipo = valor > 0 ? 'Ingreso' : 'Gasto';
    console.log(`  ${indice + 1}. ${nombres[indice]} (${tipo}): S/ ${Math.abs(valor).toFixed(2)}`);
  });

  const reporte = generarValoresReporte(valores);
  console.log('\n===== RESUMEN FINAL =====');
  console.log('  Total movimientos : ' + reporte[0]);
  console.log('  Total ingresos    : S/ ' + reporte[1].toFixed(2));
  console.log('  Total gastos      : S/ ' + Math.abs(reporte[2]).toFixed(2));
  console.log('  Saldo             : S/ ' + reporte[3].toFixed(2));
};