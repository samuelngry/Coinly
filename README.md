<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/samuelngry/Coinly">
    <img src="client/src/assets/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Coinly</h3>

  <p align="center">
    <strong>Coinly</strong> transforms personal finance into a fun, interactive adventure that helps you build better finance habits — one quest at a time.
  Complete <strong>daily, bonus, and custom quests</strong> to earn XP, clim leaderboards, maintain streaks, and watch your intelligent pet companion grow while offering insights along your financial journey.
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<p align='center'>
  <img src="client/src/assets/feat1.png" alt="Quest Screenshot" width="400" >
</p>

**Live Demo:** [coinlyquest.com](https://coinlyquest.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Node.js][Node.js]][Node-url]
* [![Express.js][Express.js]][Express-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Make sure you have the following installed:

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/samuelngry/Coinly.git
   ```
2. Navigate into the project folder
   ```sh
   cd Coinly
   ```
3. Install dependencies

   * Frontend:
     ```js
     cd client && npm install
     ```
   * Backend:
     ```js
     cd ../server && npm install
     ```
4. Create a '.env' file in the 'server' directory with your configuration
   ```sh
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/coinly
   JWT_SECRET=your_jwt_secret_key
   ```
   
   > Replace 'username', 'password', and 'your_jwt_secret_key' with your own values.
5. Start the backend server
   ```js
   npm start
   ```
6. Start the frontend app (in a seperate terminal)
   ```js
   cd client
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Once the application is running locally:

1. Open the app in your browser at `http://localhost:5173`
2. Create an account and complete onboarding to set your goals, struggles, and preferences.
4. Complete **Daily, Bonus, Custom Quests** to earn XP and Level Up.
5. Check the **Pet Insights** section to view your spending trends.
6. Climb the **Leaderboard** to compete with other users.

### Screenshots

**Pet Insights**
<p align='center'>
  <img src="client/src/assets/feat3.png" alt="Pet Insights Screenshot" width="400">
</p>

**Leaderboard**
<p align='center'>
  <img src="client/src/assets/feat2.png" alt="Leaderboard Screenshot" width="400">
</p>

---

Deployed version:
[**View Live Demo**](https://coinlyquest.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Project Link: [https://github.com/samuelngry/Coinly](https://github.com/samuelngry/Coinly)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Special thanks to the tools, libraries, and resources that made Coinly possible:

* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)
* [Lucide Icons](https://lucide.dev/)
* [React Hot Toast](https://react-hot-toast.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/samuelngry/Coinly.svg?style=for-the-badge
[contributors-url]: https://github.com/samuelngry/Coinly/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/samuelngry/Coinly.svg?style=for-the-badge
[forks-url]: https://github.com/samuelngry/Coinly/network/members
[stars-shield]: https://img.shields.io/github/stars/samuelngry/Coinly.svg?style=for-the-badge
[stars-url]: https://github.com/samuelngry/Coinly/stargazers
[issues-shield]: https://img.shields.io/github/issues/samuelngry/Coinly.svg?style=for-the-badge
[issues-url]: https://github.com/samuelngry/Coinly/issues
[license-shield]: https://img.shields.io/github/license/samuelngry/Coinly.svg?style=for-the-badge
[license-url]: https://github.com/samuelngry/Coinly/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/samuelngrongyao
[product-screenshot]: client/src/assets/feat1.png
[Node.js]: https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Express.js]: https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[PostgreSQL]: https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
