<template>
  <div>
    <HeaderSection />
 
    <section class="buscar-hero">
      <div class="container">
        <div class="search-bar">
          <input
            type="text"
            v-model="query"
            placeholder="¿Qué quieres hacer en Santa Marta?"
            @keyup.enter="buscar"
          >
          <button @click="buscar">Buscar</button>
        </div>
      </div>
    </section>
 
    <section class="resultados-section">
      <div class="container">
 
        <!-- Encabezado de resultados -->
        <div class="resultados-header" v-if="query">
          <h2 v-if="resultados.length > 0">
            {{ resultados.length }} resultado{{ resultados.length !== 1 ? 's' : '' }} para
            <span class="query-highlight">"{{ query }}"</span>
          </h2>
          <h2 v-else>
            No encontramos resultados para
            <span class="query-highlight">"{{ query }}"</span>
          </h2>
        </div>
 
        <!-- Filtro por categoría -->
        <div class="filters" v-if="resultados.length > 0">
          <button
            v-for="filtro in filtros"
            :key="filtro.value"
            :class="['filter-btn', { active: filtroActivo === filtro.value }]"
            @click="filtroActivo = filtro.value"
          >
            {{ filtro.label }}
            <span class="filter-count">{{ contarPorCategoria(filtro.value) }}</span>
          </button>
        </div>
 
        <!-- Grid de resultados -->
        <div class="grid" v-if="resultadosFiltrados.length > 0">
          <CardItem
            v-for="item in resultadosFiltrados"
            :key="item.id"
            :card="item"
            @select="servicioSeleccionado = item"
          />
        </div>
 
        <!-- Sin resultados -->
        <div v-else-if="query && resultados.length === 0" class="empty-state">
          <p>No encontramos experiencias con ese nombre</p>
          <p class="empty-sub">Intenta con: Tours, Minca, Tayrona, Playa, Comida...</p>
          <div class="sugerencias">
            <span
              v-for="tag in sugerencias"
              :key="tag"
              class="tag"
              @click="buscarTag(tag)"
            >
              {{ tag }}
            </span>
          </div>
        </div>
 
        <!-- Estado inicial sin búsqueda -->
        <div v-else-if="!query" class="empty-state">
          <p>Escribe algo para buscar experiencias en Santa Marta</p>
        </div>
 
      </div>
    </section>
 
    <ModalDetalle
      v-if="servicioSeleccionado"
      :service="servicioSeleccionado"
      @close="servicioSeleccionado = null"
    />
 
    <FooterSection />
  </div>
</template>
 
<script>
import HeaderSection from '@/components/HeaderSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import CardItem from '@/components/CardItem.vue'
import ModalDetalle from '@/components/ModalDetalle.vue'
import { negocios as mockNegocios } from '@/data/mockData.js'
 
