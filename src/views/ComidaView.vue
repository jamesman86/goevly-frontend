<template>
  <div>
    <HeaderSection />

    <section class="category-hero comida-hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Comida típica en Santa Marta</h1>
        <p>Sabores del Caribe colombiano que no puedes perderte</p>
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
          <p class="empty-title">No hay restaurantes registrados aún</p>
          <p class="empty-sub">Pronto encontrarás los mejores sabores del Caribe colombiano aquí.</p>
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

export default {
  name: 'ComidaView',
  components: { HeaderSection, FooterSection, CardItem, ModalDetalle },
  data() {
    return {
      filtroActivo: 'todos',
      servicioSeleccionado: null,
      filtros: [
        { label: 'Todos', value: 'todos' },
        { label: 'Mariscos', value: 'mariscos' },
        { label: 'Típica', value: 'tipica' },
        { label: 'Vegetariana', value: 'vegetariana' },
        { label: 'Pescado', value: 'pescado' },
        { label: 'Jugos y bebidas', value: 'bebidas' }
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
      if (stored) {
        const businesses = JSON.parse(stored)
        this.cards = businesses
          .filter(b => b.categoria === 'comida')
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

.comida-hero {
  background-image: url('@/assets/comidatipica.jpg');
  background-position: center 45%;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(26, 15, 8, 0.72),
    rgba(26, 15, 8, 0.42)
  );
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

.hero-content p {
  font-size: 18px;
  opacity: 0.9;
}

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

.filter-btn:hover { border-color: #ff8c00; color: #ff8c00; }
.filter-btn.active { background: #ff8c00; border-color: #ff8c00; color: white; }

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
}

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
