[![Build Status](https://travis-ci.org/marcobuschini/nestjs-graphql-mysql-dev-ops-starter-20200701.svg?branch=master)](https://travis-ci.org/marcobuschini/nestjs-graphql-mysql-dev-ops-starter-20200701)
[![Coverage Status](https://coveralls.io/repos/github/marcobuschini/nestjs-graphql-mysql-dev-ops-starter-20200701/badge.svg?branch=master)](https://coveralls.io/github/marcobuschini/nestjs-graphql-mysql-dev-ops-starter-20200701?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/10c41cffa57ec08c2989/maintainability)](https://codeclimate.com/github/marcobuschini/nestjs-graphql-mysql-dev-ops-starter-20200701/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/10c41cffa57ec08c2989/test_coverage)](https://codeclimate.com/github/marcobuschini/nestjs-graphql-mysql-dev-ops-starter-20200701/test_coverage)
[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen)](http://commitizen.github.io/cz-cli/)

# Installation

`npm install`

# Running

This example requires a local MySQL installation. See `app.module.ts` for credentials, and make sure there are matching credentials in the database and the source code.

# Run the sample

Then, run Nest as usual:

`npm run start`

# Playground

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
