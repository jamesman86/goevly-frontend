<template>
  <section class="experiencias">
    <div class="container">
      <h2>Experiencias destacadas</h2>
      <p class="section-subtitle">Descubre las mejores actividades en Santa Marta</p>
 
      <!-- Sin servicios -->
      <div v-if="cards.length === 0" class="empty-state">
        <p>Aún no hay servicios registrados</p>
        <p class="empty-subtitle">Sé el primero en ofrecer tu experiencia.</p>
        <router-link to="/registro" class="btn-register-business">
          Registrar mi negocio
        </router-link>
      </div>
 
      <!-- Grid de cards -->
      <div v-else class="grid">
        <CardItem
          v-for="item in cards"
          :key="item.id"
          :card="item"
          @select="openModal"
        />
      </div>
 
      <div v-if="cards.length > 0" class="view-more">
        <button @click="viewAll" class="btn-view-more">Ver todas las experiencias</button>
      </div>
    </div>
 
    <!-- Modal de detalle -->
    <ModalDetalle
      v-if="selectedService"
      :service="selectedService"
      @close="selectedService = null"
    />
  </section>
</template>
 
<script>
import CardItem from './CardItem.vue'
import ModalDetalle from './ModalDetalle.vue'
 
export default {
  name: "CardsGrid",
  components: {
    CardItem,
    ModalDetalle
  },
  // REFACTORIZADO: ahora recibe los datos como prop desde HomeView
  props: {
    cards: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedService: null
    }
  },
  methods: {
    openModal(card) {
      this.selectedService = card
    },
    viewAll() {
      this.$router.push('/experiencias')
    }
  }
}
</script>
 
<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
 
.experiencias {
  padding: 60px 0;
  background: #f8f9fa;
}
 
h2 {
  text-align: center;
  font-size: 32px;
  color: #333;
  margin-bottom: 10px;
}
 
.section-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 40px;
  font-size: 18px;
}
 
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}
 
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}
 
.empty-state p {
  font-size: 18px;
  color: #666;
  margin-bottom: 10px;
}
 
.empty-subtitle {
  font-size: 14px !important;
  color: #999 !important;
  margin-bottom: 20px;
}
 
.btn-register-business {
  display: inline-block;
  padding: 12px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s;
}
 
.btn-register-business:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}
 
.view-more {
  text-align: center;
  margin-top: 50px;
}
 
.btn-view-more {
  padding: 12px 32px;
  background: transparent;
  border: 2px solid #0077cc;
  color: #0077cc;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}
 
.btn-view-more:hover {
  background: #0077cc;
  color: white;
  transform: translateY(-2px);
}
 
@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
 
@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
