# 📺 Anichart's Schedule API Wrapper

## **What is Anichart's Schedule API Wrapper ?**

Anichart's Schedule API Wrapper is an **UNOFFICIAL** wrapper for the Anichart's API. that allows you to get the weekly schedule airing animes using Anichart's graphQL API.

# **Example**

## Request

```sh
curl http://localhost:3000/
```

## Response

```json
{
  "sundaySchedule": [
    {
      "id": 332659,
      "episode": 1029,
      "airingAt": 1660437000,
      "media": {
        "id": 21,
        "title": {
          "romaji": "ONE PIECE",
          "native": "ONE PIECE",
          "english": "ONE PIECE"
        },
        "siteUrl": "https://anilist.co/anime/21",
        "episodes": null,
        "source": "MANGA",
        "description": "Gold Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. ect...",
        "coverImage": {
          "extraLarge": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx21-tXMN3Y20PIL9.jpg",
          "color": "#e4a15d"
        }
      }
    },
  ]
  ...
}
```

# Run locally

1. Clone the repo

```sh
git clone https://github.com/retconned/anichart-api
```

2. Change directory to the project folder

```sh
cd anichart-api
```

3. Run the app locally

```sh
yarn dev
```

4. Build the docker image

```sh
docker build . -t kingyo-bot
```

# Run as a docker container

1. Build the image

```
docker build -t anichart-api .
```

2. Run the container

```
docker run --name anichart-api -p 3000:3000 -it --rm anichart-api
```

3. Kill the container

```
docker kill anichart-api
```

# Disclaimer

This project is not affiliated with “AniList” or “AniChart”. This project is just a wrapper for the prexisting Anichart graphQL API.
