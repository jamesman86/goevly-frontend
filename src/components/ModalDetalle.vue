<template>
  <div class="modal-overlay" @click.self="closeModal">
    <ToastNotification ref="toast" />
    <div class="modal-content">
      <button class="modal-close" @click="closeModal">✕</button>
      
      <div class="modal-image">
        <img :src="service.imagen" :alt="service.title">
      </div>
      
      <div class="modal-body">
        <h2 class="modal-title">{{ service.title }}</h2>
        
        <div class="modal-rating">
          <span class="stars">⭐ {{ service.rating }} / 5</span>
          <span class="reviews">(Sin reseñas aún)</span>
        </div>
        
        <div class="modal-price">
          <span class="price-label">Precio:</span>
          <span class="price-value">{{ formatPrice(service.price) }}</span>
        </div>
        
        <div class="modal-description">
          <h3>Descripción</h3>
          <p>{{ service.description || 'Descubre esta increíble experiencia en Santa Marta. Vive momentos únicos con los mejores guías locales.' }}</p>
        </div>
        
        <div class="modal-details">
          <div class="detail-item">
            <span class="detail-icon">📍</span>
            <span>{{ service.ubicacion || 'Santa Marta, Colombia' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-icon">🕒</span>
            <span>{{ service.horario || 'Horario: 8:00 AM - 5:00 PM' }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-icon">📞</span>
            <span>{{ service.telefono || 'Contactar al proveedor' }}</span>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="btn-favorite" @click="addToFavorites">
            ❤️ Agregar a favoritos
          </button>
          <button class="btn-reserve" @click="reserveService">
            📅 Reservar ahora
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import ToastNotification from './ToastNotification.vue'
 
export default {
  name: 'ModalDetalle',
  components: { ToastNotification },
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    formatPrice(price) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(price)
    },
    addToFavorites() {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
 
      if (!favorites.some(fav => fav.id === this.service.id)) {
        favorites.push(this.service)
        localStorage.setItem('favorites', JSON.stringify(favorites))
        // REEMPLAZADO: alert → toast
        this.$refs.toast.show('Agregado a favoritos', 'success')
      } else {
        this.$refs.toast.show('Este servicio ya está en tus favoritos', 'warning')
      }
    },
    reserveService() {
      const reservations = JSON.parse(localStorage.getItem('reservations') || '[]')
 
      const newReservation = {
        id: Date.now(),
        serviceId: this.service.id,
        serviceName: this.service.title,
        price: this.service.price,
        date: new Date().toLocaleDateString(),
        status: 'pendiente'
      }
 
      reservations.push(newReservation)
      localStorage.setItem('reservations', JSON.stringify(reservations))
 
      // REEMPLAZADO: alert → toast
      this.$refs.toast.show(
        `Reserva confirmada: ${this.service.title} — ${this.formatPrice(this.service.price)}`,
        'success',
        5000
      )
    }
  }
}
</script>
 
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}
 
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
 
.modal-content {
  background: white;
  border-radius: 20px ;
  max-width: 600px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease;
}
 
@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
 
.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s;
}
 
.modal-close:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}
 
.modal-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
 
}
 
.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
 
.modal-body {
  padding: 24px;
}
 
.modal-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 12px;
}
 
.modal-rating {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
 
.stars {
  color: #ffaa00;
  font-weight: bold;
  font-size: 18px;
}
 
.reviews {
  color: #666;
  font-size: 14px;
}
 
.modal-price {
  background: #f0f7ff;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
 
.price-label {
  color: #666;
  font-weight: 500;
}
 
.price-value {
  font-size: 24px;
  font-weight: bold;
  color: #ffaa00;
}
 
.modal-description h3 {
  color: #333;
  margin-bottom: 10px;
  font-size: 18px;
}
 
.modal-description p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}
 
.modal-details {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
}
 
.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #eef2f6;
}
 
.detail-item:last-child {
  border-bottom: none;
}
 
.detail-icon {
  font-size: 20px;
  width: 30px;
}
 
.modal-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}
 
.btn-favorite {
  flex: 1;
  padding: 14px;
  background: white;
  border: 2px solid #ffaa00;
  color: #ffaa00;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}
 
.btn-favorite:hover {
  background: #ffaa00;
  color: white;
  transform: translateY(-2px);
}
 
.btn-reserve {
  flex: 2;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}
 
.btn-reserve:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}
 
@media (max-width: 768px) {
  .modal-title {
    font-size: 22px;
  }
  
  .price-value {
    font-size: 20px;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .btn-favorite, .btn-reserve {
    width: 100%;
  }
}
</style>