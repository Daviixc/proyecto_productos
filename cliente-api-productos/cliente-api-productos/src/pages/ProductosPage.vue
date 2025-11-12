<template>
  <h1>Productos</h1>
  <div class="muted">
    {{ statusMsg }}
    <span v-if="filtered.length !== productos.length">
      · Mostrando {{ filtered.length }} de {{ productos.length }}
    </span>
  </div>

  <!-- Controles de filtro -->
  <div class="filters">
    <input v-model.trim="q" placeholder="Buscar (nombre / descripción)" />

    <select v-model="categoria">
      <option value="">Todas las categorías</option>
      <option v-for="c in categorias" :key="c" :value="c">{{ c }}</option>
    </select>

    <select v-model="marca">
      <option value="">Todas las marcas</option>
      <option v-for="m in marcas" :key="m" :value="m">{{ m }}</option>
    </select>

    <input v-model.number="min" type="number" step="0.01" placeholder="Precio min" />
    <input v-model.number="max" type="number" step="0.01" placeholder="Precio max" />

    <button class="muted" @click="limpiarFiltros">Limpiar</button>
  </div>

  <!-- Formulario crear/editar -->
  <ProductoForm
    :producto="productoEdit"
    @submit="guardarProducto"
    @cancel="cancelarEdicion"
  />

  <!-- Tabla -->
  <ProductosTable
    :productos="filtered"
    @editar="editarProducto"
    @eliminar="eliminarProducto"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getProductos, createProducto, updateProducto, deleteProducto } from '../services/api'
import ProductoForm from '../components/ProductoForm.vue'
import ProductosTable from '../components/ProductosTable.vue'

const productos = ref([])
const productoEdit = ref(null)
const statusMsg = ref('')

// ------- Filtros -------
const q = ref('')           // texto
const categoria = ref('')   // categoría seleccionada
const marca = ref('')       // marca seleccionada
const min = ref()           // precio min (número o undefined)
const max = ref()           // precio max

// Opciones únicas derivadas de los datos
const categorias = computed(() => [...new Set(productos.value
  .map(p => p.categoria).filter(Boolean))].sort())

const marcas = computed(() => [...new Set(productos.value
  .map(p => p.marca).filter(Boolean))].sort())

// Lista filtrada
const filtered = computed(() => {
  const text = q.value.toLowerCase()
  return productos.value.filter(p => {
    const okText =
      !text ||
      (p.nombre && p.nombre.toLowerCase().includes(text)) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(text))

    const okCat = !categoria.value || p.categoria === categoria.value
    const okMarca = !marca.value || p.marca === marca.value

    const price = Number(p.precio)
    const okMin = (min.value === undefined || min.value === null || min.value === '') || price >= Number(min.value)
    const okMax = (max.value === undefined || max.value === null || max.value === '') || price <= Number(max.value)

    return okText && okCat && okMarca && okMin && okMax
  })
})

function limpiarFiltros () {
  q.value = ''
  categoria.value = ''
  marca.value = ''
  min.value = ''
  max.value = ''
}

// ------- CRUD existente -------
async function cargarProductos(){
  statusMsg.value = 'Cargando...'
  try{
    productos.value = await getProductos()
    statusMsg.value = `Listo. ${productos.value.length} productos.`
  }catch(e){ statusMsg.value = 'Error: ' + (e?.message || e) }
}

async function guardarProducto(p){
  try{
    if (productoEdit.value){
      await updateProducto(productoEdit.value.id, p)
      statusMsg.value = 'Producto actualizado.'
    } else {
      await createProducto(p)
      statusMsg.value = 'Producto agregado.'
    }
    productoEdit.value = null
    await cargarProductos()
  }catch(e){ statusMsg.value = 'Error al guardar: ' + (e?.message || e) }
}

function editarProducto(p){ productoEdit.value = { ...p } }
function cancelarEdicion(){ productoEdit.value = null }

async function eliminarProducto(id){
  if(!confirm(`¿Eliminar producto ${id}?`)) return
  try{
    await deleteProducto(id)
    statusMsg.value = 'Producto eliminado.'
    await cargarProductos()
  }catch(e){ statusMsg.value = 'Error al eliminar: ' + (e?.message || e) }
}

onMounted(cargarProductos)
</script>

<style scoped>
.filters{
  display:flex; flex-wrap:wrap; gap:8px; margin: 8px 0 16px;
}
.filters input, .filters select {
  padding:8px; border:1px solid #d0d5dd; border-radius:8px;
}
button.muted{ background:#f2f4f7; border:0; border-radius:8px; padding:8px 12px; cursor:pointer; }
</style>

