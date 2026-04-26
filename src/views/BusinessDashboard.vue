<template>
  <div>
    <HeaderSection/>
    
    <div class="dashboard-container">
      <!-- Sidebar -->
      <div class="sidebar">
        <div class="business-info">
          <div class="business-avatar">
            <img :src="businessLogo || defaultLogo" alt="logo">
          </div>
          <h3>{{ businessName || 'Mi Negocio' }}</h3>
          <p class="business-email">{{ userEmail }}</p>
        </div>

        <nav class="sidebar-nav">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            :class="['nav-btn', { active: currentTab === tab.id }]"
            @click="currentTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Contenido principal -->
      <div class="main-content">
        <!-- Panel de Servicios -->
        <div v-if="currentTab === 'services'" class="tab-content">
          <div class="content-header">
            <h2>Mis Servicios</h2>
            <button class="btn-primary" @click="showAddService = true">
              + Nuevo Servicio
            </button>
          </div>

          <!-- Grid de servicios -->
          <div class="services-grid">
            <div v-for="service in services" :key="service.id" class="service-card">
              <!-- Carrusel de imágenes -->
              <div class="service-images">
                <div class="image-carousel">
                  <img 
                    v-for="(img, idx) in service.images" 
                    :key="idx"
                    :src="img"
                    :class="{ active: service.currentImage === idx }"
                    @click="service.currentImage = idx"
                  >
                </div>
                <button class="edit-images-btn" @click="editService(service)">
                  Editar fotos
                </button>
              </div>

              <!-- Información del servicio -->
              <div class="service-info">
                <input 
                  v-model="service.name" 
                  class="service-name-input"
                  placeholder="Nombre del servicio"
                  @change="updateService(service)"
                >
                
                <!-- Precios según tipo -->
                <div v-if="service.businessType === 'restaurante'" class="product-list">
                  <div v-for="(product, idx) in service.products" :key="idx" class="product-item">
                    <input v-model="product.name" placeholder="Producto">
                    <div class="product-price">
                      <span>$</span>
                      <input v-model="product.price" type="number">
                    </div>
                    <button @click="removeProduct(service, idx)" class="remove-btn">×</button>
                  </div>
                  <button @click="addProduct(service)" class="add-product-btn">
                    + Agregar producto
                  </button>
                </div>

                <div v-else class="simple-price">
                  <label>Precio:</label>
                  <div class="price-input">
                    <span>$</span>
                    <input v-model="service.price" type="number" @change="updateService(service)">
                    <select v-model="service.currency" @change="updateService(service)">
                      <option value="COP">COP</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                </div>

                <!-- Descripción -->
                <textarea 
                  v-model="service.description" 
                  class="service-description"
                  placeholder="Descripción del servicio"
                  @change="updateService(service)"
                ></textarea>

                <!-- Estado y acciones -->
                <div class="service-actions">
                  <label class="toggle-switch">
                    <input type="checkbox" v-model="service.active" @change="updateService(service)">
                    <span class="slider"></span>
                  </label>
                  <span class="status" :class="{ active: service.active }">
                    {{ service.active ? 'Activo' : 'Inactivo' }}
                  </span>
                  <button @click="deleteService(service)" class="delete-btn">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Panel de Estadísticas -->
        <div v-if="currentTab === 'stats'" class="tab-content">
          <h2>Estadísticas</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <h3>Vistas totales</h3>
              <p class="stat-number">1,234</p>
            </div>
            <div class="stat-card">
              <h3>Reservas</h3>
              <p class="stat-number">56</p>
            </div>
            <div class="stat-card">
              <h3>Ingresos</h3>
              <p class="stat-number">$2,345,000</p>
            </div>
          </div>
        </div>

        <!-- Panel de Configuración -->
        <div v-if="currentTab === 'settings'" class="tab-content">
          <h2>Configuración del Negocio</h2>
          
          <div class="settings-form">
            <div class="form-group">
              <label>Nombre del negocio</label>
              <input v-model="businessName" type="text">
            </div>

            <div class="form-group">
              <label>Teléfono de contacto</label>
              <input v-model="businessPhone" type="tel">
            </div>

            <div class="form-group">
              <label>Email</label>
              <input v-model="businessEmail" type="email">
            </div>

            <div class="form-group">
              <label>Dirección</label>
              <input v-model="businessAddress" type="text">
            </div>

            <button class="btn-primary" @click="saveSettings">Guardar cambios</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para agregar/editar servicio -->
    <div v-if="showAddService" class="modal">
      <div class="modal-content">
        <h3>{{ editingService ? 'Editar' : 'Nuevo' }} Servicio</h3>
        
        <form @submit.prevent="saveService">
          <div class="form-group">
            <label>Tipo de servicio</label>
            <select v-model="newService.businessType" required>
              <option value="experiencia">Tour / Experiencia</option>
              <option value="restaurante">Restaurante / Comida</option>
              <option value="transporte">Transporte</option>
              <option value="hospedaje">Hospedaje</option>
              <option value="guia">Guía turístico</option>
            </select>
          </div>

          <div class="form-group">
            <label>Nombre del servicio</label>
            <input v-model="newService.name" required>
          </div>

          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="newService.description" rows="3"></textarea>
          </div>

          <!-- Precios según tipo -->
          <div v-if="newService.businessType === 'restaurante'" class="form-group">
            <label>Productos</label>
            <div v-for="(product, idx) in newService.products" :key="idx" class="product-row">
              <input v-model="product.name" placeholder="Nombre">
              <input v-model="product.price" type="number" placeholder="Precio">
              <button @click="removeNewProduct(idx)" type="button">×</button>
            </div>
            <button @click="addNewProduct" type="button" class="add-btn">
              + Agregar producto
            </button>
          </div>

          <div v-else class="form-group">
            <label>Precio</label>
            <div class="price-row">
              <input v-model="newService.price" type="number" required>
              <select v-model="newService.currency">
                <option value="COP">COP</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Imágenes</label>
            <input type="file" multiple accept="image/*" @change="handleNewImages">
            <div class="image-previews">
              <div v-for="(img, idx) in newService.imagePreviews" :key="idx" class="preview">
                <img :src="img" alt="">
                <button @click="removeNewImage(idx)" type="button">×</button>
              </div>
            </div>
          </div>

          <div class="modal-actions">
            <button type="button" @click="showAddService = false">Cancelar</button>
            <button type="submit" class="btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>

    <FooterSection/>
  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue'
