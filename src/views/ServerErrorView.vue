<template>
  <div class="flex flex-col items-center justify-center mt-16">
    <h1 class="text-4xl font-bold mb-4">Erro no Servidor</h1>
    <p class="text-lg">
      O servidor demorou para responder ou ocorreu um erro inesperado.
    </p>
    <button
      @click="$router.push({ name: 'home' })"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Voltar para Home
    </button>
  </div>
</template>
