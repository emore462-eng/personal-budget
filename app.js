// ── Datos iniciales ────────────────────────────────────────
let nombres = ['salario', 'renta', 'comida', 'transporte'];
let valores = [3500, -900, -850, -500];

// ── Ingreso de movimientos por consola ─────────────────────
let continuar = 'si';

while (continuar === 'si') {
  const nombre = prompt('Nombre del movimiento:');
  const tipo = prompt('Tipo (ingreso / gasto):');
  const monto = parseFloat(prompt('Monto:'));

  if (!nombre || (tipo !== 'ingreso' && tipo !== 'gasto') || isNaN(monto) || monto <= 0) {
    alert('Datos inválidos. Intenta de nuevo.');
  } else {
    const valor = tipo === 'ingreso' ? monto : -monto;
    nombres.push(nombre);
    valores.push(valor);
    console.log('Movimiento registrado.');
  }

  continuar = prompt('¿Deseas agregar otro movimiento? (si / no):');
  if (continuar === null) continuar = 'no';
}

// ── Función mostrarResumen ─────────────────────────────────
function mostrarResumen() {
  let totalIngresos = 0;
  let totalGastos = 0;

  console.log('\n===== DETALLE DE MOVIMIENTOS =====');

  for (let i = 0; i < nombres.length; i++) {
    const tipo = valores[i] > 0 ? 'Ingreso' : 'Gasto';
    console.log(`  ${tipo}: ${nombres[i]} → S/ ${valores[i].toFixed(2)}`);

    if (valores[i] > 0) {
      totalIngresos += valores[i];
    } else {
      totalGastos += valores[i];
    }
  }

  const balance = totalIngresos + totalGastos;

  console.log('\n===== DESGLOSE POR TIPO =====');
  console.log(`  Total ingresos : S/ ${totalIngresos.toFixed(2)}`);
  console.log(`  Total gastos   : S/ ${totalGastos.toFixed(2)}`);
  console.log(`  Balance final  : S/ ${balance.toFixed(2)}`);

  if (balance >= 0) {
    console.log('\n✅ Estás en positivo. ¡Buen trabajo!');
  } else {
    console.log('\n⚠️  Estás en negativo. Revisa tus gastos.');
  }
}

mostrarResumen();

// ── Ejemplos con functional-utils (array de prueba) ────────
const valoresPrueba = [3000, -45.50, 500, -30];

// Convertir a dólares (4 soles = 1 dólar)
const enDolares = valoresPrueba.map(valor => valor / 4);
console.log('\n-- Conversión a dólares --');
console.log(enDolares);
console.log(valoresPrueba);

// Solo ingresos y gastos con filter
const ingresos = valoresPrueba.filter(valor => valor > 0);
console.log('\n-- Ingresos --');
console.log(ingresos);

const gastos = valoresPrueba.filter(valor => valor < 0);
console.log('\n-- Gastos --');
console.log(gastos);

// Gastos grandes (mayor a 40 en valor absoluto)
const grandes = gastos.filter(gasto => gasto < -40);
console.log('\n-- Gastos grandes (> $40) --');
console.log(grandes);

// Primer gasto encontrado con find
const primerGasto = valoresPrueba.find(valor => valor < 0);
console.log('\n-- Primer gasto --');
console.log(primerGasto);

// Si no encuentra nada → undefined
const ingresoGigante = valoresPrueba.find(valor => valor > 100000);
console.log('\n-- Ingreso gigante (no existe) --');
console.log(ingresoGigante);

// ── Uso de functional-utils.js ─────────────────────────────
console.log('\n===== FUNCTIONAL UTILS =====');
console.log('Ingresos:', obtenerIngresos(valoresPrueba));
console.log('Gastos:', obtenerGastos(valoresPrueba));
console.log('Montos sin signo:', montosAbsolutos(valoresPrueba));
console.log('Primer gasto > $40:', buscarPrimerGastoMayor(valoresPrueba, 40));
console.log('Cantidad de gastos:', contarGastos(valoresPrueba));

// ── Saldo con reduce ───────────────────────────────────────
// FIX: había dos declaraciones de "saldo" (let y const) — se queda solo la funcional
const saldo = valores.reduce((acumulador, valor) => acumulador + valor, 0);
console.log('\n-- Saldo total --');
console.log('S/', saldo.toFixed(2));

// ── forEach sobre los movimientos reales ──────────────────
console.log('\n-- Todos los movimientos --');
valores.forEach((valor, indice) => {
  console.log(`Movimiento ${indice + 1}: ${nombres[indice]} → S/ ${valor.toFixed(2)}`);
});

// ── Reporte final con functional-utils ────────────────────
console.log('\n===== REPORTE FINAL =====');
imprimirReporte(nombres, valores);


