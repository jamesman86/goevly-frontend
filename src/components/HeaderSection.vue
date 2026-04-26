<template>
  <header class="header">
    <!-- Logo -->
    <router-link to="/" class="logo-link">
      <div class="logo">
        <img src="../assets/goevlylogo.png" alt="goevly">
      </div>
    </router-link>

    <!-- DESKTOP: botones auth o avatar -->
    <div class="desktop-auth">
      <!-- Sin sesión -->
      <template v-if="!isLoggedIn">
        <router-link to="/login" class="btn-login">Iniciar sesion</router-link>
        <router-link to="/registro" class="btn-register">Registrarse</router-link>
      </template>

      <!-- Con sesión — avatar con inicial -->
      <template v-else>
        <div class="avatar-menu">
          <div class="avatar" @click="toggleUserMenu">
            {{ inicial }}
          </div>
          <div v-if="userMenuOpen" class="user-dropdown">
            <div class="dropdown-header">
              <div class="avatar-sm">{{ inicial }}</div>
              <div>
                <p class="dropdown-name">{{ userName }}</p>
                <p class="dropdown-role">{{ userRole === 'empresario' ? 'Propietario' : 'Explorador' }}</p>
              </div>
            </div>
            <hr class="dropdown-divider">
            <router-link v-if="userRole === 'empresario'" to="/dashboard" @click="userMenuOpen = false">
              Panel de negocio
            </router-link>
            <router-link to="/mis-reservas" @click="userMenuOpen = false">
              Mis reservas
            </router-link>
            <hr class="dropdown-divider">
            <button @click="logout" class="dropdown-logout">
              Cerrar sesion
            </button>
          </div>
        </div>
      </template>
    </div>

    <!-- MÓVIL: hamburguesa sin sesión / avatar con sesión -->
    <div class="mobile-auth">
      <!-- Sin sesión — hamburguesa -->
      <button v-if="!isLoggedIn" class="menu-btn" type="button" @click="toggleMenu" aria-label="Abrir menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Con sesión — avatar -->
      <div v-else class="avatar-menu">
        <div class="avatar" @click="toggleUserMenu">
          {{ inicial }}
        </div>
        <div v-if="userMenuOpen" class="user-dropdown mobile-dropdown">
          <div class="dropdown-header">
            <div class="avatar-sm">{{ inicial }}</div>
            <div>
              <p class="dropdown-name">{{ userName }}</p>
              <p class="dropdown-role">{{ userRole === 'empresario' ? 'Propietario' : 'Explorador' }}</p>
            </div>
          </div>
          <hr class="dropdown-divider">
          <router-link to="/" @click="userMenuOpen = false">Inicio</router-link>
          <router-link to="/categoria/tours" @click="userMenuOpen = false">Tours</router-link>
          <router-link to="/categoria/guias" @click="userMenuOpen = false">Guias</router-link>
          <router-link to="/categoria/comida" @click="userMenuOpen = false">Comida</router-link>
          <router-link to="/categoria/transporte" @click="userMenuOpen = false">Transporte</router-link>
          <hr class="dropdown-divider">
          <router-link v-if="userRole === 'empresario'" to="/dashboard" @click="userMenuOpen = false">
            Panel de negocio
          </router-link>
          <router-link to="/mis-reservas" @click="userMenuOpen = false">
            Mis reservas
          </router-link>
          <hr class="dropdown-divider">
          <button @click="logout" class="dropdown-logout">Cerrar sesion</button>
        </div>
      </div>
    </div>

    <!-- Menú móvil sin sesión -->
    <div class="mobile-menu" v-if="menuOpen && !isLoggedIn">
      <router-link to="/" @click="menuOpen = false">Inicio</router-link>
      <router-link to="/categoria/tours" @click="menuOpen = false">Tours</router-link>
      <router-link to="/categoria/guias" @click="menuOpen = false">Guias</router-link>
      <router-link to="/categoria/comida" @click="menuOpen = false">Comida</router-link>
      <router-link to="/categoria/transporte" @click="menuOpen = false">Transporte</router-link>
      <hr>
      <router-link to="/login" @click="menuOpen = false">Iniciar sesion</router-link>
      <router-link to="/registro" @click="menuOpen = false">Registrarse</router-link>
    </div>

  </header>
</template>

