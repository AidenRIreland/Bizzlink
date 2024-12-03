<h1 align="center">Bizzlink</h1>


<p align="center">
  <img src="frontend/public/bizlink-icon.png" alt="Bizzlink Logo" width="200" height="200">
</p>


By:
| [Aiden Ireland](https://github.com/AidenIreland) | [Donna Marie Brar](https://github.com/dmvbnoob) | [John Raineir Po-on](https://github.com/johnraineir) | [Priya Shruthi Korra](https://github.com/priyakorr) | [Voltaire A. Rono](https://github.com/voltaire36) |
| --- | --- | --- | --- | --- |
| ![Aiden](https://images.weserv.nl/?url=avatars.githubusercontent.com/AidenRIreland?v=4&h=150&w=150&fit=cover&mask=circle&maxage=7d) | ![Donna](https://images.weserv.nl/?url=avatars.githubusercontent.com/dmvbnoob?v=4&h=150&w=150&fit=cover&mask=circle&maxage=7d) | ![John](https://images.weserv.nl/?url=avatars.githubusercontent.com/johnraineir?v=4&h=150&w=150&fit=cover&mask=circle&maxage=7d) | ![Priya](https://images.weserv.nl/?url=avatars.githubusercontent.com/priyakorr?v=4&h=150&w=150&fit=cover&mask=circle&maxage=7d) | ![Voltaire](https://images.weserv.nl/?url=avatars.githubusercontent.com/voltaire36?v=4&h=150&w=150&fit=cover&mask=circle&maxage=7d) |
| [301219359](mailto:airelan5@my.centennialcollege.ca) | [301369346](mailto:dbrar25@my.centennialcollege.ca) | [301363442](mailto:jpoon26@my.centennialcollege.ca) | [301223736](mailto:pkorra@my.centennialcollege.ca) | [301276375](mailto:vrono@my.centennialcollege.ca) |


## Tech Stack

### Frontend
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)

### Database
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/-MongoDB%20Atlas-47A248?logo=mongodb&logoColor=white)

### Others
![Git](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white)
![VS Code](https://img.shields.io/badge/-VS%20Code-007ACC?logo=visual-studio-code&logoColor=white)
![Better Comments](https://img.shields.io/badge/-Better%20Comments-FF6F61?logo=visual-studio-code&logoColor=white)
![Windows](https://img.shields.io/badge/-Windows-0078D6?logo=windows&logoColor=white)
![ClickUp](https://img.shields.io/badge/-ClickUp-7B68EE?logo=clickup&logoColor=white)
![Sourcetree](https://img.shields.io/badge/-Sourcetree-0052CC?logo=sourcetree&logoColor=white)

---

## Quick Links

- **[Frontend](frontend/)**
- **[Backend](backend/)**

---

## Installation

### Prerequisites
- Node.js (version 14 or later)
- MongoDB Atlas account (or local MongoDB setup)

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/bizzlink.git
   cd bizzlink
2. **Setup the .env file in the backend folder and configure it to your MongoDB**
    2.1 You have to setup Mongo DB first, you can use MongoDB Compass locally 

```js
PORT=...
MONGO_DB_URI=...
JWT_SECRET=...
NODE_ENV=...
```


3. **Install Dependencies (do for both front end and back end folders)**
    Open Terminal,
    Change the directory to the frontend folder then run "npm install"
    Additional packages:
    npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons

    Open Terminal,
    Change the directory to the backend folder then run "npm install"



4. **Start Backend**
   Open Terminal, 
   Change the directory to the backend folder then run "npm run build" 


```shell
npm run build
```
    If you have errors > 
        It means you did not configure MongoDB properly/ App is not communicating with Mongo DB, troubleshoot. 
        Make Sure MongoDB instance is running



5. **Start Frontend**
    Open Terminal, 
    change the directory to the frontend folder then run "npm start" or "npm run dev"

```shell
npm start
npm run dev
```


6. **Test the App** 
    Open http://localhost:3000/ on 2 browsers/incognito mode. 
    Sign up 2 different accounts, and talk to yourself. 

Please have the [Better Comments Extenstion](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) in VSC to help with important comments and TODO comments