export default {
  name: 'BuscarView',
  components: { HeaderSection, FooterSection, CardItem, ModalDetalle },
  data() {
    return {
      query: '',
      filtroActivo: 'todos',
      servicioSeleccionado: null,
      resultados: [],
      todosLosNegocios: [],
      filtros: [
        { label: 'Todos', value: 'todos' },
        { label: 'Tours', value: 'tours' },
        { label: 'Guías', value: 'guias' },
        { label: 'Comida', value: 'comida' },
        { label: 'Transporte', value: 'transporte' }
      ],
      sugerencias: ['Tours', 'Tayrona', 'Minca', 'Playa', 'Snorkel', 'Lancha', 'Comida']
    }
  },
  computed: {
    resultadosFiltrados() {
      if (this.filtroActivo === 'todos') return this.resultados
      return this.resultados.filter(r => r.category === this.filtroActivo)
    }
  },
  mounted() {
    this.cargarNegocios()
    // Leer el query de la URL al entrar
    const q = this.$route.query.q
    if (q) {
      this.query = q
      this.buscar()
    }
  },
  // Detectar cambios en la URL (si buscan desde el hero)
  watch: {
    '$route.query.q'(nuevoQuery) {
      if (nuevoQuery) {
        this.query = nuevoQuery
        this.buscar()
      }
    }
  },
  methods: {
    cargarNegocios() {
      // Combinar negocios del localStorage con el mockData
      let todos = [...mockNegocios]
      const stored = localStorage.getItem('businesses')
      if (stored) {
        const businesses = JSON.parse(stored)
        const mapeados = businesses.map(b => ({
          id: b.id,
          title: b.nombre,
          category: b.categoria,
          description: b.descripcion,
          imagen: b.imagen,
          ubicacion: b.direccion,
          horario: b.horario,
          telefono: b.telefono,
          price: b.precio,
          rating: b.calificacion || 4.0
        }))
        todos = [...todos, ...mapeados]
      }
      this.todosLosNegocios = todos
    },
    buscar() {
      if (!this.query.trim()) return
 
      // Actualizar la URL con el query
      this.$router.replace({ path: '/buscar', query: { q: this.query } })
 
      const termino = this.query.toLowerCase().trim()
 
      // Buscar en título, descripción, categoría y ubicación
      this.resultados = this.todosLosNegocios.filter(n =>
        n.title?.toLowerCase().includes(termino) ||
        n.description?.toLowerCase().includes(termino) ||
        n.category?.toLowerCase().includes(termino) ||
        n.ubicacion?.toLowerCase().includes(termino)
      )
 
      // Resetear filtro de categoría
      this.filtroActivo = 'todos'
    },
    buscarTag(tag) {
      this.query = tag
      this.buscar()
    },
    contarPorCategoria(categoria) {
      if (categoria === 'todos') return this.resultados.length
      return this.resultados.filter(r => r.category === categoria).length
    }
  }
}
</script>
 
<style scoped>
.buscar-hero {
  background: #0077cc;
  padding: 50px 20px 40px;
  margin-top: 70px;
}
 
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
 
.search-bar {
  display: flex;
  max-width: 680px;
  margin: 0 auto;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}
 
.search-bar input {
  flex: 1;
  padding: 18px 24px;
  border: none;
  font-size: 16px;
  outline: none;
  font-family: inherit;
}
 
.search-bar button {
  padding: 18px 32px;
  background: #ffaa00;
  border: none;
  color: white;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  font-family: inherit;
}
 
.search-bar button:hover {
  background: #e69500;
}
 
/* Resultados */
.resultados-section {
  padding: 50px 0;
  background: #f8f9fa;
  min-height: 60vh;
}
 
.resultados-header {
  margin-bottom: 28px;
}
 
.resultados-header h2 {
  font-size: 22px;
  color: #333;
  font-weight: 500;
}
 
.query-highlight {
  color: #0077cc;
  font-weight: 700;
}
 
/* Filtros */
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 36px;
  flex-wrap: wrap;
}
 
.filter-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 50px;
  border: 2px solid #ddd;
  background: white;
  color: #555;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.25s;
  font-family: inherit;
}
 
.filter-btn:hover {
  border-color: #0077cc;
  color: #0077cc;
}
 
.filter-btn.active {
  background: #0077cc;
  border-color: #0077cc;
  color: white;
}
 
.filter-count {
  background: rgba(0,0,0,0.1);
  border-radius: 50px;
  padding: 1px 7px;
  font-size: 12px;
}
 
.filter-btn.active .filter-count {
  background: rgba(255,255,255,0.25);
}
 
/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}
 
/* Empty state */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}
 
.empty-icon {
  font-size: 52px;
  margin-bottom: 20px;
}
 
.empty-state p {
  font-size: 18px;
  color: #888;
  margin-bottom: 8px;
}
 
.empty-sub {
  font-size: 14px !important;
  color: #bbb !important;
  margin-bottom: 24px;
}
 
.sugerencias {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}
 
.tag {
  padding: 8px 20px;
  background: white;
  border: 2px solid #ddd;
  border-radius: 50px;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  transition: all 0.25s;
  font-weight: 600;
}
 
.tag:hover {
  border-color: #0077cc;
  color: #0077cc;
}
 
@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
 
@media (max-width: 600px) {
  .grid { grid-template-columns: 1fr; }
  .search-bar { border-radius: 12px; }
  .search-bar input,
  .search-bar button { border-radius: 0; }
}
</style>