<script>
export default {
  name: 'HeaderSection',
  data() {
    return {
      menuOpen: false,
      userMenuOpen: false,
      isLoggedIn: false,
      userName: '',
      userRole: '',
      inicial: ''
    }
  },
  mounted() {
    this.checkAuth()
    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
      this.userMenuOpen = false
    },
    toggleUserMenu() {
      this.userMenuOpen = !this.userMenuOpen
      this.menuOpen = false
    },
    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.userMenuOpen = false
        this.menuOpen = false
      }
    },
    checkAuth() {
      try {
        const token = localStorage.getItem('auth_token')
        const userData = localStorage.getItem('user_data')
        if (token && userData) {
          const user = JSON.parse(userData)
          this.isLoggedIn = true
          this.userName = user.fullName?.split(' ')[0] || 'Usuario'
          this.userRole = user.role || ''
          this.inicial = (user.fullName || 'U')[0].toUpperCase()
        } else {
          this.isLoggedIn = false
          this.userName = ''
          this.userRole = ''
          this.inicial = ''
        }
      } catch(e) {
        this.isLoggedIn = false
      }
    },
    logout() {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      this.isLoggedIn = false
      this.userRole = ''
      this.userMenuOpen = false
      this.inicial = ''
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
}

.logo-link { text-decoration: none; }

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  display: block;
  width: 160px;
  
}

/* Auth desktop */
.desktop-auth {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Auth móvil */
.mobile-auth { display: none; }

/* Botones */
.btn-login {
  padding: 8px 20px;
  border: 2px solid #0077cc;
  background: transparent;
  color: #0077cc;
  border-radius: 25px;
  font-weight: 600;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s;
}
.btn-login:hover { background: #0077cc; color: white; }

.btn-register {
  padding: 8px 20px;
  border: none;
  background: #0077cc;
  color: white;
  border-radius: 25px;
  font-weight: 600;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s;
}
.btn-register:hover { background: #005fa3; transform: translateY(-2px); }

/* Avatar */
.avatar-menu { position: relative; }

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0077cc, #005fa3);
  color: white;
  font-weight: 800;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
  user-select: none;
}
.avatar:hover { transform: scale(1.08); }

/* Dropdown */
.user-dropdown {
  position: absolute;
  top: 50px;
  right: 0;
  background: white;
  border-radius: 14px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
  min-width: 220px;
  z-index: 1000;
  overflow: hidden;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.dropdown-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
}

.avatar-sm {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0077cc, #005fa3);
  color: white;
  font-weight: 800;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.dropdown-name {
  font-weight: 700;
  font-size: 14px;
  color: #1a1a2e;
  margin: 0;
}

.dropdown-role {
  font-size: 12px;
  color: #0077cc;
  margin: 0;
  font-weight: 500;
}

.dropdown-divider {
  border: none;
  border-top: 1px solid #f0f0f0;
  margin: 4px 0;
}

.user-dropdown a {
  display: block;
  padding: 12px 16px;
  text-decoration: none;
  color: #333;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}
.user-dropdown a:hover { background: #f8f9fa; }

.dropdown-logout {
  display: block;
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  background: none;
  border: none;
  color: #ff4444;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s;
}
.dropdown-logout:hover { background: #fff5f5; }

.menu-btn {
  width: 42px;
  height: 42px;
  border: 1px solid #d7e1ea;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.menu-btn span {
  width: 18px;
  height: 2px;
  background: #1f2933;
  border-radius: 999px;
}

/* Menú móvil sin sesión */
.mobile-menu {
  position: absolute;
  top: 65px;
  right: 15px;
  background: white;
  padding: 10px;
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 200px;
  z-index: 999;
}

.mobile-menu a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 15px;
  transition: background 0.2s;
}
.mobile-menu a:hover { background: #f5f5f5; }
.mobile-menu hr { border: 0.5px solid #eee; margin: 4px 0; }

/* Dropdown móvil más ancho */
.mobile-dropdown {
  right: -10px;
  min-width: 260px;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .header { padding: 10px 20px; }
  .logo img { width: 125px; }
  .desktop-auth { display: none; }
  .mobile-auth { display: flex; align-items: center; }
}

@media (max-width: 430px) {
  .header { padding: 10px 16px; }
  .logo img { width: 115px; }
  .mobile-dropdown { right: -16px; min-width: 240px; }
}
</style>
