<template>
  <div
    class="bg-surface-0 dark:bg-surface-900 p-2 rounded-2xl max-w-7xl mx-auto border border-surface-200 dark:border-surface-700 w-full"
  >
    <div
      class="flex flex-col sm:flex-row sm:justify-between items-center gap-2"
    >
      <div class="flex justify-center w-full sm:w-auto">
        <img src="@/assets/img/logo.webp" alt="Logo" class="w-42 h-auto" />
      </div>

      <span class="hidden sm:flex flex-col text-center">
        <span
          class="text-xl font-light text-surface-700 dark:text-surface-100 leading-none"
        >
          Projeto Prático — Encontre MT
        </span>
        <span class="text-sm font-medium text-primary leading-tight">
          Implementação front-end consumindo API de pessoas desaparecidas da PJC
          - MT.
        </span>
      </span>

      <div class="hidden sm:flex justify-center w-full sm:w-auto">
        <img src="@/assets/img/logo_pjc.svg" alt="Logo" class="w-12 h-auto" />
      </div>
    </div>
  </div>
</template>
