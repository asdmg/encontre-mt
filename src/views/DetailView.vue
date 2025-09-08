<script setup>
import moment from 'moment';
import Toast from 'primevue/toast';
import placeholderImg from '@/assets/img/placeholder.svg';

import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { buscarPessoa } from '@/services/api';
import { toastMessage } from '@/stores/toastStore';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const route = useRoute();
const router = useRouter();
const pessoa = ref(null);

async function load() {
  try {
    pessoa.value = await buscarPessoa(route.params.id);
  } catch (err) {
    alert(err.message);
  }
}

function adicionarInformacao() {
  router.push({ name: 'infoForm', params: { id: pessoa.value.ocoId } });
}

onMounted(() => {
  load();

  if (toastMessage.value) {
    toast.add({
      severity: 'success',
      summary: 'Informação',
      detail: toastMessage.value,
      life: 3000,
    });
    toastMessage.value = '';
  }
});
</script>

<template>
  <Toast />
  <div
    class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl max-w-7xl mx-auto border border-surface-200 dark:border-surface-700 w-full shadow-lg"
  >
    <div v-if="pessoa" class="flex flex-col lg:flex-row gap-8">
      <div class="relative w-full lg:w-96 h-96 flex-shrink-0">
        <img
          :src="pessoa.foto || placeholderImg"
          class="w-full h-full object-cover rounded-xl shadow-md"
        />
        <div
          class="absolute bottom-0 left-0 w-full text-center py-2 font-semibold rounded-b-xl"
          :class="
            pessoa.status ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          "
        >
          {{ pessoa.status ? 'Localizada (o)' : 'Desaparecida (o)' }}
        </div>
      </div>

      <div class="flex flex-col justify-between flex-1">
        <div>
          <h1 class="text-3xl font-bold mb-4">{{ pessoa.nome }}</h1>

          <div class="space-y-2">
            <p><span class="font-semibold">Idade:</span> {{ pessoa.idade }}</p>
            <p><span class="font-semibold">Sexo:</span> {{ pessoa.sexo }}</p>
          </div>

          <hr class="my-4 border-surface-200 dark:border-surface-700" />

          <h2 class="text-lg font-semibold mb-2">
            Detalhes do Desaparecimento
          </h2>
          <div class="space-y-2 text-sm leading-relaxed">
            <p>
              <span class="font-semibold">Desaparecido em:</span>
              {{ moment(pessoa.desaparecimento).format('DD/MM/YYYY HH:mm') }}
            </p>
            <p><span class="font-semibold">Local:</span> {{ pessoa.local }}</p>
            <p>
              <span class="font-semibold">Vestimentas:</span>
              {{ pessoa.vestimentas }}
            </p>
            <p>
              <span class="font-semibold">Descrição:</span>
              {{ pessoa.descricao }}
            </p>
          </div>
        </div>

        <div class="flex gap-4 mt-6">
          <Button @click="$router.back()" class="flex-1" severity="warn"
            >Voltar</Button
          >
          <Button @click="adicionarInformacao" class="flex-1"
            >Adicionar informações</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>
