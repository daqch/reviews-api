# Reseñas API

## Uso

### GET /reviews/:id

Devuelve reseñas

#### Parámetros

- id: id de la reseña

#### Respuesta

- 200: OK
- 404: No se encontró la reseña

```json
[
  {
    "id": 1,
    "pélículaNombre": "A New Hope",
    "calificación": 5,
    "texto": "Excelente película",
    "películaDirector": "George Lucas",
    "películaFechaEstreno": "1977-05-25",
    "título": "Una nueva esperanza para el cine"
  }
]
```

### POST /reviews

Crea una reseña

#### Parámetros del cuerpo

- calificación: puntuación de la reseña
- texto: texto de la reseña
- nombrePelicula: nombre de la película
- título: título de la reseña

#### Respuesta

- 201: Creado
- 400: Parámetros inválidos

```json
{
  "id": 1,
  "pélículaNombre": "A New Hope",
  "puntuación": 5,
  "texto": "Excelente película",
  "películaDirector": "George Lucas",
  "películaFechaEstreno": "1977-05-25",
  "título": "Una nueva esperanza para el cine"
}
```

# Testeo

Para ejecutar los tests, correr el siguiente comando:

```bash
npm run test
```
