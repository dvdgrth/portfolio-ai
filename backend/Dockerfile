# --- Base Image ---
FROM python:3.10-slim

# --- Environment Variables ---
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# --- Install dependencies ---
RUN pip install --upgrade pip \
    && pip install poetry

# --- Set work directory ---
WORKDIR /app

# --- Copy files ---
COPY pyproject.toml poetry.lock /app/
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi --no-root

COPY ./app /app/app

# --- Expose & run ---
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
