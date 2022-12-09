<!-- markdownlint-configure-file {
  "MD013": {
    "code_blocks": false,
    "tables": false
  },
  "MD033": false,
  "MD041": false
} -->

<div align="center">

# listify

this is backend side of listify project

A To do list Web App, created for Pemrograman Aplikasi Web class <br/>
check more about frontend side [here][frontend-side]

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

[Web Page](#web-page) •
[Output Structure](#output-structure) •
[Prerequisites](#prerequisites) •
[Getting Started](#getting-started) •
[Support File](#support-file)

</div>

## Web Page

[Listify Website][listify-page]

## Author
- [Wiweka Yoga Sadewa](https://github.com/wiweka24)
- [Hapsari Prabandhari](https://github.com/Hapsarip)
- [Kurnia Dwi Utami](https://github.com/kurniakdu)
- [Muhammad Zikriansyah](https://github.com/MuhammadZikriansyah)
- [Vira Ayu Oktaviani](https://github.com/viraayuoktvn)

## Output Structure

```shell
frontend-kelompok4/
├── controller/
|   ├── activity.js
|   ├── auth.js
|   └── user.js
├── middleware/
|   ├── authMiddleware
|   └── errorHandler
├── models/
|   ├── activity.js
|   └── user.js
├── routes/
|   ├── activity.js
|   ├── auth.js
|   └── user.js
├── utils/
|   ├── errorResponse.js
|   └── validate.js
├── index.js
├── package.json
├── vercel.json
└── ...
```

## Fependencies
```shell
bcrypt
body-parser
cookie-parser
cors
dotenv
express
joi
joi-password-complexity
jsonwebtoken
moment
mongoose
nodemon
```

## Prerequisites
[Download][node-js] and install Node.js version 16.15 or higher.

## Getting Started
Setting up project for local usage.
1. Clone or Download this repository
    ```shell
    https://github.com/Hapsarip/api-crud-kelompok4.git
    ```
    if using SSS
    ```shell
    git@github.com:Hapsarip/api-crud-kelompok4.git
    ```
2. Install NPM packages
    ```shell
    npm install
    ```
3. Make .env file in root folder<br/>
    example .env
    ```shell
    dB_connection = "your mongo string connection"
    PORT = "port to run in localhost"
    JWTKey = "your jwt key"
    origin_fe "your frontend domain"
    ```
4. Run the program
    ```shell
    npm start
    ```

## Support File
- [Slide Presentasi][ppt-file]
- [Video Presentasi][video-file]


[frontend-side]: https://github.com/wiweka24/frontend-kelompok4
[listify-page]: https://listifyY.vercel.app/#/
[node-js]: https://nodejs.org/en/download/
[design-file]: https://www.figma.com/file/mYANo06pmE27YNkZK8TPb8/FE-PAW-Kelompok-4?node-id=0%3A1&t=C7szVUn5GEn7dK4S-1
[ppt-file]: https://docs.google.com/presentation/d/1xN3h04Bqr6y9nXhQ7LLkbrvvxQdB6QWa_AgfCoISE3s/edit#slide=id.g105f6cd14c6_0_3872
[video-file]: https://youtu.be/7gDu5UtYKfE
