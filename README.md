<!--
  NOTE TO SELF: This markdown is a mix of HTML
  and markdown. For the next one, try to go with
  just HTML for consistency(?)
-->

<!-- #ACBAC7 -->
<!--  anchor for `back to top` -->
<a name="readme-top"></a>

<br />

<!-- HEADER -->
<div align="center">
  <a href="https://github.com/jackthta/Image-Gallery">
    <picture>
      <source media="(prefers-color-scheme: light)" srcset="./misc/README_aperture-grey.png"/>
      <source media="(prefers-color-scheme: dark)" srcset="./misc/README_aperture-white.png" />
      <img src="./misc/README_aperture-black.png" alt="icon of camera aperture" width="100px">
    </picture>
  </a>

  <h1>Image Gallery</h1>
  <p style="margin-top: -10px">A searchable gallery of images</p>
</div>

<br />

<!-- TABLE OF CONTENTS -->
## **Table of Contents**
<ol>
  <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
  </li>
  <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
  </li>
  <li><a href="#tests">Tests</a></li>
</ol>

<br />

<!-- ABOUT THE PROJECT -->
## **About The Project**

This web application features an infinite scroll image gallery. Search for keywords to filter down images to your liking.

<br />

### **Built With**

- [![HTML5][html-badge]][html-url]
- [![CSS3][css-badge]][css-url]
- [![React][react-badge]][react-url]
- [![TypeScript][typescript-badge]][typescript-url]
- [![Vite][vite-badge]][vite-url]
- [![Cypress][cypress-badge]][cypress-url]

<br />

### **Features**
<ul>
  <li>Accessibility ♿️</li>
  <li>Responsive Web Design 📱 💻 🖥 </li>
  <li>Light & Dark Mode ☀️ 🌑 </li>
</ul>

<br />

<!-- GETTING STARTED -->
## **Getting Started**

Follow these steps to run the web application locally.

### **Prerequisites**

- [NodeJS](https://nodejs.org/en/) (v16.x)
- [npm](https://www.npmjs.com/) (v9.x)
- [Unsplash Image API Keys](https://unsplash.com/developers)

### **Installation**

1. Clone the repo

   ```sh
   git clone https://github.com/jackthta/Image-Gallery.git
   ```

2. Change into project directory

   ```sh
   cd Image-Gallery
   ```

3. Install dependencies

   ```sh
   npm i
   ```

4. Create an `.env` file and set your Unsplash Image API keys

   ```sh
   VITE_UNSPLASH_ACCESS_KEY=
   VITE_UNSPLASH_SECRET_KEY=
   ```

5. Launch the web application

   ```sh
   npm run dev
   ```

<br />

<!-- TESTS -->
## **Tests**

The testing framework used in this project is Cypress. [The documentation can be found here.](https://docs.cypress.io/)

### **Run tests**

To run the tests located in the `cypress/e2e` directory, run this command:

```
npm run test
```

<br />

<p align="right">(<a href="#readme-top"> 🔺 back to top </a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!--
Markdown badges
- https://github.com/Ileriayo/markdown-badges
-->

[html-badge]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[html-url]: https://whatwg.org/
[css-badge]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[css-url]: https://www.w3.org/Style/CSS/members.en.php3
[react-badge]: https://img.shields.io/badge/React-202329?style=for-the-badge&logo=react
[react-url]: https://reactjs.org/
[typescript-badge]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[vite-badge]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[vite-url]: https://vitejs.dev/
[cypress-badge]: https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e
[cypress-url]: https://www.cypress.io/