<template>
  <form @submit.prevent="onSubmit" class="form">
    <input
      v-model.trim="form.nombre"
      placeholder="Nombre"
      required
      :class="{ invalid: errors.nombre }"
    />
    <input
      v-model.number="form.precio"
      type="number"
      step="0.01"
      placeholder="Precio"
      required
      :class="{ invalid: errors.precio }"
    />
    <input v-model.trim="form.descripcion" placeholder="Descripción" />
    <input v-model.trim="form.marca" placeholder="Marca" />
    <input v-model.trim="form.categoria" placeholder="Categoría" />
    <button type="submit" class="primary">{{ editing ? 'Actualizar' : 'Agregar' }}</button>
    <button v-if="editing" type="button" class="muted" @click="cancelar">Cancelar</button>

    <!-- mensajes de error -->
    <div v-if="Object.keys(errors).length" class="error-box">
      <ul>
        <li v-for="(msg,key) in errors" :key="key">{{ msg }}</li>
      </ul>
    </div>
  </form>
</template>

<script setup>
import { reactive, watch, computed } from 'vue'

const emit = defineEmits(['submit','cancel'])
const props = defineProps({ producto: { type: Object, default: null } })

const form = reactive({ nombre:'', precio:'', descripcion:'', marca:'', categoria:'' })
const errors = reactive({})
const editing = computed(() => !!props.producto)

watch(() => props.producto, (val) => {
  if (val) Object.assign(form, val)
  else Object.keys(form).forEach(k => form[k] = '')
  clearErrors()
})

function clearErrors() {
  for (const k of Object.keys(errors)) delete errors[k]
}

function validate() {
  clearErrors()
  if (!form.nombre.trim()) errors.nombre = 'El nombre es obligatorio.'
  if (form.precio === '' || form.precio === null || Number.isNaN(form.precio))
    errors.precio = 'El precio es obligatorio.'
  else if (form.precio < 0)
    errors.precio = 'El precio no puede ser negativo.'
  return Object.keys(errors).length === 0
}

function onSubmit() {
  if (!validate()) return
  emit('submit', { ...form })
}

function cancelar() {
  clearErrors()
  emit('cancel')
}
</script>

<style scoped>
.form{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
input{flex:1 1 180px;padding:8px;border:1px solid #d0d5dd;border-radius:8px}
input.invalid{border-color:#e11d48;background:#fff5f5}
button{padding:8px 12px;border:0;border-radius:8px;cursor:pointer}
.primary{background:#0ea5e9;color:#fff}.muted{background:#f2f4f7}
.error-box{width:100%;margin-top:10px;background:#fee2e2;color:#b91c1c;padding:8px;border-radius:8px;font-size:0.9rem}
.error-box ul{margin:0;padding-left:18px}
</style>

