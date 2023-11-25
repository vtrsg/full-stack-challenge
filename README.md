<h1 align="center">Fullstack Challenge</h1>

## Sobre:

      Este projeto é um desafio fullstack. Todas as rotas, tanto no frontend quanto no backend, estão integradas, e é possível acessá-las na URL principal onde o Docker está em execução.

## Início Rápido:

- Faça o download do Docker no seu computador.

- Navegue até a pasta raiz do projeto.

```bash
# Execute os comandos

      docker-compose build
      docker-compose up

# A aplicação estará disponível em

      http://127.0.0.1:3000/
```

## Bibliotecas e Dependências (FRONTEND):

- React
- React-router-dom
- Axios
- Styled-components

## Bibliotecas e Dependências (BACKEND):

- Poetry
- Django
- Django-rest-framework
- Django-cors-headers
- Gunicorn
- Pytest
- Taskipy
- Blue
- Ruff
- Isort

## Cobertura Pytest:

```bash
Name                  Stmts   Miss  Cover
-----------------------------------------
api\models.py             9      0   100%
api\serializers.py       35      1    97%
api\views.py             87     10    89%
project\settings.py      19      0   100%
-----------------------------------------
TOTAL                   150     11    93%
```
