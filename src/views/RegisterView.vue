<template>
  <div class="register-page">
    <ToastNotification ref="toast" />

    <!-- Panel izquierdo — imagen y lema -->
    <div class="register-left">
      <div class="left-overlay"></div>
      <div class="left-content">
        <img src="../assets/goevlylogo.png" alt="Goevly" class="left-logo" @click="goToHome">
        <h2>Explora Santa Marta<br>a un solo clic</h2>
        <p>Únete a miles de personas que descubren las mejores experiencias del Caribe colombiano con Goevly.</p>
        <div class="left-tags">
          <span>🌊 Tours</span>
          <span>🍽️ Comida típica</span>
          <span>🧭 Guías locales</span>
          <span>🚤 Transporte</span>
        </div>
      </div>
    </div>

    <!-- Panel derecho — formulario -->
    <div class="register-right">
      <div class="form-wrapper">

        <div class="form-header">
          <h1>Únete a Goevly</h1>
          <p>¿Cómo quieres registrarte?</p>
        </div>

        

        <form v-if="tipo === 'explorador'" @submit.prevent="handleRegister" class="auth-form">

          <!-- Nombre completo -->
          <div class="form-group">
            <label>Nombre completo *</label>
            <div class="input-icon">
              <span class="icon">👤</span>
              <input
                type="text"
                v-model="form.fullName"
                placeholder="Ej: Juan Pérez"
                required
                :class="{ 'error': errors.fullName }"
              >
            </div>
            <span v-if="errors.fullName" class="error-msg">{{ errors.fullName }}</span>
          </div>

          <!-- Email -->
          <div class="form-group">
            <label>Email *</label>
            <div class="input-icon">
              <span class="icon">📧</span>
              <input
                type="email"
                v-model="form.email"
                placeholder="tucorreo@ejemplo.com"
                required
                :class="{ 'error': errors.email }"
              >
            </div>
            <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
          </div>

          <!-- Teléfono -->
          <div class="form-group">
            <label>Teléfono <span class="optional">(opcional)</span></label>
            <div class="input-icon">
              <span class="icon">📱</span>
              <input
                type="tel"
                v-model="form.phone"
                placeholder="Ej: 3001234567"
              >
            </div>
          </div>

          <!-- Contraseña -->
          <div class="form-group">
            <label>Contraseña *</label>
            <div class="input-icon">
              <span class="icon">🔒</span>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                placeholder="Mínimo 6 caracteres"
                required
                :class="{ 'error': errors.password }"
              >
              <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
          </div>

          <!-- Confirmar contraseña -->
          <div class="form-group">
            <label>Confirmar contraseña *</label>
            <div class="input-icon">
              <span class="icon">🔒</span>
              <input
                :type="showConfirm ? 'text' : 'password'"
                v-model="form.confirmPassword"
                placeholder="Repite tu contraseña"
                required
                :class="{ 'error': errors.confirmPassword }"
              >
              <button type="button" class="toggle-password" @click="showConfirm = !showConfirm">
                {{ showConfirm ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <span v-if="errors.confirmPassword" class="error-msg">{{ errors.confirmPassword }}</span>
          </div>

          <button type="submit" class="btn-register" :disabled="loading">
            {{ loading ? 'Creando cuenta...' : 'Comenzar a explorar' }}
          </button>

          <!-- Separador -->
          <div class="separator"><span>o regístrate con</span></div>

          <!-- Social -->
          <div class="social-login">
            <button type="button" class="social-btn" @click="socialLogin('Google')">
              <img src="https://www.google.com/favicon.ico" alt="Google" width="18">
              Google
            </button>
            <button type="button" class="social-btn" @click="socialLogin('Facebook')">
              <span class="fb-icon">f</span>
              Facebook
            </button>
          </div>

          <p class="login-link">
            ¿Ya tienes cuenta?
            <router-link to="/login">Inicia sesión aquí</router-link>
          </p>

        </form>

        <!-- Banner propietarios -->
        <div class="banner-negocio" @click="irARegistroNegocio">
          <div class="banner-izq">
            <span class="banner-icon">🏪</span>
            <div>
              <p class="banner-title">¿Tienes un negocio en Santa Marta?</p>
              <p class="banner-sub">Regístralo gratis y llega a miles de turistas</p>
            </div>
          </div>
          <button type="button" class="banner-btn">Registrar mi negocio →</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ToastNotification from '@/components/ToastNotification.vue'

export default {
  name: 'RegisterView',
  components: { ToastNotification },
  data() {
    return {
      tipo: 'explorador',
      loading: false,
      showPassword: false,
      showConfirm: false,
      form: {
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      },
      errors: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    validateForm() {
      let valid = true
      this.errors = { fullName: '', email: '', password: '', confirmPassword: '' }

      if (!this.form.fullName.trim()) {
        this.errors.fullName = 'El nombre es requerido'
        valid = false
      }

      if (!this.form.email) {
        this.errors.email = 'El email es requerido'
        valid = false
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
        this.errors.email = 'Email inválido'
        valid = false
      }

      if (!this.form.password) {
        this.errors.password = 'La contraseña es requerida'
        valid = false
      } else if (this.form.password.length < 6) {
        this.errors.password = 'Mínimo 6 caracteres'
        valid = false
      }

      if (this.form.password !== this.form.confirmPassword) {
        this.errors.confirmPassword = 'Las contraseñas no coinciden'
        valid = false
      }

      return valid
    },
    irARegistroNegocio() {
      // Cuando Java esté listo apunta a la URL real
      this.$router.push('/registro-negocio')
    },
    socialLogin(provider) {
      this.$refs.toast.show(`Registro con ${provider} — próximamente`, 'info')
    },
    async handleRegister() {
      if (!this.validateForm()) return

      this.loading = true

      try {
        await new Promise(resolve => setTimeout(resolve, 1200))

        const userData = {
          id: Date.now(),
          fullName: this.form.fullName,
          email: this.form.email,
          phone: this.form.phone,
          role: 'turista',
          registeredAt: new Date().toISOString()
        }

        const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]')
        const emailExists = registeredUsers.some(user => user.email === this.form.email)

        if (emailExists) {
          this.$refs.toast.show('Este email ya está registrado', 'error')
          return
        }

        registeredUsers.push({
          ...userData,
          password: this.form.password
        })

        localStorage.setItem('registered_users', JSON.stringify(registeredUsers))
        localStorage.setItem('user_data', JSON.stringify(userData))
        localStorage.setItem('auth_token', 'fake-token-' + Date.now())

        this.$refs.toast.show(
          `¡Bienvenido a Goevly, ${this.form.fullName.split(' ')[0]}!`,
          'success'
        )

        setTimeout(() => this.$router.push('/'), 1500)

      } catch (error) {
        console.error(error)
        this.$refs.toast.show('Error al registrarse. Intenta nuevamente.', 'error')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.register-page {
  display: flex;
  min-height: 100vh;
}

/* Panel izquierdo */
.register-left {
  position: relative;
  width: 45%;
  background-image: url('@/assets/parque-tayrona.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(0,80,150,0.85), rgba(0,0,0,0.6));
}

.left-content {
  position: relative;
  z-index: 2;
  padding: 40px;
  color: white;
}

.left-logo {
  width: 140px;
  filter: brightness(0) invert(1);
  margin-bottom: 40px;
  cursor: pointer;
  opacity: 0.95;
  transition: opacity 0.2s;
}

.left-logo:hover { opacity: 1; }

.left-content h2 {
  font-size: 34px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;
  text-shadow: 1px 1px 6px rgba(0,0,0,0.4);
}

.left-content p {
  font-size: 16px;
  line-height: 1.7;
  opacity: 0.88;
  margin-bottom: 32px;
  max-width: 320px;
}

.left-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.left-tags span {
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,0.25);
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 500;
}

/* Panel derecho */
.register-right {
  width: 55%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: #f8f9fa;
  overflow-y: auto;
}

.form-wrapper {
  width: 100%;
  max-width: 440px;
}

.form-header {
  margin-bottom: 32px;
}

.form-header h1 {
  font-size: 28px;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 6px;
}

.form-header p {
  color: #0077cc;
  font-size: 15px;
  font-weight: 500;
}

/* Formulario */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #444;
}

.optional {
  color: #aaa;
  font-weight: 400;
}

.input-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon .icon {
  position: absolute;
  left: 14px;
  font-size: 16px;
}

.input-icon input {
  width: 100%;
  padding: 13px 13px 13px 44px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
  background: white;
  transition: all 0.3s;
}

.input-icon input:focus {
  outline: none;
  border-color: #0077cc;
  box-shadow: 0 0 0 3px rgba(0,119,204,0.1);
}

.input-icon input.error {
  border-color: #f44336;
}

.toggle-password {
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
}

.error-msg {
  color: #f44336;
  font-size: 12px;
}

.btn-register {
  margin-top: 8px;
  padding: 15px;
  background: linear-gradient(135deg, #0077cc, #005fa3);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s;
}

.btn-register:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,119,204,0.35);
}

.btn-register:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-top: 4px;
}

.login-link a {
  color: #0077cc;
  font-weight: 600;
  text-decoration: none;
}

.login-link a:hover { text-decoration: underline; }

/* Aviso empresarios */
.business-notice {
  margin-top: 28px;
  padding: 14px 18px;
  background: #f0f7ff;
  border-left: 3px solid #0077cc;
  border-radius: 0 8px 8px 0;
}

.business-notice p {
  font-size: 13px;
  color: #555;
  margin: 0;
  line-height: 1.5;
}

.business-notice a {
  color: #0077cc;
  font-weight: 600;
  text-decoration: none;
}

/* Selector de tipo */
.tipo-selector {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 28px;
}

.tipo-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  background: white;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s;
  font-family: inherit;
  text-align: left;
  width: 100%;
}

.tipo-btn:hover {
  border-color: #0077cc;
  transform: translateX(4px);
}

.tipo-btn.active {
  border-color: #0077cc;
  background: #f0f7ff;
}

.tipo-btn.negocio:hover {
  border-color: #ffaa00;
  transform: translateX(4px);
}

.tipo-btn.negocio {
  border-color: #e0e0e0;
}

.tipo-btn.negocio:hover {
  border-color: #ffaa00;
  background: #fffaf0;
}

.tipo-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.tipo-texto {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tipo-texto strong {
  font-size: 14px;
  color: #1a1a2e;
  font-weight: 700;
}

.tipo-texto small {
  font-size: 12px;
  color: #888;
}

.tipo-btn.active .tipo-texto strong {
  color: #0077cc;
}

/* Separador */
.separator {
  text-align: center;
  position: relative;
  margin: 4px 0;
}

.separator::before,
.separator::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 42%;
  height: 1px;
  background: #ddd;
}

.separator::before { left: 0; }
.separator::after { right: 0; }

.separator span {
  background: #f8f9fa;
  padding: 0 10px;
  color: #aaa;
  font-size: 13px;
}

/* Social */
.social-login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  color: #333;
  transition: all 0.25s;
}

.social-btn:hover {
  border-color: #aaa;
  transform: translateY(-1px);
}

.fb-icon {
  background: #1877f2;
  color: white;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 800;
  font-size: 13px;
}

/* Banner propietarios */
.banner-negocio {
  margin-top: 28px;
  background: linear-gradient(135deg, #ff8c00, #ffaa00);
  border-radius: 14px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  transition: transform 0.25s, box-shadow 0.25s;
}

.banner-negocio:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(255, 140, 0, 0.35);
}

.banner-izq {
  display: flex;
  align-items: center;
  gap: 12px;
}

.banner-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.banner-title {
  font-size: 14px;
  font-weight: 700;
  color: #4a2200;
  margin: 0 0 3px;
}

.banner-sub {
  font-size: 12px;
  color: #7a3800;
  margin: 0;
}

.banner-btn {
  background: white;
  color: #e67e00;
  font-weight: 700;
  font-size: 13px;
  padding: 10px 18px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  font-family: inherit;
  transition: all 0.2s;
  flex-shrink: 0;
}

.banner-btn:hover {
  background: #fff8f0;
}

/* Responsive */
@media (max-width: 768px) {
  .register-page { flex-direction: column; }
  .register-left {
    width: 100%;
    min-height: 260px;
  }
  .left-content h2 { font-size: 26px; }
  .register-right { width: 100%; padding: 40px 20px; }
}
</style>
