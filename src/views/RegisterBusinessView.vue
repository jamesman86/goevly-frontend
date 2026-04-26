<template>
  <div>
    <div class="business-container">
      <div class="business-card">
        <router-link to="/registro" class="back-link">Volver al registro</router-link>
        <h1>Registra tu negocio en goevly</h1>
        <p class="subtitle">Llega a más turistas y ciudadanos de Santa Marta</p>

        <form @submit.prevent="handleSubmit" class="business-form">
          
          <div class="form-group">
            <label>Nombre completo *</label>
            <input 
              type="text"
              v-model="form.fullName"
              placeholder="Ej: Juan Carlos Pérez"
              required
            >
          </div>

          <div class="form-group">
            <label>Nombre del negocio *</label>
            <input 
              type="text"
              v-model="form.businessName"
              placeholder="Ej: Tours Tayrona Aventura"
              required
            >
          </div>

          <div class="form-group">
            <label>Categoría *</label>
            <select v-model="form.category" required>
              <option value="">Selecciona una categoría</option>
              <option value="tours">Tours y Excursiones</option>
              <option value="guias">Guías Turísticos</option>
              <option value="comida">Restaurantes y Comida Típica</option>
              <option value="transporte">Transporte</option>
              <option value="hospedaje">Hospedaje</option>
              <option value="artesania">Artesanías</option>
            </select>
          </div>

          <div class="form-group">
            <label>Descripción del servicio *</label>
            <textarea 
              v-model="form.description"
              placeholder="Describe qué ofreces, cuánto dura la experiencia, qué incluye, etc."
              rows="4"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label>¿Qué ofreces? *</label>
            <textarea 
              v-model="form.whatOffer"
              placeholder="Ej: Transporte ida y vuelta, guía bilingüe, almuerzo típico, seguro médico..."
              rows="3"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label>Foto del producto / servicio *</label>
            <div class="image-upload">
              <input 
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                required
              >
              <p class="help-text">Sube una imagen de tu negocio o servicio (máx 5MB)</p>
            </div>
            <div v-if="previewImage" class="image-preview">
              <img :src="previewImage" alt="Vista previa">
              <button type="button" @click="removeImage" class="remove-image">✕</button>
            </div>
          </div>
          <div class="form-group">
            <label>Precio *</label>
            <div class="price-row">
              <input 
                type="number"
                v-model="form.price"
                placeholder="Ej: 120000"
                required
              >
              <select v-model="form.currency">
                <option value="COP">COP</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <small class="help-text">Precio por persona o por servicio</small>
          </div>

          <div class="form-group">
            <label>Dirección *</label>
            <input 
              type="text"
              v-model="form.address"
              placeholder="Ej: Calle 10 #5-30, Centro Histórico, Santa Marta"
              required
            >
          </div>

          <div class="form-group">
            <label>Teléfono de contacto *</label>
            <input 
              type="tel"
              v-model="form.phone"
              placeholder="Ej: 3001234567"
              required
            >
          </div>

          <div class="form-group">
            <label>Email de contacto *</label>
            <input 
              type="email"
              v-model="form.email"
              placeholder="Ej: contacto@tunegocio.com"
              required
            >
          </div>

          <div class="form-group">
            <label>Horario de atención (opcional)</label>
            <input 
              type="text"
              v-model="form.schedule"
              placeholder="Ej: Lunes a Domingo 8:00 AM - 6:00 PM"
            >
          </div>

          <div class="form-group">
            <label>WhatsApp (opcional)</label>
            <input 
              type="tel"
              v-model="form.whatsapp"
              placeholder="Ej: 3001234567"
            >
          </div>

          <button 
            type="submit" 
            class="btn-submit"
            :disabled="loading"
          >
            {{ loading ? 'Registrando...' : 'Registrar mi negocio' }}
          </button>
        </form>
      </div>
    </div>

    <FooterSection/>
  </div>
</template>

<script>
import FooterSection from '@/components/FooterSection.vue'

