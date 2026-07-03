// ── Modelo ─────────────────────────────────────────────────
const miPresupuesto = new Presupuesto();

// ── Captura de movimientos ─────────────────────────────────
function registrarMovimiento() {
  const nombre = prompt('Nombre del movimiento:');
  const tipo   = prompt('Tipo (ingreso / gasto):');
  const valor  = parseFloat(prompt('Monto:'));
 if (!nombre || (tipo !== 'ingreso' && tipo !== 'gasto') || isNaN(valor) || valor <= 0) {
     alert('Datos inválidos. Intenta de nuevo.');
    return;
  }

  // Crea instancia y la agrega (esValido() se verifica dentro de agregar)
  miPresupuesto.agregar(new Movimiento(nombre, tipo, valor));
  console.log('Movimiento registrado.');
}

let continuar = 'si';
while (continuar === 'si') 
  {
  registrarMovimiento();
  continuar = prompt('¿Registrar otro movimiento? (si / no):');
  if (continuar === null) continuar = 'no';
}

// ── Reporte con functional-utils ──────────────────────────
imprimirReporte(miPresupuesto.movimientos);
console.log('\nPromedio de ingresos : S/ ' + promedioIngresos(miPresupuesto.movimientos).toFixed(2));
console.log('Cantidad de gastos   : '     + contarGastos(miPresupuesto.movimientos));

// ── Validar presupuesto ────────────────────────────────────
const limite = 2000;
const ok = validarPresupuesto(miPresupuesto.movimientos, limite);
console.log(`¿Gastos dentro del límite de S/ ${limite}? ${ok ? '✅ Sí' : '⚠️ No'}`);

// ── Reporte OOP ────────────────────────────────────────────
console.log('\n===== RESUMEN OOP =====');
console.log(miPresupuesto.resumen());
console.log(miPresupuesto.verificarLimites());

// ── Reto: top 2 gastos más grandes ────────────────────────
console.log('\n===== TOP 2 GASTOS =====');
miPresupuesto.topGastos(2).forEach(m => console.log(' ', m.datosMovimiento()));

// ── Reto: agrupar por tipo ─────────────────────────────────
console.log('\n===== AGRUPADO POR TIPO =====');
const agrupado = agruparPorTipo(miPresupuesto.movimientos);
console.log('Ingresos:', agrupado.ingresos.map(m => m.nombre));
console.log('Gastos  :', agrupado.gastos.map(m => m.nombre));

// ── Logros: estadísticas y categorías ─────────────────────
console.log('\n===== ESTADÍSTICAS =====');
console.log('Mediana             : S/ ' + mediana(miPresupuesto.movimientos).toFixed(2));
console.log('Desviación estándar : S/ ' + desviacionEstandar(miPresupuesto.movimientos).toFixed(2));

console.log('\n===== CATEGORÍAS =====');
const cats = categorizarPorMonto(miPresupuesto.movimientos);
console.log('Bajo   (< S/100)  :', cats.bajo.map(m => m.nombre));
console.log('Medio  (< S/1000) :', cats.medio.map(m => m.nombre));
console.log('Alto   (≥ S/1000) :', cats.alto.map(m => m.nombre));

// ── Prueba buscarPorNombre y eliminar ──────────────────────
console.log('\n===== BÚSQUEDA Y ELIMINACIÓN =====');
const encontrado = miPresupuesto.buscarPorNombre('sal');
if (encontrado) console.log('Encontrado:', encontrado.datosMovimiento());

miPresupuesto.eliminar('salario');
console.log('Saldo tras eliminar salario: S/ ' + miPresupuesto.saldo().toFixed(2));
// ── Clase Movimiento ───────────────────────────────────────
class Movimiento {
  constructor(nombre, tipo, valor) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.valor = valor;
    this.fecha = new Date().toLocaleDateString();
  }

  esIngreso() {
    return this.tipo === 'ingreso';
  }

  esGasto() {
    return this.tipo === 'gasto';
  }

  datosMovimiento() {
    const signo = this.esIngreso() ? '+' : '-';
    return $; { this.nombre; } ($); { this.tipo; } $; { signo; } $$; { this.valor.toFixed(2); };
  }

  // Reto: días desde que se creó el movimiento hasta hoy
  antiguedadEnDias() {
    const partes = this.fecha.split('/');
    const creado = new Date(partes[2], partes[1] - 1, partes[0]);
    const hoy = new Date();
    const diff = hoy - creado;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  // Logro 2: valida que el movimiento tenga datos correctos
  esValido() {
    return (
      typeof this.nombre === 'string' && this.nombre.trim() !== '' &&
      (this.tipo === 'ingreso' || this.tipo === 'gasto') &&
      typeof this.valor === 'number' && this.valor > 0
    );
  }
}
