# Base image
FROM python:3.9-slim

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar arquivos necessários para o container
COPY requirements.txt .

# Instalar dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o código do backend para o container
COPY . .

# Expor a porta usada pelo Flask
EXPOSE 5000

# Comando para iniciar o backend
CMD ["python", "app.py"]
