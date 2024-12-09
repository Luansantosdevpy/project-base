# Projeto Base - Node.js com Arquitetura Limpa

Este é um template para projetos em Node.js utilizando arquitetura limpa, com divisão de responsabilidades clara, injeção de dependências via tsyringe e boas práticas de desenvolvimento como linting e validação de commits com Husky.

### Requisitos
 - Node.js versão 18 ou superior
 - Yarn (Gerenciador de pacotes)
 - MongoDB em execução local ou remoto
 - Arquivo de configuração .env baseado no .env.sample

### Estrutura do Projeto

A estrutura do projeto é organizada para respeitar os princípios de arquitetura limpa:

```
src/
├── api/
│   ├── controllers/       # Controladores responsáveis pelas entradas HTTP
│   ├── routes/            # Rotas expostas da aplicação
├── application/
│   └── services/          # Regras de negócio da aplicação
├── domain/
│   └── interfaces/        # Interfaces para abstração de serviços e repositórios
│       └── repositories/
├── infrastructure/
│   ├── data/
    └── config/            # Configurações de banco de dados e ambiente
│   │   └── repositories/  # Implementações concretas de repositórios
│   ├── log/               # Configuração de logger        
├── dependencyContainer.ts # Configuração do tsyringe
├── app.ts                 # Configuração principal do app Express
└── server.ts              # Arquivo de inicialização do servidor
```

### Funcionalidades Atuais

 - Health Check: Verifica a disponibilidade da aplicação.
   - Endpoint: http://localhost:<port>/v1/health-check

### Configuração e Execução

 ### 1. Clonar o repositório
  ```
   git clone https://github.com/Luansantosdevpy/project-base

   cd project-base
  ```

### 2. Instalar dependências
Certifique-se de ter o Yarn instalado e execute:
```
yarn install
```

### 3. Configurar variáveis de ambiente
Copie o arquivo .env.sample para .env:

```
cp .env.sample .env
```
Preencha as variáveis necessárias no arquivo .env. O padrão é o que tem atualmente no .env.sample

### 4. Configurar Husky (opcional)

Se você ainda não configurou o Husky localmente, execute:

```
yarn prepare
```


Isso habilitará os hooks de pré-commit e pré-push.

### 5. Executar a aplicação

Para rodar a aplicação em modo de desenvolvimento:

```
yarn dev
```


## Husky - Validação de Código

Este projeto utiliza o Husky para validar o código antes de commits e pushes. Os hooks configurados são:

 - Pré-commit: Executa o eslint para garantir que o código segue o padrão.
 - Pré-push: Executa o eslint e o build para evitar que código quebrado seja enviado para produção.
Certifique-se de ter rodado o comando yarn prepare após clonar o repositório para habilitar o Husky corretamente.

## Dependências Principais

 - Express: Framework para construção de APIs.
 - Mongoose: ODM para MongoDB.
 - tsyringe: Biblioteca para injeção de dependências.
 - Winston: Logger.
 - Husky: Gerenciador de hooks de Git.
 - Prettier e ESLint: Para padronização de código.

## Scripts disponíveis

Aqui estão os principais scripts disponíveis no package.json:

 - yarn dev: Roda a aplicação em modo de desenvolvimento.
 - yarn build: Compila o código TypeScript para JavaScript.
 - yarn lint: Verifica e corrige problemas no código usando ESLint.
 - yarn prepare: Configura o Husky para validação de código.

## Contribuindo

Este projeto é um template inicial e pode ser adaptado para diferentes cenários. Caso queira contribuir:

 - Faça um fork do repositório.
 - Crie uma branch para suas alterações: git checkout -b minha-feature.
 - Commit suas alterações: git commit -m 'Adiciona nova feature'.
 - Faça um push para a branch: git push origin minha-feature.
 - Abra um Pull Request.

## Licença
Este projeto está licenciado sob a MIT License.
