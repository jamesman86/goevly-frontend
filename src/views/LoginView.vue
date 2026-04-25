<template>
  <div class="login-page">
    <ToastNotification ref="toast" />

    <!-- Panel izquierdo — imagen y lema -->
    <div class="login-left">
      <div class="left-overlay"></div>
      <div class="left-content">
        <img src="../assets/goevlylogo.png" alt="Goevly" class="left-logo" @click="goToHome">
        <h2>Tu próxima aventura<br>te está esperando</h2>
        <p>Inicia sesión y sigue descubriendo las mejores experiencias del Caribe colombiano.</p>
        <div class="left-tags">
          <span>🌊 Tours</span>
          <span>🍽️ Comida típica</span>
          <span>🧭 Guías locales</span>
          <span>🚤 Transporte</span>
        </div>
      </div>
    </div>

    <!-- Panel derecho — formulario -->
    <div class="login-right">
      <div class="form-wrapper">

        <div class="form-header">
          <h1>Bienvenido de vuelta</h1>
          <p>Conoce más de la ciudad a un solo clic</p>
        </div>

        <form @submit.prevent="handleLogin" class="auth-form">

          <!-- Email -->
          <div class="form-group">
            <label>Email</label>
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

          <!-- Contraseña -->
          <div class="form-group">
            <label>Contraseña</label>
            <div class="input-icon">
              <span class="icon">🔒</span>
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                placeholder="••••••••"
                required
                :class="{ 'error': errors.password }"
              >
              <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
            <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
          </div>

          <!-- Opciones -->
          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="rememberMe">
              <span>Recordarme</span>
            </label>
            <a href="#" class="forgot-link" @click.prevent="forgotPassword">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <!-- Botón -->
          <button type="submit" class="btn-login" :disabled="loading">
            <span v-if="!loading">Explorar Santa Marta</span>
            <span v-else class="spinner"></span>
          </button>

          <!-- Separador -->
          <div class="separator"><span>o continúa con</span></div>

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

          <p class="register-link">
            ¿No tienes cuenta?
            <router-link to="/registro">Regístrate gratis</router-link>
          </p>

        </form>

      </div>
    </div>
  </div>
</template>

<script>
import ToastNotification from '@/components/ToastNotification.vue'

export default {
  name: 'LoginView',
  components: { ToastNotification },
  data() {
    return {
      form: { email: '', password: '' },
      errors: { email: '', password: '' },
      showPassword: false,
      rememberMe: false,
      loading: false
    }
  },
  mounted() {
    const remembered = localStorage.getItem('remember_email')
    if (remembered) {
      this.form.email = remembered
      this.rememberMe = true
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    validateForm() {
      let valid = true
      this.errors = { email: '', password: '' }

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

      return valid
    },
    async handleLogin() {
      if (!this.validateForm()) return
      this.loading = true

      try {
        await new Promise(resolve => setTimeout(resolve, 1200))

        const usuarios = JSON.parse(localStorage.getItem('registered_users') || '[]')
        const cuenta = usuarios.find(user =>
          user.email === this.form.email && user.password === this.form.password
        )

        if (cuenta) {
          const userData = {
            email: this.form.email,
            fullName: cuenta.fullName,
            role: cuenta.role,
            ...(cuenta.businessId && { businessId: cuenta.businessId })
          }

          localStorage.setItem('auth_token', 'fake-jwt-token-' + Date.now())
          localStorage.setItem('user_data', JSON.stringify(userData))

          if (this.rememberMe) {
            localStorage.setItem('remember_email', this.form.email)
          } else {
            localStorage.removeItem('remember_email')
          }

          this.$refs.toast.show(
            `¡Bienvenido, ${cuenta.fullName.split(' ')[0]}! 🌊`,
            'success'
          )

          setTimeout(() => {
            if (userData.role === 'empresario') {
              this.$router.push('/dashboard')
            } else {
              this.$router.push('/')
            }
          }, 1000)

        } else {
          this.$refs.toast.show('Email o contraseña incorrectos', 'error')
        }
      } catch (error) {
        console.error(error)
        this.$refs.toast.show('Error al iniciar sesión. Intenta nuevamente.', 'error')
      } finally {
        this.loading = false
      }
    },
    socialLogin(provider) {
      this.$refs.toast.show(`Login con ${provider} — próximamente`, 'info')
    },
    forgotPassword() {
      this.$refs.toast.show('Recuperación de contraseña — próximamente', 'info')
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  min-height: 100vh;
}

/* Panel izquierdo */
.login-left {
  position: relative;
  width: 45%;
  background-image: url('@/assets/Minca1.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.left-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(0,50,120,0.88), rgba(0,0,0,0.55));
}

.left-content {
  position: relative;
  z-index: 2;
  padding: 40px;
  color: white;
}

.left-logo {
  width: 180px;
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
.login-right {
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

.input-icon input.error { border-color: #f44336; }

.toggle-password {
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
}

.error-msg { color: #f44336; font-size: 12px; }

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #555;
  cursor: pointer;
}

.remember-me input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #0077cc;
}

.forgot-link {
  color: #0077cc;
  text-decoration: none;
  font-weight: 500;
  font-size: 13px;
}

.forgot-link:hover { text-decoration: underline; }

.btn-login {
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
  margin-top: 4px;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,119,204,0.35);
}

.btn-login:disabled { opacity: 0.65; cursor: not-allowed; }

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

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

.register-link {
  text-align: center;
  color: #666;
  font-size: 14px;
}

.register-link a {
  color: #0077cc;
  font-weight: 600;
  text-decoration: none;
}

.register-link a:hover { text-decoration: underline; }

/* Responsive */
@media (max-width: 768px) {
  .login-page { flex-direction: column; }
  .login-left {
    width: 100%;
    min-height: 240px;
  }
  .left-content h2 { font-size: 26px; }
  .login-right { width: 100%; padding: 40px 20px; }
}
</style>
