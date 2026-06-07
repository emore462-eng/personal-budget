let nombres = ['salario', 'renta', 'comida', 'transporte'];
let valores = [3500, -800, -700, -400];

let continuar = 'si';

while (continuar === 'si') {
  // Captura de datos
  const nombre = prompt('Nombre del movimiento:');
  const tipo = prompt('Tipo (ingreso / gasto):');
  const monto = parseFloat(prompt('Monto:'));

  // Validación
  if (!nombre || (tipo !== 'ingreso' && tipo !== 'gasto') || isNaN(monto) || monto <= 0) {
    alert('Datos inválidos. Intenta de nuevo.');
  } else {
    // Calcular el valor con signo
    let valor;
    if (tipo === 'ingreso') {
      valor = monto;
    } else {
      valor = -monto;
    }

    // Guardar en AMBOS arrays — siempre juntos
    nombres.push(nombre);
    valores.push(valor);

    console.log('Movimiento registrado.');
    console.log('Nombres:', nombres);
    console.log('Valores:', valores);
  }

  // Preguntar si continuar
  continuar = prompt('¿Deseas agregar otro movimiento? (si / no):');
  if (continuar === null) continuar = 'no'; // Si cancela el prompt
}

// ── Resumen final ──────────────────────────────────────────
const totalIngresos = valores
  .filter(v => v > 0)
  .reduce((acc, v) => acc + v, 0);

const totalGastos = valores
  .filter(v => v < 0)
  .reduce((acc, v) => acc + v, 0);

const balance = totalIngresos + totalGastos;

console.log('\n===== RESUMEN FINAL =====');
console.log('Movimientos registrados:');
nombres.forEach((n, i) => {
  const tipo = valores[i] >= 0 ? 'Ingreso' : 'Gasto';
  console.log(`  ${tipo}: ${n} → S/ ${valores[i].toFixed(2)}`);
});

console.log(`\nTotal ingresos : S/ ${totalIngresos.toFixed(2)}`);
console.log(`Total gastos   : S/ ${totalGastos.toFixed(2)}`);
console.log(`Balance final  : S/ ${balance.toFixed(2)}`);

if (balance >= 0) {
  console.log('✅ Estás en positivo. ¡Buen trabajo!');
} else {
  console.log('⚠️  Estás en negativo. Revisa tus gastos.');
}