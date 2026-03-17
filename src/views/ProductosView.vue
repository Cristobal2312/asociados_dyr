<template>
  <div class="productos-page">
    <h1>Todos los productos</h1>

    <div class="productos">
      <article
        v-for="producto in productos"
        :key="producto.id"
        class="producto"
        :aria-labelledby="'title-' + producto.id"
      >
        <!-- Imagen -->
        <div class="thumb" @click="abrirImagen(producto.img)">
          <img :src="producto.img" :alt="producto.nombre" />
        </div>

        <!-- 🔥 Viñeta debajo de la imagen -->
        <div class="hint">
          👁 Toque la imagen para más detalle visual
        </div>

        <div class="body">
          <h3 :id="'title-' + producto.id">
            {{ producto.nombre }}
          </h3>

          <p class="meta">
            {{ formatCurrency(producto.precioMetro) }}
            <span>/ m²</span>
          </p>

          <div class="calculadora">
            <label :for="'metros-' + producto.id">
              Metros cuadrados
            </label>

            <div class="input-row">
              <input
                type="number"
                :id="'metros-' + producto.id"
                v-model.number="producto.metros"
                min="0"
                step="0.1"
                inputmode="decimal"
              />
              <button
                class="clear"
                @click="producto.metros = 0"
              >
                ✕
              </button>
            </div>
          </div>

          <p class="total">
            <strong v-if="producto.metros > 0">
              {{ formatCurrency(producto.precioMetro * producto.metros) }}
            </strong>
            <strong v-else>
              {{ formatCurrency(producto.precioMetro) }}
            </strong>

            <span class="muted">
              {{ producto.metros > 0 ? ' / total' : ' / m²' }}
            </span>
          </p>
        </div>
      </article>
    </div>

    <!-- 🔥 Modal imagen completa -->
    <div v-if="imagenActiva" class="modal" @click="cerrarImagen">
      <img :src="imagenActiva" class="modal-img" />
    </div>

  </div>
</template>

<script>
import productosData from '../data/productos'

export default {
  name: 'ProductosView',

  data() {
    return {
      productos: productosData.map(p => ({ ...p, metros: 0 })),
      imagenActiva: null
    }
  },

  methods: {
    formatCurrency(value) {
      return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
      }).format(value)
    },

    abrirImagen(img) {
      this.imagenActiva = img
    },

    cerrarImagen() {
      this.imagenActiva = null
    }
  }
}
</script>

<style scoped>
.productos-page {
  padding: 28px 16px;
  color: var(--text);
  background: var(--bg);
  min-height: calc(100vh - var(--navbar-height));
  box-sizing: border-box;
}

h1 {
  margin: 0 0 20px;
  color: var(--text);
  font-size: 26px;
  font-weight: 800;
}

/* Grid */
.productos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

/* Card */
.producto {
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 520px;
  transition: transform .18s ease, box-shadow .18s ease;
}

[data-theme="dark"] .producto {
  background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.1));
  border: 1px solid rgba(255,255,255,0.18);
}

.producto:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 36px rgba(2,6,12,0.6);
}

/* Imagen grande */
.thumb {
  width: 100%;
  height: 320px;
  overflow: hidden;
  cursor: pointer;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform .3s ease;
}

.thumb:hover img {
  transform: scale(1.05);
}

/* 🔥 Viñeta debajo de la imagen */
.hint {
  font-size: 11px;
  text-align: center;
  padding: 8px;
  background: rgba(0,0,0,0.04);
  font-weight: 600;
  letter-spacing: .3px;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

[data-theme="dark"] .hint {
  background: rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.12);
}

/* Body */
.body {
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.body h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.meta {
  margin: 0;
  font-size: 14px;
  font-weight: 800;
}

.meta span {
  font-weight: 600;
  margin-left: 4px;
  opacity: 0.7;
}

/* Calculadora */
.calculadora label {
  font-size: 12px;
  margin-bottom: 5px;
  font-weight: 600;
  display: block;
}

.input-row {
  display: flex;
  gap: 6px;
  align-items: center;
}

.input-row input {
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.08);
  font-size: 14px;
}

.clear {
  background: transparent;
  border: 1px solid rgba(0,0,0,0.08);
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
}

/* Total */
.total {
  font-size: 16px;
  font-weight: 700;
}

.muted {
  font-size: 12px;
  opacity: 0.7;
}

/* Modal */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-img {
  max-width: 95vw;
  max-height: 95vh;
  object-fit: contain;
  border-radius: 14px;
}

/* Responsive */
@media (max-width: 760px) {
  .thumb { height: 260px; }
}
</style>