import FooterSection from '@/components/FooterSection.vue'

export default {
  name: 'BusinessDashboard',
  components: {
    HeaderSection,
    FooterSection
  },
  data() {
    return {
      currentTab: 'services',
      businessName: '',
      businessPhone: '',
      businessEmail: '',
      businessAddress: '',
      businessLogo: '',
      defaultLogo: 'data:image/svg+xml,...', // SVG por defecto
      userEmail: 'empresario@example.com',
      
      tabs: [
        { id: 'services', name: 'Mis servicios' },
        { id: 'stats', name: 'Estadísticas' },
        { id: 'settings', name: 'Configuración' }
      ],

      services: [
        // Ejemplo de servicio tipo restaurante
        {
          id: 1,
          name: 'Restaurante El Marino',
          businessType: 'restaurante',
          description: 'Comida típica de la costa',
          products: [
            { name: 'Pescado frito', price: 35000 },
            { name: 'Arroz con camarones', price: 28000 }
          ],
          images: [
            'https://via.placeholder.com/300',
            'https://via.placeholder.com/300'
          ],
          currentImage: 0,
          active: true
        },
        // Ejemplo de servicio tipo tour
        {
          id: 2,
          name: 'Tour por el Tayrona',
          businessType: 'experiencia',
          description: 'Recorrido guiado por el parque',
          price: 120000,
          currency: 'COP',
          images: [
            'https://via.placeholder.com/300'
          ],
          currentImage: 0,
          active: true
        }
      ],

      showAddService: false,
      editingService: null,
      newService: {
        businessType: 'experiencia',
        name: '',
        description: '',
        price: '',
        currency: 'COP',
        products: [{ name: '', price: '' }],
        images: [],
        imagePreviews: []
      }
    }
  },

  mounted() {
    // Cargar datos del negocio desde localStorage (simulado)
    this.loadBusinessData()
  },

  methods: {
    loadBusinessData() {
      // Simular carga de datos
      this.businessName = localStorage.getItem('businessName') || 'Mi Restaurante'
      this.businessEmail = localStorage.getItem('user_email') || 'empresario@email.com'
    },

    // CRUD de servicios
    updateService(service) {
      console.log('Actualizando servicio:', service)
      // Aquí iría la llamada al backend
      localStorage.setItem(`service_${service.id}`, JSON.stringify(service))
    },

    deleteService(service) {
      if (confirm('¿Eliminar este servicio?')) {
        this.services = this.services.filter(s => s.id !== service.id)
        localStorage.removeItem(`service_${service.id}`)
      }
    },

    // Productos para restaurantes
    addProduct(service) {
      if (!service.products) service.products = []
      service.products.push({ name: '', price: '' })
    },

    removeProduct(service, index) {
      service.products.splice(index, 1)
      this.updateService(service)
    },

    // Nuevo servicio
    addNewProduct() {
      this.newService.products.push({ name: '', price: '' })
    },

    removeNewProduct(index) {
      this.newService.products.splice(index, 1)
    },

    handleNewImages(event) {
      const files = Array.from(event.target.files)
      
      files.forEach(file => {
        this.newService.images.push(file)
        
        const reader = new FileReader()
        reader.onload = (e) => {
          this.newService.imagePreviews.push(e.target.result)
        }
        reader.readAsDataURL(file)
      })
    },

    removeNewImage(index) {
      this.newService.images.splice(index, 1)
      this.newService.imagePreviews.splice(index, 1)
    },

    saveService() {
      if (this.editingService) {
        // Actualizar servicio existente
        Object.assign(this.editingService, {
          ...this.newService,
        images: this.newService.images.length ? this.newService.images : this.editingService.images})
      } else {
        // Crear nuevo servicio
        const newId = Date.now()
        this.services.push({
          id: newId,
          ...this.newService,
          currentImage: 0,
          active: true,
          createdAt: new Date().toISOString()
        })
      }

      this.showAddService = false
      this.resetNewService()
      this.saveTolocalStorage()
    },

    saveTolocalStorage(){
      localStorage.setItem('business_services', JSON.stringify(this.services))
    },

    editService(service) {
      this.editingService = service
      this.newService = { ...service }
      this.showAddService = true
    },

    resetNewService() {
      this.newService = {
        businessType: 'experiencia',
        name: '',
        description: '',
        price: '',
        currency: 'COP',
        products: [{ name: '', price: '' }],
        images: [],
        imagePreviews: []
      }
      this.editingService = null
    },

    saveSettings() {
      // Guardar configuración del negocio
      localStorage.setItem('businessName', this.businessName)
      localStorage.setItem('businessPhone', this.businessPhone)
      localStorage.setItem('businessEmail', this.businessEmail)
      localStorage.setItem('businessAddress', this.businessAddress)
      
      alert('Configuración guardada')
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
  padding-top: 80px;
  background: #f5f7fa;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: white;
  box-shadow: 2px 0 10px rgba(0,0,0,0.05);
  padding: 30px 20px;
}

.business-info {
  text-align: center;
  padding-bottom: 30px;
  border-bottom: 1px solid #eef2f6;
}

.business-avatar {
  width: 100px;
  height: 100px;
  margin: 0 auto 15px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #667eea;
}

.business-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.business-email {
  color: #666;
  font-size: 14px;
}

.sidebar-nav {
  margin-top: 30px;
}

.nav-btn {
  width: 100%;
  padding: 15px;
  text-align: left;
  background: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  color: #555;
  transition: all 0.3s;
  margin-bottom: 5px;
}

.nav-btn .icon {
  margin-right: 12px;
  font-size: 20px;
}

.nav-btn:hover {
  background: #f0f3f8;
}

.nav-btn.active {
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  color: #667eea;
  font-weight: 600;
}

/* Main content */
.main-content {
  flex: 1;
  padding: 30px;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
}

.service-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.service-images {
  position: relative;
  height: 200px;
}

.image-carousel {
  display: flex;
  height: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.image-carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  scroll-snap-align: start;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.image-carousel img.active {
  opacity: 1;
}

.edit-images-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0,0,0,0.7);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
}

.service-info {
  padding: 20px;
}

.service-name-input {
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  border: none;
  padding: 5px;
  margin-bottom: 10px;
  border-bottom: 2px solid transparent;
}

.service-name-input:focus {
  outline: none;
  border-bottom-color: #667eea;
}

.product-list {
  margin: 15px 0;
}

.product-item {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
  align-items: center;
}

.product-item input {
  flex: 1;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 5px;
  width: 120px;
}

.product-price input {
  width: 100px;
}

.remove-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ff4444;
  color: white;
  border: none;
  cursor: pointer;
}

.add-product-btn {
  background: none;
  border: 1px dashed #667eea;
  color: #667eea;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}

.simple-price {
  margin: 15px 0;
}

.price-input {
  display: flex;
  gap: 5px;
  margin-top: 5px;
}

.price-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
}

.price-input select {
  width: 80px;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
}

.service-description {
  width: 100%;
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  margin: 15px 0;
  resize: vertical;
}

.service-actions {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eef2f6;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4caf50;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.status {
  font-size: 14px;
  color: #999;
}

.status.active {
  color: #4caf50;
}

.delete-btn {
  background: none;
  border: 1px solid #ff4444;
  color: #ff4444;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-left: auto;
}

/* Estadísticas */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.stat-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.stat-card h3 {
  color: #666;
  font-size: 14px;
  margin-bottom: 10px;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: #333;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 20px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
}

.modal-actions button {
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}

.modal-actions button:first-child {
  background: white;
  border: 1px solid #e0e0e0;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    padding: 20px;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .content-header {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
