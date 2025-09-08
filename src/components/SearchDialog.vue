<script setup>
import { ref, watch } from 'vue';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import InputNumber from 'primevue/inputnumber';

const props = defineProps({
  visible: Boolean,
});
const emit = defineEmits(['update:visible', 'search']);

const dialogVisible = ref(props.visible);

const defaultFilters = {
  nome: '',
  faixaIdadeInicial: null,
  faixaIdadeFinal: null,
  sexo: null,
  status: 'DESAPARECIDO',
};

const filtersDialog = ref({ ...defaultFilters });

const sexosOptions = [
  { name: 'Masculino', value: 'MASCULINO' },
  { name: 'Feminino', value: 'FEMININO' },
];
const statusOptions = [
  { name: 'Desaparecido', value: 'DESAPARECIDO' },
  { name: 'Localizado', value: 'LOCALIZADO' },
];

function onSearch() {
  emit('search', { ...filtersDialog.value });
  emit('update:visible', false);

  filtersDialog.value = { ...defaultFilters };
}

watch(
  () => props.visible,
  (val) => (dialogVisible.value = val)
);
watch(dialogVisible, (val) => emit('update:visible', val));
</script>

<template>
  <Dialog
    class="w-1/2"
    header="Filtrar Pessoas Desaparecidas"
    v-model:visible="dialogVisible"
    :modal="true"
    :closable="true"
  >
    <div class="grid grid-cols-12 gap-3">
      <div class="col-span-12">
        <label>Nome</label>
        <InputText
          autofocus
          v-model="filtersDialog.nome"
          placeholder="Nome da pessoa"
          class="w-full"
        />
      </div>

      <div class="col-span-6">
        <label>Faixa Etária Inicial</label>
        <InputNumber
          v-model="filtersDialog.faixaIdadeInicial"
          inputId="horizontal-buttons"
          showButtons
          buttonLayout="horizontal"
          fluid
          :min="0"
          :max="99"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
      </div>
      <div class="col-span-6">
        <label>Faixa Etária Final</label>
        <InputNumber
          v-model="filtersDialog.faixaIdadeFinal"
          inputId="horizontal-buttons"
          showButtons
          buttonLayout="horizontal"
          fluid
          :min="0"
          :max="99"
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
      </div>

      <div class="col-span-6">
        <label>Sexo</label>
        <Select
          v-model="filtersDialog.sexo"
          :options="sexosOptions"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecione"
          class="w-full"
        />
      </div>
      <div class="col-span-6">
        <label>Status</label>
        <Select
          v-model="filtersDialog.status"
          :options="statusOptions"
          optionLabel="name"
          optionValue="value"
          placeholder="Selecione"
          class="w-full"
        />
      </div>

      <div class="col-span-12 flex justify-end gap-2 mt-4">
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button-text"
          @click="dialogVisible = false"
        />
        <Button label="Buscar" icon="pi pi-search" @click="onSearch" />
      </div>
    </div>
  </Dialog>
</template>
