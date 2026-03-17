<template>
  <header class="navbar" role="banner">
    <div class="logo">Asociación D y R</div>

    <div class="controls">
      <!-- Botón hamburguesa -->
      <button
        class="menu-btn"
        @click="open = !open"
        :aria-expanded="String(open)"
        aria-controls="main-navigation"
        aria-label="Abrir menú"
      >
        <span class="hamburger"></span>
      </button>
    </div>

    <!-- Navegación -->
    <nav
      id="main-navigation"
      class="nav-links"
      :class="{ open }"
      role="navigation"
      aria-label="Menú principal"
    >
      <ul>
        <li>
          <router-link class="link" :to="{ name: 'home' }" @click="close">
            Inicio
          </router-link>
        </li>
        <li>
          <router-link class="link" :to="{ name: 'productos' }" @click="close">
            Productos
          </router-link>
        </li>
        <li>
          <router-link class="link" :to="{ name: 'contacto' }" @click="close">
            Contacto
          </router-link>
        </li>

        <!-- Toggle tema -->
        <li class="nav-toggle">
          <button
            class="theme-toggle"
            @click="toggleTheme"
            :aria-pressed="theme === 'dark'"
            :aria-label="theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
          >
            <svg
              v-if="theme === 'dark'"
              class="icon"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              />
            </svg>

            <svg
              v-else
              class="icon"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.8 1.8-1.8zM1 13h3v-2H1v2zm10 9h2v-3h-2v3zm7.03-3.03l1.79 1.79 1.41-1.41-1.79-1.79-1.41 1.41zM20 13v-2h3v2h-3zM4.22 19.78l1.79-1.79-1.41-1.41-1.79 1.79 1.41 1.41zM12 6a6 6 0 100 12 6 6 0 000-12z"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MainNavbar',
  data() {
    return {
      open: false,
      theme: 'light'
    }
  },
  mounted() {
    this.theme =
      document.documentElement.getAttribute('data-theme') ||
      localStorage.getItem('theme') ||
      'light'
  },
  methods: {
    close() {
      this.open = false
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', this.theme)
      localStorage.setItem('theme', this.theme)
    }
  }
}
</script>
