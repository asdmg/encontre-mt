<script setup>
import placeholderImg from '@/assets/img/placeholder.svg';

const props = defineProps({
  pessoa: { type: Object, required: true },
});
</script>

<template>
  <router-link :to="`/detalhes/${pessoa.id}`">
    <article class="bg-white h-full shadow rounded-lg overflow-hidden">
      <img
        :src="pessoa.foto || placeholderImg"
        class="w-full h-48 object-cover"
      />
      <div class="p-4">
        <h3 class="font-semibold">{{ pessoa.nome }}</h3>
        <p class="text-sm">Idade: {{ pessoa.idade }}</p>
        <p class="text-xs">Local: {{ pessoa.local }}</p>
      </div>
    </article>
  </router-link>
</template>

<style scoped></style>
