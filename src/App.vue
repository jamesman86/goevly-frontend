<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: 'Poppins', sans-serif;
}

#app {
  min-height: 100vh;
}

/* Clases utilitarias para compensar el header fijo */
.page-with-header {
  padding-top: 70px;
}
</style>