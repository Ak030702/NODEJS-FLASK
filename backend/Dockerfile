FROM python:3.9-alpine

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir flask flask-cors

EXPOSE 5000

CMD ["python","app.py"]

