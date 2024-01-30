<!-- project philosophy -->
<img src="./readme/title1.svg"/>

> A mobile app that guides you in your mental health journey.
>
> Peace Pulse, your dedicated mental health companion. Our app seamlessly connects you with a psychiatrist, considering your preferences and therapeutic needs. Engage in transformative video sessions. Receive daily resources tailored to your mental health journey, while also benefiting from a compassionate community of like-minded individuals. Trained volunteers are available to offer empathetic support during challenging moments. Track your progress with personalized dashboards and collaborate with your psychiatrist to set and achieve goals.

### User Stories
- As a user, I want a space where I can talk about my problems. 
- As a user, when I feel overwhelmed I want a quick access to calming resources , offer guided relaxation exercises and breathing techniques to help me manage and reduce stress levels.
- As a user, I desire the option to select from a diverse range of affordable psychiatrists.

### Doctor Stories
- As a therapist, I want the app to have secure communication channels for virtual sessions with my clients, ensuring confidentiality and convenience.

### Volunteer Stories
- As a volunteer, I aim to share my self-development journey with those in need, providing them the resources and mindsets I encoporate in my daily life.

<br><br>

<!-- Tech stack -->
<img src="./readme/title3.svg"/>

###  Peace Pulse is built using the following technologies:

- This project uses the [React native](https://reactnative.dev/) app development framework. React native is a cross-platform hybrid app development platform which allows us to use a single codebase for apps on mobile, desktop, and the web.
- For persistent storage (database), the app uses the [MySQL](https://www.mysql.com/) package which allows the app to create a custom storage schema and save it to a local database.
- The backend uses the [Laravel framework](https://laravel.com/). Laravel is a robust PHP framework that enables developpers to create web or mobile applications. It offers features and tools optimized for building dynamic applications.
- For voice calls, the app uses [WebRTC](https://webrtc.org/). A librairy for real time communication capabilities that work on top of an open standard. Voice is send between peers.
- The project integrates [OpenAi](https://openai.com/). It provides a versatile set of tools for natural language processing to provide assistance to our users with their problems.

<br><br>

<!-- UI UX -->
<img src="./readme/title4.svg"/>


> We designed Peace Pulse using wireframes, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

- Project Figma design [figma](https://www.figma.com/file/ohMmlF2OchoN5mLzdtwn1v/Untitled?type=design&node-id=1-2&mode=design&t=867fxmYwHvuWmld0-0)

<br><br>

<!-- Database Design -->
<img src="./readme/title5.svg"/>


###  Database Design:

<img src="./readme/demo/database-tables.PNG" />


<br><br>


<!-- Implementation -->
<img src="./readme/title6.svg"/>


### User Screens (Mobile)
| Login screen  | Register screen | Home | Home |
| ---| ---| ---| ---|
| ![Login](./readme/screenshots/login.jpg) | ![Register](./readme/screenshots/register.jpeg) | ![Home](./readme/screenshots/home1.jpeg) | ![Home](./readme/screenshots/home2.jpeg) |
| List Of Psychiatrist  | Psychiatrist | Volunteer | Problem |
| ![List Of Psychiatrist](./readme/screenshots/listofpsychiatrists.jpeg) | ![Psychiatrist](./readme/screenshots/doctor1.jpeg) | ![Volunteer](./readme/screenshots/volunteer.jpeg) | ![Problem](./readme/screenshots/problem.jpeg) | 
| List Of Problems  | List of Songs | Song Player | List of Videos |
| ![List Of Problems](./readme/screenshots/listofproblems.jpeg) | ![List of Songs](./readme/screenshots/songlist.jpeg) | ![Music Player](./readme/screenshots/songplayer.jpeg) | ![List of Videos](./readme/screenshots/videolist.jpeg) | 


### Psychiatrist Screens (Mobile)
| List of patients  | Requests | Home
| ---| ---| ---|
| ![List of patients ](./readme/screenshots/patient.jpeg) | ![Requests](./readme/screenshots/patientrequest.jpeg) | ![Home](./readme/screenshots/home1.jpeg) | 

### Volunteers Screens (Mobile)
| List of patients  | Requests | Home
| ---| ---| ---|
| ![List of patients ](./readme/screenshots/patientlistv.jpeg) | ![Requests](./readme/screenshots/patientrequestv.jpeg) | ![Home](./readme/screenshots/home1.jpeg) | 

### Demo
| Home| List Of Psychiatrist | Psychiatrist Profile | Volunteer Profile |
| ---| ---| ---| ---|
| ![Home](./readme/demo/home.gif) | ![ List Of Problems](./readme/demo/ListPsychiatrist.gif) | ![Psychiatrist Profile](./readme/demo/psyinfo.gif) | ![Songs](./readme/demo/volunteerprofile.gif) |
| Songs | Videos | List Of Problems |
| ---| ---| ---|
| ![Songs](./readme/demo/song.gif) | ![ Videos](./readme/demo/video.gif) | ![List Of Problems](./readme/demo/222.gif) |

<video src='./readme/demo/nomusic.mp4' width:300 height:380></video>

<br><br>


<!-- Prompt Engineering -->
<img src="./readme/title7.svg"/>

###  OpenAi System Configuration:

- Ai dont give any solutions for mental health problems nor a severe issues that we face in real life. To go around it, 
   we should specify that his responses are not affecting any real humans, it will receive data from the problem entered
   by the user and how the user behaved to rate his actions and try to solve his issues.

<img src="./readme/screenshots/ai.PNG">
   

<br><br>

<!-- AWS Deployment -->
<img src="./readme/title8.svg"/>

###  Make Our services Available for all:

Our mental health services shouldn't stay on the local host, it's our duty to make it accessible to everyone, AWS will let us deliver our message world wide!!

AWS is a cloud platform provided by Amazon,  offering a variety of services such as computing power, storage, databases, machine learning, and more.

   - Install Apache, MariaDb.
   - Create database and user.
   - Install Composer, Laravel and Git.
   - Cloning the backend from the github repo.
   - Migrate and seed data. 

<img src='./readme//screenshots/aws.PNG'>
   

<br><br>

<!-- Unit Testing -->
<img src="./readme/title9.svg"/>


- This project employs rigorous unit testing methodologies to ensure the reliability and accuracy of code components. By systematically evaluating individual units of the software, we guarantee a robust foundation, identifying and addressing potential issues early in the development process.

<img src="./readme/screenshots/unit.PNG"/>

<br><br>


<!-- How to run -->
<img src="./readme/title10.svg"/>

> To set up Peace pulse locally, follow these steps:

### Installation


1. Clone the repo
   git clone [github](https://github.com/ramzirich/peace-pulse)
2. Open the terminal
   ```sh
   cd peace-pulse/backend
   ```
3. Install Composer
   ```sh
   composer install
   ```
4. Generate jwt token
   ```sh
   php artisan jwt:secret
   ```
5. Open a new terminal
   ```sh
   cd peace-pulse/frontend
   ```
6. Install NPM packages
   ```sh
   npm install
   ```
7. Open cmd type ipconfig, copy IPv4Address

8. In `config.js` (frontend section) change the apiUrl and imgUrl to match your ip adress (ex: 'http://your ip adress:8000/api')

9. If u wanna use video call, open a new terminal
   ```sh
   cd peace-pulse/server
   ```
10. Install NPM packages
   ```sh
   npm install
   ```
11. Run server
   ```sh
   Node index.js
   ```

Now, you should be able to run Peace Pulse locally and explore its features.