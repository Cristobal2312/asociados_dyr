<template>
  <div class="producto">
    
    <!-- Imagen recortada -->
    <div class="thumb" @click="imagenActiva = urlImg">
      <img :src="urlImg" alt="producto" />
    </div>

    <h3>{{ nombre }}</h3>

    <p class="precio">
      Precio por m²: <strong>${{ precioMetro }}</strong>
    </p>

    <div class="metros">
      <label>Metros cuadrados</label>
      <input type="number" v-model.number="metros" min="1" />
    </div>

    <p class="total">
      Total: <strong>${{ precioTotal }}</strong>
    </p>

    <!-- Modal imagen completa -->
    <div 
      class="image-modal" 
      :class="{ active: imagenActiva }"
      @click="imagenActiva = null"
    >
      <img :src="imagenActiva" />
    </div>

  </div>
</template>

<script>
export default {
  name: 'ProductoItem',

  props: {
    nombre: String,
    precioMetro: Number,
    urlImg: String
  },

  data() {
    return {
      metros: 1,
      imagenActiva: null
    }
  },

  computed: {
    precioTotal() {
      return this.metros * this.precioMetro
    }
  }
}
</script>

<style scoped>
.producto {
  width: 260px;
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  transition: transform 0.3s;
}

.producto:hover {
  transform: translateY(-5px);
}

/* Contenedor imagen */
.thumb {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
}

/* Imagen recortada profesional */
.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.4s ease;
}

.thumb:hover img {
  transform: scale(1.08);
}

h3 {
  margin: 10px 0;
}

.precio {
  color: #555;
}

.metros {
  margin: 10px 0;
}

input {
  width: 80px;
  padding: 4px;
  text-align: center;
}

.total {
  font-size: 18px;
  color: #27ae60;
}

/* MODAL */
.image-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s ease;
  z-index: 3000;
}

.image-modal.active {
  opacity: 1;
  visibility: visible;
}

.image-modal img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 15px;
  animation: zoomIn 0.3s ease;
}

@keyframes zoomIn {
  from { transform: scale(0.85); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>

