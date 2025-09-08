import axios from 'axios';
import router from '@/router';

const api = axios.create({
  baseURL: 'https://abitus-api.geia.vip/v1',
  timeout: 10000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.code === 'ECONNABORTED' || !err.response) {
      router.push({ name: 'serverError' });
    }
    return Promise.reject(
      new Error(
        err.response?.data?.message || err.message || 'Erro de requisição'
      )
    );
  }
);

export async function buscarPessoas(filtros = {}) {
  const res = await api.get('/pessoas/aberto/filtro', {
    params: {
      nome: filtros.nome || undefined,
      faixaIdadeInicial: filtros.faixaIdadeInicial || undefined,
      faixaIdadeFinal: filtros.faixaIdadeFinal || undefined,
      sexo: filtros.sexo || undefined,
      status: filtros.status || undefined,
      pagina: filtros.pagina ?? 0,
      porPagina: filtros.porPagina ?? 10,
    },
  });

  return {
    total: res.data.totalElements,
    totalPages: res.data.totalPages,
    items: res.data.content.map((item) => ({
      id: item.id,
      nome: item.nome,
      idade: item.idade,
      sexo: item.sexo,
      vivo: item.vivo,
      foto: item.urlFoto,
      desaparecimento: item.ultimaOcorrencia?.dtDesaparecimento,
      local: item.ultimaOcorrencia?.localDesaparecimentoConcat,
      descricao:
        item.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao || '',
      vestimentas:
        item.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO
          ?.vestimentasDesaparecido || '',
    })),
  };
}

export async function buscarPessoa(id) {
  const res = await api.get(`/pessoas/${id}`);
  return {
    id: res.data.id,
    nome: res.data.nome,
    idade: res.data.idade,
    sexo: res.data.sexo,
    vivo: res.data.vivo,
    foto: res.data.urlFoto,
    ocoId: res.data.ultimaOcorrencia?.ocoId,
    status: res.data.ultimaOcorrencia?.encontradoVivo,
    desaparecimento: res.data.ultimaOcorrencia?.dtDesaparecimento,
    local: res.data.ultimaOcorrencia?.localDesaparecimentoConcat,
    descricao:
      res.data.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao || '',
    vestimentas:
      res.data.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO
        ?.vestimentasDesaparecido || '',
  };
}

export async function postInfoWithFiles(payload) {
  const form = new FormData();
  form.append('informacao', payload.informacao);
  form.append('descricao', payload.descricao);
  form.append('data', payload.data);
  form.append('ocoId', payload.ocoId);

  if (payload.files && payload.files.length) {
    payload.files.forEach((file) => form.append('files', file));
  }

  const res = await api.post('/ocorrencias/informacoes-desaparecido', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
}

export default api;
