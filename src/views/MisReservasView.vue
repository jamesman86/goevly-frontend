<template>
  <div>
    <HeaderSection />

    <main class="reservas-page">
      <section class="reservas-header">
        <h1>Mis Reservas</h1>
        <p>Consulta las experiencias que separaste en Goevly.</p>
      </section>

      <section class="reservas-container">
        <div v-if="reservations.length === 0" class="empty-state">
          <h2>Aun no tienes reservas</h2>
          <p>Cuando reserves una experiencia, aparecera aqui.</p>
          <router-link to="/" class="btn-primary">Explorar experiencias</router-link>
        </div>

        <div v-else class="reservas-grid">
          <article v-for="reservation in reservations" :key="reservation.id" class="reserva-card">
            <div>
              <span class="status">{{ reservation.status || 'pendiente' }}</span>
              <h2>{{ reservation.serviceName }}</h2>
              <p class="date">Fecha de reserva: {{ reservation.date }}</p>
            </div>
            <p class="price">{{ formatPrice(reservation.price) }}</p>
          </article>
        </div>
      </section>
    </main>

    <FooterSection />
  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue'
import FooterSection from '@/components/FooterSection.vue'

export default {
  name: 'MisReservasView',
  components: { HeaderSection, FooterSection },
  data() {
    return {
      reservations: []
    }
  },
  mounted() {
    this.loadReservations()
  },
  methods: {
    loadReservations() {
      this.reservations = JSON.parse(localStorage.getItem('reservations') || '[]')
    },
    formatPrice(price) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(price || 0)
    }
  }
}
</script>

<style scoped>
.reservas-page {
  min-height: 75vh;
  padding: 110px 20px 70px;
  background: #f8f9fa;
}

.reservas-header {
  max-width: 1000px;
  margin: 0 auto 30px;
}

.reservas-header h1 {
  margin: 0 0 8px;
  color: #1a1a2e;
  font-size: 34px;
}

.reservas-header p {
  margin: 0;
  color: #666;
}

.reservas-container {
  max-width: 1000px;
  margin: 0 auto;
}

.empty-state {
  background: white;
  border-radius: 14px;
  padding: 45px 25px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
}

.empty-state h2 {
  margin: 0 0 10px;
  color: #333;
}

.empty-state p {
  color: #666;
  margin-bottom: 24px;
}

.btn-primary {
  display: inline-block;
  padding: 12px 26px;
  border-radius: 25px;
  background: #0077cc;
  color: white;
  text-decoration: none;
  font-weight: 700;
}

.reservas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
}

.reserva-card {
  background: white;
  border-radius: 14px;
  padding: 22px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
}

.status {
  display: inline-block;
  padding: 5px 12px;
  border-radius: 20px;
  background: #fff3cd;
  color: #8a6200;
  font-size: 12px;
  font-weight: 700;
  text-transform: capitalize;
}

.reserva-card h2 {
  color: #333;
  font-size: 20px;
  margin: 14px 0 8px;
}

.date {
  color: #666;
  margin: 0;
}

.price {
  color: #ffaa00;
  font-size: 22px;
  font-weight: 800;
  margin: 20px 0 0;
}
</style>
