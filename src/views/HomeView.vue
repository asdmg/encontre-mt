<script setup>
import { ref } from 'vue';
import SearchDialog from '@/components/SearchDialog.vue';
import PersonList from '@/components/PersonList.vue';

const dialogVisible = ref(false);
const filters = ref({ pagina: 0, porPagina: 10 });

function onSearch(newFilters) {
  filters.value = { ...filters.value, ...newFilters };
}
</script>

<template>
  <div class="flex justify-center">
    <div class="w-full max-w-lg">
      <div
        class="flex items-center w-full rounded-full border border-primary-300 bg-white px-4 py-2 shadow-sm hover:border-primary-500 transition cursor-pointer"
        @click="dialogVisible = true"
      >
        <input
          type="text"
          placeholder="Pesquisar pessoas desaparecidas"
          readonly
          class="flex-1 bg-transparent outline-none cursor-pointer"
        />
        <i class="pi pi-search text-gray-500"></i>
      </div>
    </div>
  </div>

  <SearchDialog
    :visible="dialogVisible"
    @update:visible="dialogVisible = $event"
    @search="onSearch"
  />

  <PersonList :initialFilters="filters" />
</template>
