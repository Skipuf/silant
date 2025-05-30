FROM python:3.11

WORKDIR /app

# Установка зависимостей
COPY backend/requirements.txt .
RUN pip install -r requirements.txt

# Копируем весь backend-код
COPY backend/ .

# Запуск Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]