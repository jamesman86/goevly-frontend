<template>
  <div>
    <HeaderSection />
 
    <!-- Hero -->
    <section class="about-hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Sobre Goevly</h1>
        <p>Conectando viajeros con las experiencias auténticas de Santa Marta</p>
      </div>
    </section>
 
    <!-- Misión -->
    <section class="about-section">
      <div class="container">
        <div class="mission-grid">
          <div class="mission-card">
            <div class="mission-icon">🌊</div>
            <h3>Nuestra misión</h3>
            <p>Conectar a los turistas con los mejores negocios locales de Santa Marta, impulsando la economía local y ofreciendo experiencias auténticas del Caribe colombiano.</p>
          </div>
          <div class="mission-card">
            <div class="mission-icon">🤝</div>
            <h3>Nuestra visión</h3>
            <p>Ser la plataforma de referencia para el turismo local en Colombia, empezando por Santa Marta y expandiéndonos a más ciudades del país.</p>
          </div>
          <div class="mission-card">
            <div class="mission-icon">💡</div>
            <h3>Nuestros valores</h3>
            <p>Autenticidad, transparencia y apoyo a los emprendedores locales. Creemos que el mejor turismo es el que beneficia directamente a las comunidades.</p>
          </div>
        </div>
      </div>
    </section>
 
    <!-- Historia -->
    <section class="story-section">
      <div class="container">
        <div class="story-content">
          <div class="story-text">
            <h2>Nuestra historia</h2>
            <p>goevly nació en Santa Marta con una idea simple: los turistas merecen descubrir experiencias reales, más allá de los circuitos turísticos tradicionales.</p>
            <p>Somos dos estudiantes samarios apasionados por la tecnología y por nuestra ciudad. Vemos cómo cada año miles de turistas llegan al Parque Tayrona, a Minca y a nuestras playas, pero muchos no saben que hay guías locales increíbles, restaurantes de comida típica auténtica y operadores de tours que ofrecen experiencias únicas.</p>
            <p>Goevly es nuestra respuesta a eso: una plataforma donde los negocios locales tienen visibilidad real y los turistas pueden tomar decisiones informadas.</p>
          </div>
          <div class="story-stats">
            <div class="stat">
              <span class="stat-number">2026</span>
              <span class="stat-label">Año de fundación</span>
            </div>
            <div class="stat">
              <span class="stat-number">4+</span>
              <span class="stat-label">Categorías disponibles</span>
            </div>
            <div class="stat">
              <span class="stat-number">100%</span>
              <span class="stat-label">Negocios locales</span>
            </div>
          </div>
        </div>
      </div>
    </section>
 
    
 
    <!-- CTA -->
    <section class="cta-section">
      <div class="container">
        <h2>¿Tienes un negocio en Santa Marta?</h2>
        <p>Únete a goevly y lleva tu negocio al siguiente nivel. Es gratis.</p>
        <router-link to="/registro" class="btn-cta">Registrar mi negocio</router-link>
      </div>
    </section>
 
    <FooterSection />
  </div>
</template>
 
<script>
import HeaderSection from '@/components/HeaderSection.vue'
import FooterSection from '@/components/FooterSection.vue'
 
export default {
  name: 'AboutView',
  components: { HeaderSection, FooterSection }
}
</script>
 
<style scoped>
.about-hero {
  position: relative;
  height: 45vh;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-image: url('@/assets/parque-tayrona.jpg');
  background-size: cover;
  background-position: center;
  margin-top: 70px;
}
 
.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 50, 100, 0.65);
}
 
.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  padding: 0 20px;
}
 
.hero-content h1 {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 12px;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.5);
}
 
.hero-content p {
  font-size: 20px;
  opacity: 0.9;
}
 
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}
 
/* Misión */
.about-section {
  padding: 70px 0;
  background: #f8f9fa;
}
 
.mission-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}
 
.mission-card {
  background: white;
  padding: 36px 28px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  transition: transform 0.3s;
}
 
.mission-card:hover { transform: translateY(-6px); }
 
.mission-icon {
  font-size: 40px;
  margin-bottom: 16px;
}
 
.mission-card h3 {
  font-size: 20px;
  color: #0077cc;
  margin-bottom: 12px;
}
 
.mission-card p {
  color: #666;
  line-height: 1.7;
  font-size: 15px;
}
 
/* Historia */
.story-section {
  padding: 70px 0;
  background: white;
}
 
.story-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 60px;
  align-items: center;
}
 
.story-text h2 {
  font-size: 34px;
  color: #333;
  margin-bottom: 20px;
}
 
.story-text p {
  color: #555;
  line-height: 1.8;
  margin-bottom: 16px;
  font-size: 16px;
}
 
.story-stats {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
 
.stat {
  text-align: center;
  background: #f0f7ff;
  padding: 24px;
  border-radius: 16px;
}
 
.stat-number {
  display: block;
  font-size: 36px;
  font-weight: 800;
  color: #0077cc;
}
 
.stat-label {
  display: block;
  font-size: 13px;
  color: #888;
  margin-top: 4px;
}
 
/* Equipo */
.team-section {
  padding: 70px 0;
  background: #f8f9fa;
}
 
.section-title {
  text-align: center;
  font-size: 34px;
  color: #333;
  margin-bottom: 8px;
}
 
.section-sub {
  text-align: center;
  color: #888;
  margin-bottom: 50px;
  font-size: 16px;
}
 
.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 700px;
  margin: 0 auto;
}
 
.team-card {
  background: white;
  padding: 36px 28px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}
 
.team-avatar {
  font-size: 52px;
  margin-bottom: 16px;
}
 
.team-card h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 6px;
}
 
.team-role {
  color: #0077cc;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 12px;
}
 
.team-bio {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}
 
/* CTA */
.cta-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, #0077cc 0%, #005fa3 100%);
  text-align: center;
  color: white;
}
 
.cta-section h2 {
  font-size: 32px;
  margin-bottom: 12px;
}
 
.cta-section p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 32px;
}
 
.btn-cta {
  display: inline-block;
  padding: 16px 40px;
  background: #ffaa00;
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.3s;
}
 
.btn-cta:hover {
  background: #e69500;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}
 
@media (max-width: 900px) {
  .mission-grid { grid-template-columns: 1fr; }
  .story-content { grid-template-columns: 1fr; }
  .story-stats { flex-direction: row; }
  .hero-content h1 { font-size: 32px; }
}
 
@media (max-width: 600px) {
  .team-grid { grid-template-columns: 1fr; }
  .story-stats { flex-direction: column; }
}
</style>