export default {
  name: 'RegisterBusinessView',
  components: {
    FooterSection
  },
  data() {
    return {
      loading: false,
      previewImage: null,
      form: {
        fullName: '',
        businessName: '',
        category: '',
        description: '',
        whatOffer: '',
        price: '',
        currency: 'COP',
        address: '',
        phone: '',
        email: '',
        schedule: '',
        whatsapp: ''
      },
      imageFile: null
    }
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen debe ser menor a 5MB')
        return
      }

      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona una imagen válida')
        return
      }

      this.imageFile = file

      const reader = new FileReader()
      reader.onload = (e) => {
        this.previewImage = e.target.result
      }
      reader.readAsDataURL(file)
    },

    removeImage() {
      this.imageFile = null
      this.previewImage = null
      const fileInput = document.querySelector('input[type="file"]')
      if (fileInput) fileInput.value = ''
    },

    async handleSubmit() {
      if (!this.form.fullName) {
        alert('Por favor ingresa tu nombre completo')
        return
      }
      if (!this.form.businessName) {
        alert('Por favor ingresa el nombre de tu negocio')
        return
      }
      if (!this.form.category) {
        alert('Por favor selecciona una categoría')
        return
      }
      if (!this.form.description) {
        alert('Por favor ingresa una descripción del servicio')
        return
      }
      if (!this.form.whatOffer) {
        alert('Por favor indica qué ofreces')
        return
      }
      if (!this.imageFile) {
        alert('Por favor sube una foto de tu negocio o servicio')
        return
      }
      if (!this.form.price) {
        alert('Por favor ingresa el precio')
        return
      }
      if (!this.form.address) {
        alert('Por favor ingresa la dirección')
        return
      }
      if (!this.form.phone) {
        alert('Por favor ingresa un teléfono de contacto')
        return
      }
      if (!this.form.email) {
        alert('Por favor ingresa un email de contacto')
        return
      }

      this.loading = true

      try {
        const newBusiness = {
          id: Date.now(),
          comerciante: this.form.fullName,
          nombre: this.form.businessName,
          categoria: this.form.category,
          descripcion: this.form.description,
          queOfrece: this.form.whatOffer,
          precio: parseInt(this.form.price),
          moneda: this.form.currency,
          direccion: this.form.address,
          telefono: this.form.phone,
          email: this.form.email,
          horario: this.form.schedule || 'Consultar',
          whatsapp: this.form.whatsapp || '',
          imagen: this.previewImage, 
          calificacion: 0,
          fechaRegistro: new Date().toISOString()
        }

        const existingBusinesses = JSON.parse(localStorage.getItem('businesses') || '[]')
        

        existingBusinesses.push(newBusiness)
        
        localStorage.setItem('businesses', JSON.stringify(existingBusinesses))
        
        console.log('Negocio registrado:', newBusiness)
        
        alert('✅ ¡Negocio registrado con éxito! Tu servicio ya está disponible para los turistas y ciudadanos de Santa Marta.')
        
        this.$router.push('/')
        
      } catch (error) {
        console.error('Error:', error)
        alert('Hubo un error al registrar. Por favor intenta nuevamente.')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.business-container {
  min-height: 100vh;
  background:
    linear-gradient(135deg, rgba(0, 119, 204, 0.9), rgba(0, 95, 163, 0.88)),
    url('@/assets/parque-tayrona.jpg') center/cover;
  padding: 100px 20px 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.business-card {
  background: white;
  border-radius: 16px;
  padding: 40px;
  max-width: 700px;
  width: 100%;
  box-shadow: 0 18px 45px rgba(0, 60, 110, 0.28);
}

.back-link {
  display: inline-flex;
  align-items: center;
  margin-bottom: 22px;
  color: #0077cc;
  font-weight: 700;
  text-decoration: none;
}

.back-link::before {
  content: "<";
  margin-right: 8px;
}

.back-link:hover {
  color: #005fa3;
}

.business-card h1 {
  color: #333;
  margin-bottom: 10px;
  font-size: 28px;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
}

.business-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #555;
  font-size: 14px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0077cc;
  box-shadow: 0 0 0 3px rgba(0, 119, 204, 0.12);
}

.price-row {
  display: flex;
  gap: 10px;
}

.price-row input {
  flex: 2;
}

.price-row select {
  flex: 1;
}

.image-upload {
  border: 2px dashed #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.image-upload:hover {
  border-color: #0077cc;
  background: #f0f7ff;
}

.image-upload input {
  cursor: pointer;
}

.help-text {
  color: #999;
  font-size: 12px;
  margin-top: 8px;
}

.image-preview {
  position: relative;
  margin-top: 15px;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #e0e0e0;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-image {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgba(0,0,0,0.6);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.remove-image:hover {
  background: rgba(0,0,0,0.8);
}

.btn-submit {
  background: linear-gradient(135deg, #0077cc 0%, #005fa3 100%);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 119, 204, 0.32);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .business-card {
    padding: 30px 20px;
  }
  
  .business-card h1 {
    font-size: 24px;
  }
  
  .price-row {
    flex-direction: column;
  }
}
</style>
