![Captura de tela 2025-02-18 - 19 22 27](https://github.com/user-attachments/assets/0ea8ab03-02c9-48fb-ab82-661f2befe07f)# REST API with Spring Boot and Angular

![Build](https://github.com/loiane/crud-angular-spring/actions/workflows/build.yml/badge.svg?branch=main)

A basic Angular + Spring delivery system demonstrating the Has-Many relationship.

This app is to showcase, especially for beginners, what a basic CRUD API that's close to being Production-ready looks like.

## 💻 Tecnologies

- Java 21
- Spring Boot 3 (Spring 6)
- Maven
- JPA + Hibernate
- MySQL
- JUnit 5 + Mockito (back-end tests)
- Angular v19
- PrimeNg Components
- Karma + Jasmine (front-end tests)

## ⌨️ Editor / IDE

- Visual Studio Code
- Java Extensions [link](https://marketplace.visualstudio.com/items?itemName=loiane.java-spring-extension-pack)
- Angular Extensions [link](https://marketplace.visualstudio.com/items?itemName=loiane.angular-extension-pack)

## Some functionalities available in the API

- ✅ Java model class with validation
- ✅ JPA repository
- ✅ JPA Pagination
- ✅ PostgreSQL database (you can use any database of your preference)
- ✅ Controller, Service, and Repository layers
- ✅ Has-Many relationships
- ✅ Java 17 Records as DTO (Data Transfer Object)
- ✅ Hibernate / Jakarta Validation
- ✅ Unit tests for all layers (repository, service, controller)
- ✅ Test coverage for tests
- ✅ Spring Docs - Swagger (https://springdoc.org/v2/)

### Not implemented (maybe in a future version)

- Security (Authorization and Authentication)
- Caching
- Data Compression
- Throttling e Rate-limiting
- Profiling the app
- Test Containers
- Docker Build

## Some functionalities available in the front end

- ✅ Angular Standalone components (Angular v16+)
- ✅ PrimeNG components
- ✅ Dark🌛 / Light🌞 mode
- ✅ List of all main entities with pagination
- ✅ Form to update/create orders with categories (has-many - FormArray)
- ✅ View only screen
- ✅ TypedForms (Angular v14+)
- ✅ Presentational x Smart Components
- ✅ Using localStorage for shopping cart implementation

## Screenshots

### Store:

<table>
  <thead>
    <th>
      Catalog
    </th>
    <th>
      User Drawer
    </th>
    <th>
      My cart
    </th>
    <th>
      Login Modal
    </th>
  </thead>
  <tbody>
    <td><img style="width: 300px" src="./docs/store-catalog.png" alt="Main Page" width="100%"></td>
    <td><img style="width: 300px" src="./docs/user-drawer.png" alt="User Drawer" width="100%"></td>
    <td><img style="width: 300px" src="./docs/my-cart.png" alt="My cart" width="100%"></td>
    <td><img style="width: 300px" src="./docs/login-modal.png" alt="Login Modal" width="100%"></td>
  </tbody>
</table>

### Admin:

<table>
  <thead>
    <th>
      Overview
    </th>
    <th>
      Overview Dark Mode
    </th>
    <th>
      Product List
    </th>
    <th>
      Product Form
    </th>
  </thead>
  <tbody>
    <td><img style="width: 600px; border: 1px solid #e2e8f0" src="./docs/admin-overview.png" alt="Overview Page" width="100%"></td>
    <td> <img style="width: 600px; border: 1px solid #e2e8f0" src="./docs/dark-mode.png" alt="Dark mode Overview Page" width="100%"></td>
    <td><img style="width: 600px; border: 1px solid #e2e8f0" src="./docs/product-list.png" alt="Product List Page" width="100%"></td>
    <td><img style="width: 600px; border: 1px solid #e2e8f0" src="./docs/product-form.png" alt="Product Form Page" width="100%"></td>
  </tbody>
</table>

## ❗️Executing the code locally

### Executing the back-end

You need to have Java and Maven installed and configured locally.

Open the `crud-spring` project in your favorite IDE as a Maven project and execute it as Spring Boot application.

### Executing the front-end

You need to have Node.js / NPM installed locally.

1. Install all the required dependencies:

```
npm install
```

2. Execute the project:

```
npm run start
```

This command will run the Angular project with a proxy to the Java server, without requiring CORS.

Open your browser and access **http://localhost:4200** (Angular default port).

#### Upgrading Angular

```
ng update
```

Then

```
ng update @angular/cli @angular/core @angular/cdk @angular/material @angular/youtube-player --force
```
