<template>
  <footer class="footer">
    <div class="footer-content">
 
      <!-- Columna 1: Logo y descripción -->
      <div class="footer-brand">
        <img src="../assets/goevlylogo.png" alt="goevly" class="footer-logo">
        <p class="footer-desc">
          La plataforma de turismo local de Santa Marta. Descubre experiencias auténticas del Caribe colombiano.
        </p>
        <div class="social-links">
          <a href="#" class="social-btn" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="#" class="social-btn" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="#" class="social-btn" aria-label="WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </a>
        </div>
      </div>
 
      <!-- Columna 2: Categorías -->
      <div class="footer-col">
        <h4>Explorar</h4>
        <ul>
          <li><router-link to="/categoria/tours">Tours y excursiones</router-link></li>
          <li><router-link to="/categoria/guias">Guías turísticos</router-link></li>
          <li><router-link to="/categoria/comida">Comida típica</router-link></li>
          <li><router-link to="/categoria/transporte">Transporte</router-link></li>
        </ul>
      </div>
 
      <!-- Columna 3: Empresa -->
      <div class="footer-col">
        <h4>Goevly</h4>
        <ul>
          <li><router-link to="/about">Sobre nosotros</router-link></li>
          <li><router-link to="/registro">Registrar mi negocio</router-link></li>
          <li><router-link to="/login">Iniciar sesión</router-link></li>
        </ul>
      </div>
 
      <!-- Columna 4: Contacto -->
      <div class="footer-col">
        <h4>Contacto</h4>
        <ul class="contact-list">
          <li>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Santa Marta, Colombia
          </li>
          <li>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            hola@goevly.co
          </li>
        </ul>
      </div>
 
    </div>
 
    <!-- Línea inferior -->
    <div class="footer-bottom">
      <p>© 2026 goevly. Santa Marta, Colombia.</p>
    </div>
  </footer>
</template>
 
<script>
export default {
  name: 'FooterSection'
}
</script>
 
<style scoped>
.footer {
  background: #1a1a2e;
  color: #ccc;
  padding-top: 60px;
}
 
.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
}
 
/* Columna marca */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
 
.footer-logo {
  width: 130px;
  filter: brightness(0) invert(1);
  opacity: 0.9;
}
 
.footer-desc {
  font-size: 14px;
  line-height: 1.7;
  color: #aaa;
  max-width: 260px;
}
 
.social-links {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}
 
.social-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #444;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  text-decoration: none;
  transition: all 0.3s;
}
 
.social-btn:hover {
  border-color: #0077cc;
  color: #0077cc;
  transform: translateY(-2px);
}
 
/* Columnas de links */
.footer-col h4 {
  color: white;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 18px;
  letter-spacing: 0.5px;
}
 
.footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
 
.footer-col ul li a {
  color: #aaa;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}
 
.footer-col ul li a:hover {
  color: #0077cc;
}
 
/* Contacto */
.contact-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #aaa;
}
 
.contact-list svg {
  flex-shrink: 0;
  color: #0077cc;
}
 
/* Línea inferior */
.footer-bottom {
  margin-top: 50px;
  border-top: 1px solid #2a2a3e;
  padding: 20px 40px;
  text-align: center;
}
 
.footer-bottom p {
  font-size: 13px;
  color: #666;
  margin: 0;
}
 
/* Responsive */
@media (max-width: 900px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 36px;
  }
 
  .footer-brand {
    grid-column: 1 / -1;
  }
}
 
@media (max-width: 560px) {
  .footer-content {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
 
  .footer-bottom {
    padding: 20px;
  }
}
</style>
