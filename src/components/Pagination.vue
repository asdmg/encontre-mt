<template>
  <div class="flex justify-center mt-4 gap-2">
    <Button
      label="Anterior"
      @click="prev"
      :disabled="page === 0"
      size="small"
    />
    <span class="mt-1.5">Página {{ page + 1 }} de {{ totalPages }}</span>
    <Button
      label="Próxima"
      @click="next"
      :disabled="page + 1 >= totalPages"
      size="small"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  page: Number,
  totalPages: Number,
});
const emit = defineEmits(['update:page']);

function prev() {
  if (props.page > 0) emit('update:page', props.page - 1);
}
function next() {
  if (props.page + 1 < props.totalPages) emit('update:page', props.page + 1);
}
</script>
