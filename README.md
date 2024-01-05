# estrelas-do-futuro
Projeto para a escolinha de futebol estrelas do futuro com o objetivo de auxiliar no gerenciamento e cadastro dos alunos.

## Instalação
1) Clone o projeto na sua máquina
2) Execute o comando `npm install` dentro de client e server para instalar as dependências
3) Crie um arquivo .env e substitua as variáveis de ambiente pelas strings de conexão. 
## Desenvolvimento
  ### Front-end
  1) Execute `npx expo start` para iniciar o servidor e acessar o expo.

  ### Back-end
  1) Execute `npm run dev` para iniciar o servidor de desenvolvimento.
  2) Execute `npm run seed` para realizar o seed do banco de dados.

  ### Projeto completo
  1) Para iniciar tanto o Front quanto o Back, execute `npm run dev` no diretório `estrelas-do-futuro`.

## Testes
  1) Execute `npm run test` para rodar em server para rodar os testes do projeto.

## Deploy
O deploy do front-end é feito pelo Expo.
O deploy do back-end é feito pelo render.

## Contribuição
  - [Fluxo de desenvolvimento](#fluxo-de-desenvolvimento)
    - [Frontend](#frontend)
  - [Dicas de desenvolvimento](#dicas-de-desenvolvimento)
    - [Branches](#branches)
    - [Commits](#commits)
      - [Diretrizes principais](#diretrizes-principais)
    - [Pull requests](#pull-requests)
      - [Diretrizes principais](#diretrizes-principais-1)

## Fluxo de desenvolvimento

Ao fazer um commit

- O código staged será automaticamente formatado e verificado pelos linters. Se houver erros ou warnings, o commit será rejeitado.

Ao fazer um push:

- O código será automaticamente verificado com relação a estilo, lint e tipos. Se houver erros ou warnings, o push será rejeitado.

Ao criar ou fizer um push um pull request

- O pipeline de CI será executado, verificando se não há erros de estilo, lint, tipos, testes unitários, de integração e end-to-end.

### Frontend

No frontend, cada componente deve ser declarado em um arquivo separado, ou seja, não deve haver mais que um componente por arquivo.

Componentes simples (sem sub-componentes) devem ser declarados em um arquivo `.tsx` com o nome do componente, exportado como default, como no exemplo abaixo:

```
CreateEventLink.tsx // componente
```

Para facilitar a modularização em componentes mais complexos, sub-componentes devem estar no diretório do componente pai, como nos exemplos abaixo:

```
Header                             // diretório de componente
│
├── HeaderNavigationBar            // diretório de sub-componente
│   ├── HeaderNavigationLink.tsx   // sub-componente
│   ├── HeaderNavigationBar.tsx    // componente pai
│   └── index.tsx                  // exporta HeaderNavigationBar como default
│
├── LoginButton                    // diretório de sub-componente
│   ├── SocialLoginButton.tsx      // sub-componente
│   ├── LoginButton.tsx            // componente pai
│   └── index.tsx                  // exporta LoginButton como default
│
├── CreateEventLink.tsx            // sub-componente
├── HeaderMobileNavigationBar.tsx  // sub-componente
├── UserProfile.tsx                // sub-componente
│
├── Header.tsx                     // componente pai
└── index.tsx                      // exporta Header como default
```

Neste caso, o diretório `Header` representa um módulo, com o arquivo `index.tsx` exportando o componente `Header.tsx` como default, de modo que componentes fora do módulo tenham imports mais simples, como `import Header from '[...]/Header'`. Todo o código usado exclusivamente pelo componente de Header pode ficar dentro do diretório `Header`, como componentes e utilitários internos.

A implementação dos componentes deve seguir a prototipação definida no [figma](https://www.figma.com/file/RLtOKu4GpQA4lPvkDFSxAh/Untitled?type=design&node-id=0%3A1&mode=design&t=bZRmxlFV1Zpc6gPU-1) do projeto.

## Dicas de desenvolvimento

### Branches

- `main`: branch com o código em produção
- `canary`: branch com o código mais recente

Branches de desenvolvimento devem ser criadas a partir da branch `canary` e seguir o padrão `<issue>-<descrição>`, como `13-style-guide-config`.

### Commits

Seguiremos o [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/).

```
<tipo>(<escopo opcional>): <descrição>
```

Os tipos disponíveis estão definidos na [configuração do commitlint](./.commitlintrc.json) e são:

- `feat`: uma nova funcionalidade ou adição
- `fix`: uma correção de problema ou bug
- `refactor`: uma mudança de código que não corrige um bug nem adiciona uma funcionalidade
- `build`: mudanças que afetam o sistema de build ou dependências externas
- `test`: adição ou correção de testes
- `perf`: uma mudança de código que melhora a performance
- `revert`: revert de um commit anterior
- `style`: mudanças que não afetam o significado do código, como espaços em branco, formatação e ponto-e-vírgula faltando
- `docs`: mudanças na documentação
- `ci`: mudanças nos arquivos e scripts de CI
- `release`: commits de upgrade de versão antes de releases
- `chore`: outras mudanças que não se encaixam em nenhum dos tipos anteriores

#### Diretrizes principais

- Crie mensagens de commits descritivas, no imperativo e em inglês.
  Exemplo: `feat: add style guide config`
- Tente incluir poucas mudanças em cada commit e faça commits e pushes frequentes.
  Isso facilita rollbacks e diminui a chance de que suas alterações sejam perdidas em caso de imprevistos, como falhas de hardware.
- Tente incluir os testes relacionados às mudanças em cada commit.
  Isso garante uma implementação gradual e mantém as novas mudanças cobertas por testes. Além disso, também facilita o desenvolvimento porque os testes não são acumulados para serem feitos apenas no final.

### Pull requests

O título dos pull requests também deve seguir o padrão do [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/), como no exemplo abaixo:

```
feat: add style guide config (#13)
```

Nesse exemplo, o número `13` é o número da issue relacionada ao pull request.

#### Diretrizes principais

- Os pull requests devem ser criados para a branch `canary`.
- Deve-se aguardar a aprovação de pelo menos um revisor antes de fazer o merge.
- Deve-se aguardar o pipeline de CI finalizar com sucesso antes de fazer o merge.
- O criador do pull request é o responsável por fazer o merge.
- É recomendado descrever resumidamente as principais mudanças que o pull request introduz. O texto da descrição pode ser em inglês ou português, de acordo com a sua preferência.
- Caso seja uma mudança visual na interface, é uma boa prática incluir screenshots, ou até mesmo vídeos para demonstrações mais complexas.
