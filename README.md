# book-tracker

Techs:
Node.js
SQLite
JWT
React

**Observações:**
Para utilizar as rotas que estão protegidas com autenticação JWT, 
primeiro usar rota para criar um user: `/api/auth/signup`

```json
{
	"email": "mike@starwars.com",
	"name": "Mike",
	"password": "123"
}
```

depois gerar o token na rota: `/api/auth/singup` com o email e password criados anteriormente.

```json
{
	"email": "mike@starwars.com",
	"password": "123"
}
```

resposta:

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

utilizar esse token como header nas apis de books:

header: `x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....`

**Sqlite** não existe campo de tipo data, então algumas colunas tiveram que ficar como tipo texto.

**React e o front**: Eu acabei fazendo apenas um hello world e com um basico de rotas, infelizmente não consegui dedicar mais tempo para o front end.
