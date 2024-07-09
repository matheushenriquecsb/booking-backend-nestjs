<h1 align="center" style="font-weight: bold;">Booking Clone Backend
 💻</h1>

<p align="center">
 <a href="#Tecnologias">Tecnologias</a> • 
 <a href="#started">Getting Started</a> • 
 <a href="#routes">Endpoints</a>
</p>

<p align="center">
    <b><p>Aplicação consiste em um sistema de reservas de hotéis. Implementei um sistema de autenticação de login, utilizando OAuth do GitHub e Google, permitindo que os usuários se autentiquem de maneira conveniente através de suas contas existentes.</p> <p>Com a autenticação realizada, os usuários podem explorar as hospedagens disponiveis, escolher as data e quantidade de quartos desejados.</p></b>
</p>

<h2 id="Tecnologias">Tecnologias</h2>

- NestJS
- Typescript
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Multer
- TypeORM
- Swagger

<h2 id="started">🚀 Getting started</h2>

<h3>Pré Requisitos</h3>

Instale esses softwares necessários para execução do seu projeto.

- Node
- Git
- VS Code  

<h3>Clonando o Projeto</h3>
 

```bash
git clone https://github.com/matheushenriquecsb/booking-backend-nestjs
 ```

<h3>Configue suas variáveis de ambiente (.env)</h2>

Use a `.env.example` como referência para criar seu arquivo de configuração `.env` com suas credenciais 

```yaml
MONGO_URI=mongodb+srv://{USERNAME}:{PASSWORD}@cluster0.ymdyg.mongodb.net/?retryWrites=true&w=majority
```

<h3>Rodando o projeto</h3>

```bash
cd booking-backend-nestjs

npm install

npm run start
```

<h3>Documentação</h3>

```bash
Swagger

http://localhost:3000/booking-backend-nestjs
``` 


<h2 id="routes">Endpoints</h2>

​
| rotas               | descrição                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /users</kbd>     | listar usuários
| <kbd>GET /users/:id</kbd>     | retorna usuário pelo id
| <kbd>DELETE /users/:id</kbd>     | deleta usuário pelo id 
| <kbd>PATCH /users/:id</kbd>     | atualizar dados de usuário pelo id  
| <kbd>DELETE /auth/register</kbd>     | cadastro de usuário  
| <kbd>POST /auth/login</kbd>     | login usuário  
| <kbd>POST /auth/login-google</kbd>     | login usuário pela api do google 
| <kbd>POST /auth/login-github</kbd>     | login usuário pelo api do github
| <kbd>POST /hotels</kbd> | criação do hotel
| <kbd>GET /hotels/find/:id</kbd> | retorna hotel pelo id
| <kbd>GET /hotels?city={city}</kbd> | retorna hotéis de cidade pela query
| <kbd>GET /hotels/featured?featured={city}&limit={limit}</kbd> | retorna hotéis de cidade pela query com limite
| <kbd>GET /hotels/countByType</kbd> | retorna quantidade de hotéis por tipo
| <kbd>GET /hotels/countByCity</kbd> | retorna quantidade de hotéis por cidade
| <kbd>PATCH /hotels/:id</kbd> | atualiza dados do hotel 
| <kbd>DELETE /hotels/:id</kbd> | deleta hotel

 
  
 <h3>Deploy</h3>

```bash
https://booking-rent.netlify.app/
``` 








 
