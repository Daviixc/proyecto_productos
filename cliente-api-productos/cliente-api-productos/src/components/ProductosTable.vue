<template>
  <table>
    <thead>
      <tr>
        <th>ID</th><th>Nombre</th><th>Precio</th>
        <th>Descripción</th><th>Marca</th><th>Categoría</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in productos" :key="p.id">
        <td>{{ p.id }}</td>
        <td>{{ p.nombre }}</td>
        <td>{{ p.precio }}</td>
        <td>{{ p.descripcion }}</td>
        <td>{{ p.marca }}</td>
        <td>{{ p.categoria }}</td>
        <td class="actions">
          <button @click="$emit('editar', p)">✏️ Editar</button>
          <button class="danger" @click="$emit('eliminar', p.id)">🗑️ Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({ productos: { type: Array, default: () => [] } })
defineEmits(['editar','eliminar'])
</script>

<style scoped>
table{width:100%;border-collapse:collapse}
th,td{padding:8px;border-bottom:1px solid #eee;text-align:left}
.actions{display:flex;gap:8px}
button{padding:6px 10px;border:0;border-radius:8px;cursor:pointer}
.danger{background:#e11d48;color:#fff}
</style>
