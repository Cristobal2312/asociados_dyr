<template>
  <MainNavbar />
  <main class="page-container">
    <router-view />
  </main>
</template>

<script>
import MainNavbar from './components/MainNavbar.vue'

export default {
  name: 'App',
  components: { MainNavbar }
}
</script>


<!-- styles moved to src/assets/css/styles.css -->