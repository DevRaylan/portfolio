# Calculadora de Gorjetas

Sistema para calcular gorjetas de atendentes (garçons/garçonetes), com cadastro
de atendentes e histórico das gorjetas calculadas. Projeto de estudo, construído
do zero para aprender Spring Boot, Docker e PostgreSQL na prática.

Veja o levantamento completo de requisitos em [REQUISITOS.md](REQUISITOS.md).

## Tecnologias

| Camada | Tecnologia | Por quê |
|---|---|---|
| Backend | Java 21 + Spring Boot 3.3.2 | Framework mais usado no mercado para APIs Java |
| Build | Maven | Gerenciamento de dependências e build |
| Banco de dados | PostgreSQL 16 | Banco relacional mais usado com Spring Boot |
| Persistência | Spring Data JPA (Hibernate) | Mapeamento objeto-relacional, sem SQL manual |
| Infraestrutura | Docker / Docker Compose | Isola o banco de dados do ambiente local |
| Frontend | HTML/CSS/JS (API REST + JSON) | Consome a API separadamente do backend |

## Arquitetura

```
Controller  →  Service  →  Repository  →  Banco (PostgreSQL)
(endpoints)   (regras de     (acesso a
              negócio)        dados)
```

- `model/` — entidades JPA (`Atendente`, `Gorjeta`)
- `repository/` — interfaces Spring Data JPA
- `service/` — regras de negócio (cálculo da gorjeta)
- `controller/` — endpoints REST

## Como rodar

**Pré-requisitos:** JDK 21, Maven, Docker.

1. Subir o banco de dados:
   ```bash
   docker compose up -d
   ```
2. Rodar a aplicação:
   ```bash
   mvn spring-boot:run
   ```
3. A API fica disponível em `http://localhost:8080`.

## Endpoints da API

| Método | Rota | Descrição | Corpo (JSON) |
|---|---|---|---|
| POST | `/atendentes` | Cadastra um atendente | `{ "nome": "Maria" }` |
| GET | `/atendentes` | Lista todos os atendentes | — |
| POST | `/gorjetas` | Calcula e salva uma gorjeta | `{ "atendenteId": 1, "valorConta": 150.00, "percentual": 10 }` |
| GET | `/gorjetas/atendente/{id}` | Histórico de gorjetas de um atendente | — |

## Status do projeto

- [x] Backend (Spring Boot + PostgreSQL + API REST)
- [ ] Interface web (HTML/CSS/JS)
- [ ] Associação de gorjeta a número de mesa (futuro)
