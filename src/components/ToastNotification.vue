<template>
  <transition-group name="toast" tag="div" class="toast-container">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="['toast', toast.type]"
    >
      <span class="toast-icon">{{ icons[toast.type] }}</span>
      <span class="toast-message">{{ toast.message }}</span>
      <button class="toast-close" @click="remove(toast.id)">✕</button>
    </div>
  </transition-group>
</template>
 
<script>
export default {
  name: 'ToastNotification',
  data() {
    return {
      toasts: [],
      icons: {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
      }
    }
  },
  methods: {
    show(message, type = 'success', duration = 3500) {
      const id = Date.now()
      this.toasts.push({ id, message, type })
      setTimeout(() => this.remove(id), duration)
    },
    remove(id) {
      this.toasts = this.toasts.filter(t => t.id !== id)
    }
  }
}
</script>
 
<style scoped>
.toast-container {
  position: fixed;
  top: 85px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 340px;
}
 
.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
  font-size: 14px;
  font-weight: 500;
  background: white;
  border-left: 4px solid;
  animation: slideIn 0.3s ease;
}
 
.toast.success { border-color: #4caf50; color: #2e7d32; }
.toast.error   { border-color: #f44336; color: #c62828; }
.toast.warning { border-color: #ffaa00; color: #e65100; }
.toast.info    { border-color: #0077cc; color: #01579b; }
 
.toast-icon {
  font-size: 18px;
  flex-shrink: 0;
}
 
.toast-message {
  flex: 1;
  line-height: 1.4;
}
 
.toast-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #999;
  padding: 0;
  flex-shrink: 0;
  transition: color 0.2s;
}
 
.toast-close:hover {
  color: #333;
}
 
/* Animaciones de entrada y salida */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
 
.toast-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
 
.toast-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
 
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
 
@media (max-width: 480px) {
  .toast-container {
    right: 10px;
    left: 10px;
    max-width: none;
  }
}
</style>