FROM python:3.13-alpine AS base

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

ADD pyproject.toml uv.lock /app/

RUN uv pip compile pyproject.toml -o requirements.txt


FROM python:3.13-alpine AS prod

WORKDIR /app

COPY --from=base /app/requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt \
    && rm requirements.txt

COPY ./src /app/src

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "5000"]