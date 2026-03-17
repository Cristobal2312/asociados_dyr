<template>
  <div class="home">
    <section class="hero" role="region" aria-label="Hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Asociación D y R</h1>
        <p>Soluciones inmobiliarias modernas. Cotiza tu inversión por metro cuadrado.</p>
        <router-link :to="{ name: 'productos' }" class="cta">Cotizar ahora</router-link>
      </div>
    </section>

    <section class="productos-section" aria-labelledby="prod-title">
      <h2 id="prod-title">Productos Destacados</h2>
      <div class="productos">
        <article v-for="producto in productos.slice(0,3)" :key="producto.id" class="producto">
          <div class="thumb">
            <img :src="producto.img" :alt="producto.nombre" />
          </div>
          <div class="info">
            <h3>{{ producto.nombre }}</h3>
            <p class="price">${{ producto.precioMetro }} <span>/ m²</span></p>
            <router-link :to="{ name: 'productos' }" class="btn-sm">Ver detalles</router-link>
          </div>
        </article>
      </div>
      <router-link to="/productos" class="ver-mas">Ver todos los productos</router-link>
    </section>
  </div>
</template>

<script>
import productosData from '../data/productos'

export default {
  name: 'HomeView',
  data() { return { productos: productosData } }
}
</script>

<style scoped>
/* Use global navbar spacing (no extra padding here) */
.home { padding-top: 0; }

/* Ensure hero sits directly below navbar and fills remaining viewport */
.hero {
  min-height: calc(100vh - var(--navbar-height));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)),
              url('https://i.pinimg.com/1200x/ee/17/fa/ee17fae2b964464f236f4272e28fcfdb.jpg') center/cover no-repeat;
  color: var(--text);
  padding: 32px 16px;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 0 12px 20px;
  overflow: hidden;
}

/* rest of styles unchanged (cta, productos, cards...) */
.hero-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(2,6,12,0.45), rgba(0,0,0,0.55)); pointer-events: none; mix-blend-mode: multiply; }
.hero-content { position: relative; max-width: 900px; text-align: left; z-index: 2; background: rgba(255,255,255,0.03); padding: 18px; border-radius: 8px; backdrop-filter: blur(4px); }
.hero h1 { margin: 0 0 8px; font-size: 34px; font-weight: 800; color: #ffffff; }
.hero p { margin: 0 0 14px; color: #ffffff; font-size: 17px; }

.cta { display: inline-block; background: linear-gradient(90deg,var(--accent),#7c4dff); color: var(--surface); padding: 10px 16px; border-radius: 10px; font-weight: 800; text-decoration: none; box-shadow: 0 8px 24px rgba(124,77,255,0.12); transition: transform .15s ease, box-shadow .15s ease; }
.cta:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(124,77,255,0.16); }

/* Productos section & cards (keep previous styles) */
.productos-section { margin: 24px 12px; padding: 28px; background: transparent; color: var(--text); border-radius: 10px; }
.productos-section h2 { margin: 0 0 14px; font-size: 24px; }
.productos { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 14px; }
.producto { background: #ffffff; border: 1px solid rgba(0,0,0,0.15); padding: 12px; border-radius: 10px; box-shadow: 0 8px 18px rgba(2,6,12,0.5); display: flex; flex-direction: column; gap: 10px; }
[data-theme="dark"] .producto { background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.1)); border: 1px solid rgba(255,255,255,0.18); }
.thumb { width: 100%; height: 140px; overflow: hidden; border-radius: 8px; background: linear-gradient(135deg, #e8e8e8, #f0f0f0); }
[data-theme="dark"] .thumb { background: linear-gradient(135deg, #1a1f28, #0f1520); }
.thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.info h3 { margin: 0; font-size: 17px; color: var(--text); }
.price { margin: 6px 0; font-weight: 800; color: var(--text); }
.btn-sm { display: inline-block; margin-top: 6px; padding: 8px 10px; border-radius: 8px; background: rgba(255,255,255,0.03); color: var(--text); text-decoration: none; font-weight: 700; transition: background .12s ease, transform .12s ease; }
.ver-mas { display: inline-block; margin-top: 10px; font-weight: 700; color: var(--accent); text-decoration: none; }

@media (max-width: 900px) {
  .hero h1 { font-size: 30px; }
  .hero p { font-size: 16px; }
  .hero { padding: 28px 12px; margin: 0 10px 16px; }
}
@media (max-width: 520px) {
  .hero-content { padding: 14px; text-align: center; }
  .cta { width: 100%; text-align: center; }
  .thumb { height: 160px; }
}
/* CTA blanco en modo oscuro */
[data-theme="dark"] .cta {
  color: #ffffff;
}

</style>
/* End of file HomeView.vue */