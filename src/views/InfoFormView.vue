<script setup>
import moment from 'moment';
import Toast from 'primevue/toast';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { postInfoWithFiles } from '@/services/api';
import { toastMessage } from '@/stores/toastStore';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const route = useRoute();
const router = useRouter();

const ocoId = route.params.id;
const informacao = ref('');
const descricao = ref('');
const dataAvistamento = ref('');
const previewFotos = ref([]);
const fotos = ref([]);

function handleFileUpload(event) {
  fotos.value = Array.from(event.target.files);
  previewFotos.value = fotos.value.map((file) => URL.createObjectURL(file));
}

async function submitForm() {
  if (!informacao.value || !dataAvistamento.value) {
    alert('Preencha todos os campos obrigatórios!');
    return;
  }

  const payload = {
    informacao: informacao.value,
    descricao: descricao.value,
    data: moment(dataAvistamento.value, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    ocoId,
    files: fotos.value,
  };

  try {
    await postInfoWithFiles(payload);
    toastMessage.value = 'Informações enviadas com sucesso!';
    router.back();
  } catch (err) {
    console.error(err);
    toast.add({
      severity: 'info',
      summary: 'danger',
      detail: 'Erro ao enviar informações!',
      life: 3000,
    });
  }
}
</script>

<template>
  <Toast />
  <div
    class="bg-surface-0 dark:bg-surface-900 p-6 rounded-2xl border border-surface-200 dark:border-surface-700 min-h-screen py-10"
  >
    <div class="max-w-3xl mx-auto p-8">
      <h1
        class="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100"
      >
        Enviar Informações
      </h1>

      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="space-y-2">
          <label class="block text-gray-700 dark:text-gray-200 font-semibold"
            >Informação*</label
          >
          <Textarea
            required
            v-model="informacao"
            rows="3"
            cols="30"
            class="w-full"
            placeholder="Onde a pessoa foi vista"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 dark:text-gray-200 font-semibold"
            >Descrição do Anexo</label
          >
          <InputText
            required
            type="text"
            v-model="descricao"
            placeholder="Ex: Foto João da Silva"
            class="w-full"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 dark:text-gray-200 font-semibold"
            >Data do Avistamento*</label
          >
          <DatePicker
            required
            v-model="dataAvistamento"
            class="w-full"
            showIcon
            fluid
            iconDisplay="input"
            dateFormat="dd/mm/yy"
            inputId="icondisplay"
            placeholder="Selecione a data que foi avistado"
          />
        </div>

        <div class="space-y-2">
          <label class="block text-gray-700 dark:text-gray-200 font-semibold"
            >Fotos</label
          >
          <label
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
          >
            Escolher Fotos
            <input
              type="file"
              multiple
              accept="image/*"
              @change="handleFileUpload"
              class="hidden"
            />
          </label>

          <div v-if="previewFotos.length" class="flex flex-wrap mt-2 gap-2">
            <div
              v-for="(img, index) in previewFotos"
              :key="index"
              class="w-24 h-24 border border-gray-300 dark:border-surface-600 rounded overflow-hidden relative"
            >
              <img :src="img" class="w-full h-full object-cover" />
            </div>
          </div>

          <div
            v-if="fotos.length && !previewFotos.length"
            class="mt-2 text-sm text-gray-500"
          >
            {{ fotos.length }} arquivo(s) selecionado(s)
          </div>
        </div>

        <div class="flex gap-4 mt-6">
          <Button
            type="button"
            severity="warn"
            class="flex-1"
            @click="router.back()"
            >Cancelar</Button
          >
          <Button type="submit" class="flex-1" severity="success"
            >Enviar</Button
          >
        </div>
      </form>
    </div>
  </div>
</template>
