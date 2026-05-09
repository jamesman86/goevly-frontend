<template>
  <section class="hero">
    <!-- CORREGIDO: clase hero-overlay (antes era heo-overlay, le faltaba la r) -->
    <div class="hero-overlay"></div>
    <div class="hero-content">
        <h1 class="hero-title">Tu aventura en el Caribe comienza aquí</h1>
        <p class="hero-subtitle">Tours, aventuras y sabores auténticos</p>
 
        <div class="buscador">
            <input 
            type="text" 
            v-model="searchQuery"
            placeholder="¿Qué quieres hacer?"
            
            @keyup.enter="handleSearch"
            >
            <button @click="handleSearch">Buscar</button>
        </div>
    </div>
  </section>
</template>
 
<script>
export default {
  name: 'HeroSection',
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    // CORREGIDO: nombre del método unificado a handleSearch
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.$emit('search', this.searchQuery)
        this.$router.push(`/buscar?q=${encodeURIComponent(this.searchQuery)}`)
      }
    },
    searchByTag(tag) {
      this.$router.push(`/categoria/${tag.toLowerCase()}`)
    }
  }
}
</script>
 
<style scoped>
.hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-image: url('@/assets/parque-tayrona.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
 
/* CORREGIDO: clase hero-overlay (antes era heo-overlay) */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.4));
}
 
.hero-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    padding: 0 20px;
}
 
.hero-title {
  font-size: 56px;
  font-weight: 800;
  color: white;
  text-shadow: 3px 3px 10px rgba(0,0,0,0.7);
  margin-bottom: 20px;
  letter-spacing: 1px;
}
 
.hero-subtitle {
  font-size: 24px;
  color: rgba(255,255,255,0.95);
  margin-bottom: 30px;
}
 
/* CORREGIDO: un solo bloque .buscador limpio, sin duplicados */
.buscador {
  margin-top: 25px;
  display: flex;
  justify-content: center;
  gap: 0;
}
 
.buscador input {
  flex: 1;
  padding: 16px 20px;
  border: none;
  border-radius: 50px 0 0 50px;
  font-size: 16px;
  outline: none;
  max-width: 350px;
}
 
.buscador button {
  padding: 16px 32px;
  border: none;
  border-radius: 0 50px 50px 0;
  background: #ffaa00;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 16px;
}
 
.buscador button:hover {
  background: #e69500;
}
 
.popular-tags {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
}
 
.popular-tags span {
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(5px);
  padding: 8px 16px;
  border-radius: 50px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}
 
.popular-tags span:hover {
  background: rgba(255,255,255,0.4);
  transform: translateY(-2px);
}
 
@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }
 
  .hero-subtitle {
    font-size: 18px;
  }
 
  .buscador {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
 
  .buscador input,
  .buscador button {
    border-radius: 50px;
    width: 100%;
    max-width: none;
  }
}
</style>