# Youtube Mock App

> Youtube mock app built with VueJs framework and YouTube Api integration.

## Perquisites

- Node.js 8.9 or above (v10+ recommended)

## Overview

The project is using the following tools/technologies:

- [vue-cli](https://cli.vuejs.org/guide/)
- [vue-router](https://router.vuejs.org/guide/#html)
- [axios](https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html)

There are the structure of application directories in src folder:

| Directory    | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| `api`        | Api routes                                                    |
| `assets`     | Images and icons                                              |
| `components` | Public components shared on the views and icon components     |
| `constants`  | Constant data                                                 |
| `mixins`     | Shared mixins                                                 |
| `router`     | App routes generation                                         |
| `services`   | Axios fetching methods                                        |
| `styles`     | Common Color variables and shared styles                      |
| `utils`      | Helper functions                                              |
| `views`      | All main views                                                |

## Setup

Prepare your `.env` file by copying the contents of `.env.example`:

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev
```

## Scripts

There are the available scripts you can run with:

```bash
npm run {script-name}
```

| name       | example              | Description                                                                          |
| ---------- | -------------------- | ------------------------------------------------------------------------------------ |
| serve      | `npm run serve`      | Runs the app in the hot reload development server                                    |
| build      | `npm run build`      | Compiles and minifies for production            |
| test:unit  | `npm run test:unit`  | Launches the test runner                        |
| lint       | `npm run lint`       | Vue loader Lints and fixes files                |

## Environment Variables

| Variable                            | Description                                    |
| ----------------------------------- | ---------------------------------------------- |
| VUE_APP_YOUTUBE_API_BASE_URL        | YouTube Api Base Url                           |
| VUE_APP_API_KEY                     | YouTube Api app key by google developers console|