# Instructions

1. Build the image

```
docker build -t anichart-api .
```

2. Run the container

```
docker run --name anichart-api -p 8080:8080 -it --rm anichart-api
```

3. Kill the container

```
docker kill anichart-api
```
