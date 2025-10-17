# Projeto: Encontra-MT

## Sobre o Projeto

O **Encontra-MT** é um sistema de gerenciamento de pessoas desaparecidas, desenvolvido utilizando Vue.js no front-end e integrando com APIs para exibição de informações. Inclui funcionalidades como busca filtrada, detalhes de pessoas e interface responsiva.

---

## Tecnologias Utilizadas

- **Front-end:** Vue.js 3, PrimeVue, Tailwind CSS
- **Ferramentas:** Git, Docker, VS Code

---

## Pré-requisitos

- Node.js >= 20
- npm >= 9
- Docker (opcional, para deploy)
- Navegador moderno (Chrome, Edge, Firefox)

---

## Passo a Passo para Instalação e Execução

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd encontra-mt

docker build -t encontra-mt .
docker run -p 8080:80 encontra-mt
```
