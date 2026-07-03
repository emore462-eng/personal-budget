// ── Clase Presupuesto ──────────────────────────────────────
class Presupuesto {
  constructor() {
    this.movimientos = [];
  }

  // Logro 2: valida antes de agregar
  agregar(movimiento) {
    if (!movimiento.esValido()) {
      console.warn('Movimiento inválido, no se agregó:', movimiento);
      return;
    }
    this.movimientos.push(movimiento);
  }

  eliminar(nombre) {
    this.movimientos = this.movimientos.filter(m => m.nombre !== nombre);
  }

  obtenerIngresos() {
    return this.movimientos.filter(m => m.esIngreso());
  }

  obtenerGastos() {
    return this.movimientos.filter(m => m.esGasto());
  }

  totalIngresos() {
    return this.obtenerIngresos()
      .reduce((acumulador, m) => acumulador + m.valor, 0);
  }

  totalGastos() {
    return this.obtenerGastos()
      .reduce((acumulador, m) => acumulador + m.valor, 0);
  }

  saldo() {
    return this.totalIngresos() - this.totalGastos();
  }

  buscarPorNombre(texto) {
    return this.movimientos.find(m =>
      m.nombre.toLowerCase().includes(texto.toLowerCase())
    );
  }

  resumen() {
    return {
      cantidad : this.movimientos.length,
      ingresos : this.totalIngresos(),
      gastos   : this.totalGastos(),
      saldo    : this.saldo()
    };
  }

  // Reto: top N gastos más grandes
  topGastos(n) {
    return this.obtenerGastos()
      .sort((a, b) => b.valor - a.valor)
      .slice(0, n);
  }

  // Logro 1: avisa si los gastos superan el 80% de los ingresos
  verificarLimites() {
    const ingresos = this.totalIngresos();
    if (ingresos === 0) return '⚠️ No hay ingresos registrados.';
    const porcentaje = (this.totalGastos() / ingresos) * 100;
    if (porcentaje >= 80) {
      const newLocal = '⚠️ Alerta: tus gastos son el ' + porcentaje.toFixed(1) + '% de tus ingresos.';
      return newLocal;
    }
    return '✅ Gastos en ' + porcentaje.toFixed(1) + '% de ingresos. Todo en orden.';
  }
}