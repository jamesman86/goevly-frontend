<template>
  <div>
    <HeaderSection />
    <HeroSection />
    <CategoriasSection />
    <!-- CONECTADO: CardsGrid ahora recibe los datos como prop -->
    <CardsGrid :cards="negocios" />
    <FooterSection />
  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue'
import HeroSection from '@/components/HeroSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import CategoriasSection from '@/components/CategoriasSection.vue'
import CardsGrid from '@/components/CardsGrid.vue'
import { negocios as mockNegocios } from '@/data/mockData.js'

export default {
  name: 'HomeView',
  components: {
    HeaderSection,
    HeroSection,
    FooterSection,
    CategoriasSection,
    CardsGrid
  },
  data() {
    return {
      negocios: []
    }
  },
  mounted() {
    this.cargarNegocios()
  },
  methods: {
    cargarNegocios() {
      // Si hay negocios registrados por comerciantes en localStorage, usarlos
      const storedBusinesses = localStorage.getItem('businesses')

      if (storedBusinesses) {
        const businesses = JSON.parse(storedBusinesses)

        if (businesses.length > 0) {
          // Convertir al formato que espera CardItem
          this.negocios = businesses.map(b => ({
            id: b.id,
            title: b.nombre,
            category: b.categoria,
            description: b.descripcion,
            imagen: b.imagen,
            ubicacion: b.direccion,
            horario: b.horario,
            telefono: b.telefono,
            price: b.precio,
            rating: b.calificacion || 4.0,
            queOfrece: b.queOfrece,
            comerciante: b.comerciante
          }))
          return
        }
      }

      // Si no hay negocios registrados, usar el mockData como fallback
      this.negocios = mockNegocios
    }
  }
}
</script>

<style>
</style>