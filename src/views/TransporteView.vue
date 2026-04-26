<template>
  <div>
    <HeaderSection />

    <section class="category-hero transporte-hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Transporte en Santa Marta</h1>
        <p>Chivas rumberas, lanchas, taxis y más para moverte por el Caribe</p>
      </div>
    </section>

    <section class="category-section">
      <div class="container">

        <div class="filters">
          <button
            v-for="filtro in filtros"
            :key="filtro.value"
            :class="['filter-btn', { active: filtroActivo === filtro.value }]"
            @click="filtroActivo = filtro.value"
          >
            {{ filtro.label }}
          </button>
        </div>

        <div class="grid" v-if="cardsFiltradas.length > 0">
          <CardItem
            v-for="item in cardsFiltradas"
            :key="item.id"
            :card="item"
            @select="servicioSeleccionado = item"
          />
        </div>

        <div v-else class="empty-state">
          <p class="empty-title">No hay servicios de transporte registrados aún</p>
          <p class="empty-sub">Pronto encontrarás chivas rumberas, lanchas, taxis y más opciones para moverte por Santa Marta.</p>
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
  name: 'TransporteView',
  components: { HeaderSection, FooterSection, CardItem, ModalDetalle },
  data() {
    return {
      filtroActivo: 'todos',
      servicioSeleccionado: null,
      filtros: [
        { label: 'Todos', value: 'todos' },
        { label: 'Lancha', value: 'lancha' },
        { label: 'Chiva rumbera', value: 'chiva' },
        { label: 'Taxi', value: 'taxi' },
        { label: 'Mototaxi', value: 'mototaxi' },
        { label: 'Van / Buseta', value: 'van' },
        { label: 'Traslado privado', value: 'traslado' }
      ],
      cards: []
    }
  },
  computed: {
    cardsFiltradas() {
      if (this.filtroActivo === 'todos') return this.cards
      return this.cards.filter(c => c.subcategoria === this.filtroActivo)
    }
  },
  mounted() {
    this.cargarCards()
  },
  methods: {
    cargarCards() {
      const stored = localStorage.getItem('businesses')
      let todos = []
      if (stored) {
        const businesses = JSON.parse(stored)
        todos = businesses
          .filter(b => b.categoria === 'transporte')
          .map(b => ({
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
      }
      const mock = mockNegocios.filter(n => n.category === 'transporte')
      this.cards = [...todos, ...mock]
    }
  }
}
</script>

<style scoped>
.category-hero {
  position: relative;
  height: 40vh;
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-size: cover;
  background-position: center;
  margin-top: 70px;
}

.transporte-hero {
  background-image: url('@/assets/tourslancha.jpeg');
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 50, 100, 0.6);
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 10px;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.6);
}

.hero-content p { font-size: 18px; opacity: 0.9; }

.category-section {
  padding: 50px 0;
  background: #f8f9fa;
  min-height: 50vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.filters {
  display: flex;
  gap: 12px;
  margin-bottom: 36px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 8px 22px;
  border-radius: 50px;
  border: 2px solid #ddd;
  background: white;
  color: #555;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.25s;
}

.filter-btn:hover { border-color: #0077cc; color: #0077cc; }
.filter-btn.active { background: #0077cc; border-color: #0077cc; color: white; }

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

.empty-state { text-align: center; padding: 80px 20px; }
.empty-state p { font-size: 18px; color: #888; margin-bottom: 8px; }
.empty-sub { font-size: 14px !important; color: #bbb !important; margin-bottom: 20px; }



.empty-icon { font-size: 48px; margin-bottom: 12px; }
.empty-title { font-size: 18px; font-weight: 600; color: #555; margin-bottom: 8px; }
.empty-sub { font-size: 14px; color: #aaa; max-width: 320px; margin: 0 auto; line-height: 1.6; }

@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
  .hero-content h1 { font-size: 30px; }
}
@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
</style>
