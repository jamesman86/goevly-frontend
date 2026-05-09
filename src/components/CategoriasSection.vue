<template>
  <div class="categorias-wrapper">
    <div class="categorias-container">
      <div 
        class="cat" 
        v-for="item in items" 
        :key="item.text"
        @click="navigateToCategory(item)"
      >
        <div class="cat-icon">
          <img :src="item.icon" :alt="item.text"/>
        </div>
        <span class="cat-text">{{ item.text }}</span>
      </div>
    </div>
  </div>
</template>
 
<script>
 
 
export default {
    name: 'CategoriasSection',
    data(){
        return{
            items: [
                {
                    text: 'Tours',
                    icon: require('@/assets/iconoplaya.png'),
                    route: '/categoria/tours',
                    id: 'tours'
                },
                {
                    text: 'Guías', 
                    icon: require('@/assets/guia-turistico.png'),
                    route: '/categoria/guias',
                    id: 'guias'
                },
                {
                    text: 'Comida', 
                    icon: require('@/assets/cutlery.png'),
                    route: '/categoria/comida',
                    id: 'comida'
                },
                {
                    text: 'Transporte', 
                    icon: require('@/assets/lancha-rapida.png'),
                    route: '/categoria/transporte',
                    id: 'transporte'
                }
            ]
                
        }
    },
    methods: {
        navigateToCategory(category){
            // navegar a la pagina de la categoria seleccionada
            this.$router.push(category.route)
 
            // tambien puedes emitir un evento si necesitas usarlo en el componente padre
            this.$emit('category-selected', category)
 
            console.log(`Navegando a: ${category.text}`)
        }
    }
}
</script>
 
<style>
.categorias-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0;
    margin-top: -20px;
    
    border-radius: 12px;
    overflow: hidden;
    backdrop-filter: none;
    position: relative;
}
 
.categorias-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  background: linear-gradient(to right, #8ecaf3, #fcc47b);
  width: 90%;
  margin: 0 auto;
}
 
.cat{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
}
 
.cat:hover {
  
  transform: translateY(-4px);
}
 
.cat:not(:last-child){
    border-right: 1px solid rgba(255,255,255,0.9);
}
 
.cat-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  border-radius: 50%;
  margin-bottom: 12px;
  transition: all 0.3s;
 
}
 
.cat:hover .cat-icon {
  background: #0077cc20;
  transform: scale(1.1);
}
 
.cat-icon img{
    width: 40px;
    height: 40px;
    object-fit: contain;
    display: block;
 
}
 
.cat-text {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
 
@media (max-width: 768px) {
  .categorias-wrapper {
    margin-top: -30px;
    padding: 0 15px;
  }
  
  .cat-icon {
    width: 42px;
    height: 42px;
  }
  
  .cat-icon img {
    width: 28px;
    height: 28px;
  }
  
  .cat-text {
    font-size: 12px;
  }
  
  .cat {
    padding: 16px 12px;
  }
}
 
@media (max-width: 480px) {
  .categorias-container {
    flex-direction: row;
    width: 95%;
    flex-wrap: nowrap;
  }

  .cat {
    flex: 1;
    padding: 12px 6px;
    flex-direction: column;
    border-right: 1px solid rgba(255,255,255,0.5) !important;
    border-bottom: none;
  }

  .cat:last-child {
    border-right: none !important;
  }

  .cat-icon {
    width: 36px;
    height: 36px;
    margin-bottom: 8px;
  }

  .cat-icon img {
    width: 26px;
    height: 26px;
  }

  .cat-text {
    font-size: 11px;
    font-weight: 600;
  }
}
</style>