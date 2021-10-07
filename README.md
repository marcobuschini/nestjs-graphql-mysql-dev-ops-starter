[![Unit Testing](https://github.com/marcobuschini/nestjs-graphql-mysql-dev-ops-starter/actions/workflows/unittest.yml/badge.svg)](https://github.com/marcobuschini/nestjs-graphql-mysql-dev-ops-starter/actions/workflows/unittest.yml)
[![Building](https://github.com/marcobuschini/nestjs-graphql-mysql-dev-ops-starter/actions/workflows/build.yml/badge.svg)](https://github.com/marcobuschini/nestjs-graphql-mysql-dev-ops-starter/actions/workflows/build.yml)
[![Build Status](https://travis-ci.org/marcobuschini/nestjs-graphql-mysql-dev-ops-starter.svg?branch=master)](https://travis-ci.org/marcobuschini/nestjs-graphql-mysql-dev-ops-starter)
[![Coverage Status](https://coveralls.io/repos/github/marcobuschini/nestjs-graphql-mysql-dev-ops-starter/badge.svg?branch=master)](https://coveralls.io/github/marcobuschini/nestjs-graphql-mysql-dev-ops-starter?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/61f98d04974944651e7e/maintainability)](https://codeclimate.com/github/marcobuschini/nestjs-graphql-mysql-dev-ops-starter/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/61f98d04974944651e7e/test_coverage)](https://codeclimate.com/github/marcobuschini/nestjs-graphql-mysql-dev-ops-starter/test_coverage)
[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen)](http://commitizen.github.io/cz-cli/)

# Installation

`npm install`

# Running

This example requires a local MySQL installation.
See `.env.example` for credentials, and make sure there are matching credentials in the database and the `.env` file.
The `.env.dev` file contains variable definitions for the development environment.
The `.env.test` file containst variable definitions for the test environment (used on TravisCI, too).
The `.env` file is left uncommitted as it is supposed to hold production secrets.

# Run the sample

Then, run Nest as usual:

`npm run start`

or, for development settings:

`npm run start:dev`

# Playground

After running
Point your browser at `http://localhost:3000/graphql`

# A simple query

```
query {
  getCats {
    id
    name
    age
  }
}
```

Where the `query` keyword is optional.

# A simple mutation

```
mutation CreateCat($data: CreateCatInput) {
  createCat(createCatInput: $data) {
    name
    age
  }
}
```

## Mutation data (as `$data` above)

```
{
  "data": {
    "name": "name3",
    "age": 5
  }
}
```

# A simple subscription

```
subscription catCreated {
  catCreated {
    name
    age
  }
}
```
