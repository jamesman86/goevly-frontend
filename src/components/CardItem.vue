<template>
  <div class="card" @click="handleClick">
    <div class="card-image">
      <img 
        :src="card.imagen" 
        :alt="card.title"
        @error="handleImageError"
      >
      <span v-if="card.rating >= 4.5" class="featured-badge">⭐ Destacado</span>
    </div>
    <div class="card-content">
      <h3>{{ card.title }}</h3>
      <p class="description">{{ card.description || 'Descubre esta increíble experiencia' }}</p>
      <div class="card-footer">
        <p class="precio">{{ formatPrice(card.price) }}</p>
        <p class="rating">⭐ {{ card.rating }} / 5</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick() {
      console.log('Card clickeada:', this.card) // Para debug
      this.$emit("select", this.card)
    },
    handleImageError(e) {
      e.target.src = 'https://via.placeholder.com/400x250?text=Goevly'
    },
    formatPrice(price) {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(price)
    }
  }
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 28px rgba(0,0,0,0.15);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card:hover .card-image img {
  transform: scale(1.05);
}

.featured-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #ffaa00;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
}

.card-content {
  padding: 16px;
}

.card h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
}

.description {
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
  line-height: 1.4;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.precio {
  color: #ffaa00;
  font-weight: bold;
  font-size: 18px;
}

.rating {
  color: #ffaa00;
  font-size: 14px;
  margin: 0;
}
</style>
