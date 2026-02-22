# 1. Temel imaj olarak hafif bir Python seçiyoruz
FROM python:3.11-slim

# 2. Çalışma klasörünü oluştur
WORKDIR /app

# 3. Kütüphane listesini kopyala ve yükle
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Tüm backend kodlarını kopyala
COPY . .

# 5. FastAPI'yi uvicorn ile çalıştır
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]