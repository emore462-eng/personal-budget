// ── Clase Movimiento ───────────────────────────────────────
class Movimiento {
  constructor(nombre, tipo, valor) {
    this.nombre = nombre;
    this.tipo   = tipo;
    this.valor  = valor;
    this.fecha  = new Date().toLocaleDateString();
  }

  esIngreso() {
    return this.tipo === 'ingreso';
  }

  esGasto() {
    return this.tipo === 'gasto';
  }

  datosMovimiento() {
    const signo = this.esIngreso() ? '+' : '-';
    return `${this.nombre} (${this.tipo}): ${signo}$${this.valor.toFixed(2)}`;
  }

  antiguedadEnDias() {
    const partes = this.fecha.split('/');
    const creado = new Date(partes[2], partes[1] - 1, partes[0]);
    const hoy    = new Date();
    return Math.floor((hoy - creado) / (1000 * 60 * 60 * 24));
  }

  esValido() {
    return (
      typeof this.nombre === 'string' && this.nombre.trim() !== '' &&
      (this.tipo === 'ingreso' || this.tipo === 'gasto') &&
      typeof this.valor === 'number' && this.valor > 0
    );
  }
}

// ── Clase Presupuesto ──────────────────────────────────────
class Presupuesto {
  constructor() {
    this.movimientos = [];
  }

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
      .reduce((acc, m) => acc + m.valor, 0);
  }

  totalGastos() {
    return this.obtenerGastos()
      .reduce((acc, m) => acc + m.valor, 0);
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

  topGastos(n) {
    return this.obtenerGastos()
      .sort((a, b) => b.valor - a.valor)
      .slice(0, n);
  }

  verificarLimites() {
    const ingresos = this.totalIngresos();
    if (ingresos === 0) return '⚠️ No hay ingresos registrados.';
    const porcentaje = (this.totalGastos() / ingresos) * 100;
    if (porcentaje >= 80) {
      return `⚠️Alerta: tus gastos son el ${porcentaje.toFixed(1)}% de tus ingresos.`;
    }
    return `✅ Gastos en ${porcentaje.toFixed(1)}% de ingresos. Todo en orden`;
  }
}
