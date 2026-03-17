<template>
  <div class="producto">

    <!-- Imagen recortada -->
    <div class="thumb" @click="abrirImagen">
      <img :src="urlImg" :alt="nombre" />
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

  </div>

  <!-- Modal real pantalla completa -->
  <div v-if="imagenActiva" class="modal" @click="cerrarImagen">
    <img :src="imagenActiva" class="modal-img" />
  </div>

</template>

<script>
export default {
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
  },

  methods: {
    abrirImagen() {
      this.imagenActiva = this.urlImg
    },
    cerrarImagen() {
      this.imagenActiva = null
    }
  }
}
</script>

<style scoped>
.producto {
  width: 260px;
  background: white;
  border-radius: 14px;
  padding: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  transition: 0.3s;
}

.producto:hover {
  transform: translateY(-5px);
}

/* Imagen tarjeta */
.thumb {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 10px;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* recorta elegante */
}

/* Modal pantalla completa */
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
  object-fit: contain; /* 🔥 MUESTRA TODA LA IMAGEN */
}

.total {
  color: #27ae60;
  font-size: 18px;
}
</style>
