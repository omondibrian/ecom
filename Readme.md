
![Node.js CI](https://github.com/omondibrian/ecom/workflows/Node.js%20CI/badge.svg) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/omondibrian/ecom.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/omondibrian/ecom/context:javascript)
![image](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

## About The Project

Ecom is a practice ecommerce backend Api made to explore the inner workings of a real world ecommerce platforms 

### Built With
the project is built using the Nodejs platform and :-
* [express](https://www.express.com/)
* [Postgress Database](https://www.postgresql.org/)
* [Jest](https://jestjs.io/docs/en/getting-started) for running the test suittes

## Getting Started

In order to setup the project in your local machine:-

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/omondibrian/ecom.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your environment variable  in `.env`
   ```
   POSTGRES_PASSWORD=<password>
   POSTGRES_USER=<user>
   POSTGRES_DB=<database>
   JWT_SECRET=<secreate>
   ```
5. Run tests
     ```
     npm run test
     ```
     or
     ```
     make test
     ```
## Usage

Before your can actually run the project in your local machine ,make sure docker is installed in your development  machine.then run the following commands i your terminal

    ```
    docker-compose up 
    npm run migrations
    npm run seed
    npm start
    ```
## Roadmap

See the [open issues](https://github.com/omondibrian/ecom/issues) for a list of proposed features (and known issues).
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@Brian__Omondi](https://twitter.com/Brian__Omondi) - omondibrian392@gmail.com

Project Link: [https://github.com/omondibrian/ecom](https://github.com/omondibrian/ecom)

## Acknowledgements
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)