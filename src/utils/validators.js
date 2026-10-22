function pad2(value) {
  return String(value).padStart(2, '0');
}

export function todayISO() {
  const now = new Date();
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
}

function isRealISODate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function validateAppointment({ titulo, descricao, data, hora }) {
  if (!titulo?.trim()) return 'Informe o título da atividade.';
  if (titulo.trim().length < 3) return 'O título deve ter pelo menos 3 caracteres.';
  if (!data?.trim()) return 'Informe a data da atividade.';
  if (!isRealISODate(data.trim())) return 'Use uma data válida no formato AAAA-MM-DD.';
  if (data.trim() < todayISO()) return 'A data não pode estar no passado.';
  if (!hora?.trim()) return 'Informe o horário da atividade.';
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(hora.trim())) return 'Use um horário válido no formato HH:MM.';
  if ((descricao || '').trim().length > 300) return 'A descrição pode ter no máximo 300 caracteres.';
  return '';
}
