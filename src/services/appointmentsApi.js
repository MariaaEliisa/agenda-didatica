import { api } from './api';

const RESOURCE = '/dados';
const RECORD_TYPE = 'agendamento';

function ensureArray(data) {
  if (!Array.isArray(data)) {
    throw new Error('A resposta da API está em um formato inesperado.');
  }
  return data;
}

// A API é compartilhada. O aplicativo só exibe os registros com o tipo definido aqui.
export async function getAppointments() {
  const response = await api.get(RESOURCE);
  return ensureArray(response.data)
    .filter((item) => item.tipoRegistro === RECORD_TYPE)
    .sort((a, b) => {
      const dateA = `${a.data || ''} ${a.hora || ''}`;
      const dateB = `${b.data || ''} ${b.hora || ''}`;
      return dateA.localeCompare(dateB);
    });
}

export async function createAppointment(appointment) {
  const response = await api.post(RESOURCE, {
    ...appointment,
    tipoRegistro: RECORD_TYPE,
  });
  return response.data;
}

export async function updateAppointment(id, appointment) {
  const response = await api.put(`${RESOURCE}/${encodeURIComponent(id)}`, {
    ...appointment,
    tipoRegistro: RECORD_TYPE,
  });
  return response.data;
}

export async function deleteAppointment(id) {
  const response = await api.delete(`${RESOURCE}/${encodeURIComponent(id)}`);
  return response.data;
}
