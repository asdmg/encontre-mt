<script setup>
import { ref, watch, onMounted } from 'vue';
import CardPerson from '@/components/CardPerson.vue';
import Pagination from '@/components/Pagination.vue';
import Skeleton from 'primevue/skeleton';
import { buscarPessoas } from '@/services/api';

const props = defineProps({
  initialFilters: {
    type: Object,
    default: () => ({ pagina: 0, porPagina: 10 }),
  },
});

const pessoas = ref([]);
const totalPages = ref(0);
const loading = ref(false);
const filtros = ref({ ...props.initialFilters });

watch(
  () => props.initialFilters,
  (newFilters) => {
    filtros.value = { ...newFilters };
    fetchPessoas();
  },
  { deep: true }
);

async function load() {
  loading.value = true;
  try {
    const data = await buscarPessoas(filtros.value);
    pessoas.value = data.items;
    totalPages.value = data.totalPages;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

function onPageChange(newPage) {
  filtros.value.pagina = newPage;
}

watch(() => filtros.value.pagina, load);
watch(
  () => props.initialFilters,
  (val) => {
    filtros.value = { ...val, pagina: 0 };
    load();
  },
  { deep: true }
);

onMounted(load);
</script>

<template>
  <div>
    <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
      <template v-if="loading">
        <article
          v-for="n in 5"
          :key="n"
          class="bg-white h-full shadow rounded-lg overflow-hidden"
        >
          <Skeleton height="10rem" class="w-full"></Skeleton>
          <div class="p-4">
            <Skeleton height="2rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem" class="mb-2"></Skeleton>
            <Skeleton height="2rem" class="mb-2"></Skeleton>
          </div>
        </article>
      </template>
      <template v-else>
        <CardPerson v-for="p in pessoas" :key="p.id" :pessoa="p" />
      </template>
    </div>
    <Pagination
      :page="filtros.pagina"
      :total-pages="totalPages"
      @update:page="onPageChange"
    />
  </div>
</template>
