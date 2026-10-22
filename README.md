# Agenda Didática — React Native + Expo + MockAPI

Aplicação acadêmica de tema livre para organizar estudos, tarefas e atividades. O projeto demonstra **arquitetura em camadas**, navegação, formulários controlados e CRUD usando Axios e MockAPI.

## Funcionalidades

- Tela inicial com atalhos.
- Listagem de atividades cadastradas.
- Busca por título.
- Cadastro com validação de título, data e horário.
- Edição e exclusão de atividades.
- Atualização da lista quando a tela recebe foco.
- Tratamento básico de erros de comunicação.

## Requisitos

- Node.js 20.19.x ou versão compatível com Expo SDK 54.
- npm.
- Expo Go compatível com SDK 54 para testar no celular.

## Como executar

No terminal, entre na pasta do projeto e execute:

```bash
npm install
npx expo install --fix
npx expo start
```

Leia o QR Code com o Expo Go. Para abrir no navegador, instale as dependências web compatíveis e execute:

```bash
npx expo install react-dom react-native-web @expo/metro-runtime
npx expo start --web
```

Se a instalação indicar incompatibilidade de versão, mantenha as dependências alinhadas ao SDK 54 usando `npx expo install`.

## Estrutura em camadas

```text
agenda-didatica/
├── App.js
├── app.json
├── package.json
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── ListScreen.js
│   │   └── FormScreen.js
│   ├── components/
│   │   ├── AppointmentCard.js
│   │   ├── EmptyState.js
│   │   ├── PrimaryButton.js
│   │   └── ScreenHeader.js
│   ├── services/
│   │   ├── api.js
│   │   └── appointmentsApi.js
│   └── utils/
│       ├── theme.js
│       └── validators.js
└── README.md
```

### Responsabilidade de cada camada

- **App.js:** ponto de entrada e configuração do contêiner de navegação.
- **navigation/:** define as telas e a navegação entre elas.
- **screens/:** interface e interação do usuário.
- **components/:** componentes visuais reutilizados.
- **services/api.js:** configuração central do Axios e endereço-base.
- **services/appointmentsApi.js:** operações GET, POST, PUT e DELETE.
- **utils/validators.js:** regras de validação dos campos.
- **utils/theme.js:** cores e espaçamentos compartilhados.

## Fluxo principal

`HomeScreen → ListScreen/FormScreen → appointmentsApi → api.js → MockAPI`

Ao salvar, o formulário valida os dados e chama o serviço. O Axios envia um POST (novo registro) ou PUT (edição). Após voltar à lista, o `useFocusEffect` dispara uma nova consulta GET. A exclusão usa DELETE.

## API e cuidado com os dados

Endpoint-base:

'https://6ada5c6d7512f497b3ffdbdc.mockapi.io'

Recurso utilizado: `/dados`.

Exemplo do corpo enviado:

```json
{
  "titulo": "Estudar React Native",
  "descricao": "Revisar navegação",
  "data": "2026-10-20",
  "hora": "14:30",
  "tipoRegistro": "agendamento"
}
```

Antes da demonstração, verifique no painel da MockAPI se o recurso `/dados` aceita e persiste os campos `titulo`, `descricao`, `data`, `hora` e `tipoRegistro`. Se o esquema for rígido, adicione esses campos ao recurso.

## Limitações intencionais

O exemplo não implementa login, notificações, calendário nativo ou sincronização em tempo real. O objetivo é demonstrar CRUD, navegação e separação de responsabilidades com o mínimo de dependências.
