<template>
  <header class="header">
    <router-link to="/" class="logo-link">
        <div class="logo">
            <img src="../assets/goevlylogo.png" alt="goevly">
        </div>
    </router-link>
    
    <div class="auth-buttons" v-if="!isLoggedIn">
        <router-link to="/login" class="btn-login">Iniciar Sesión</router-link>
        <router-link to="/registro" class="btn-register">Registrarse</router-link>
    </div>

    <div class="user-menu" v-else>
        <button class="user-btn" @click="toggleUserMenu">
           👤 {{ userName }} 
        </button>
        <div v-if="userMenuOpen" class="user-dropdown">
            <router-link v-if="userRole === 'empresario'" to="/dashboard">Panel de negocio</router-link>
            <router-link to="/mis-reservas">Mis Reservas</router-link>
            <button @click="logout">Cerrar Sesión</button>
        </div>
    </div>

    <div class="menu-btn" @click="toggleMenu">
        ☰
    </div>

    <div class="mobile-menu" v-if="menuOpen">
        <router-link to="/" @click="menuOpen = false">Inicio</router-link>
        <router-link to="/categoria/tours" @click="menuOpen = false">Tours</router-link>
        <router-link to="/categoria/guias" @click="menuOpen = false">Guías</router-link>
        <router-link to="/categoria/comida" @click="menuOpen = false">Comida</router-link>
        <router-link to="/categoria/transporte" @click="menuOpen = false">Transporte</router-link>
        <hr v-if="!isLoggedIn">
        <router-link v-if="!isLoggedIn" to="/login" @click="menuOpen = false">Iniciar Sesión</router-link>
        <router-link v-if="!isLoggedIn" to="/registro" @click="menuOpen = false">Registrarse</router-link>
        <template v-else>
            <router-link v-if="userRole === 'empresario'" to="/dashboard" @click="menuOpen = false">Panel de negocio</router-link>
            <router-link to="/mis-reservas" @click="menuOpen = false">Mis Reservas</router-link>
            <button @click="handleLogout" class="mobile-logout">Cerrar Sesión</button>
        </template>
    </div>
  </header>
</template>

<script>
export default {
    name: "HeaderSection",
    data(){
        return{
            menuOpen: false,
            userMenuOpen: false,
            isLoggedIn: false,
            userName: '',
            userRole: ''
        }
    },
    mounted() {
        this.checkAuth()
    },
    methods:{
        toggleMenu(){
            this.menuOpen = !this.menuOpen
            this.userMenuOpen = false
        },
        toggleUserMenu(){
            this.userMenuOpen = !this.userMenuOpen
        },
        checkAuth(){
            try {
                const token = localStorage.getItem('auth_token')
                const userData = localStorage.getItem('user_data')
                if (token && userData) {
                    const user = JSON.parse(userData)
                    // Verificar que el token no sea muy viejo (7 días)
                    const tokenTime = token.split('-').pop()
                    const ahora = Date.now()
                    const sieteGias = 7 * 24 * 60 * 60 * 1000
                    if (ahora - tokenTime > sieteGias) {
                        this.logout()
                        return
                    }
                    this.isLoggedIn = true
                    this.userName = user.fullName?.split(' ')[0] || 'Usuario'
                    this.userRole = user.role || ''
                } else {
                    this.isLoggedIn = false
                    this.userName = ''
                    this.userRole = ''
                }
            } catch(e) {
                this.isLoggedIn = false
            }
        },
        logout(){
            localStorage.removeItem('auth_token')
            localStorage.removeItem('user_data')
            this.isLoggedIn = false
            this.userRole = ''
            this.userMenuOpen = false
            this.$router.push('/')
        },
        handleLogout(){
            this.logout()
            this.menuOpen = false
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

.logo {
    display: flex;
    align-items: center;
}

.logo img {
    width: 140px;
}

.nav {
    display: flex;
    gap: 25px;
}

.nav a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
}

.auth-buttons {
    display: flex;
    gap: 10px;
}

.btn-login {
    padding: 8px 20px;
    border: 2px solid #0077cc;
    background: transparent;
    color: #0077cc;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 14px;
}

.btn-login:hover {
    background: #0077cc;
    color: white;
}

.btn-register {
    padding: 8px 20px;
    border: none;
    background: #0077cc;
    color: white;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 14px;
}

.btn-register:hover {
    background: #005fa3;
    transform: translateY(-2px);
}

.menu-btn {
    display: none;
    font-size: 26px;
    cursor: pointer;
}

.mobile-menu {
  position: absolute;
  top: 65px;
  right: 15px;
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
  z-index: 999;
}

.mobile-menu a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    padding: 10px 15px;
    border-radius: 8px;
    transition: background 0.3s;
    font-size: 15px;
}

.mobile-menu a:hover {
    background: #f5f5f5;
}

.mobile-menu hr {
    margin: 5px 0;
    border: 0.5px solid #eee;
}

.user-menu {
  position: relative;
}

.user-btn {
  padding: 8px 16px;
  background: #0077cc;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
}

.user-dropdown {
  position: absolute;
  top: 45px;
  right: 0;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  min-width: 180px;
  z-index: 100;
}

.user-dropdown a, .user-dropdown button {
  display: block;
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  text-decoration: none;
  color: #333;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.user-dropdown a:hover, .user-dropdown button:hover {
  background: #f5f5f5;
}

.mobile-logout {
  width: 100%;
  padding: 10px 15px;
  text-align: left;
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  font-size: 15px;
  font-family: inherit;
}

@media (max-width: 768px) {
    .nav { display: none; }
    .menu-btn { display: block; }
    .auth-buttons { display: none; }

    .header {
        padding: 10px 20px;
    }

    /* Logo más pequeño en móvil */
    .logo img {
        width: 110px;
    }
}
</style>