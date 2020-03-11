## JORGE ARTURO ARELLANO DEL AGUILA

**INSTRUCTIONS**

For testing the repo you can do the following:

1. Clone the repo with the command git clone 
2. In the terminal, move to the repo directory.
3. Run npm install.
4. Once install is finished, run npm run start to view the project.

Note: I added the .env directory for only testing purposes. 


**NOTES ABOUT THE WORK**
1. I decided to use hooks because I think it's less code and the same performance. Also I used useReducer twice for mantaining the application state in a better way than onlu useState. I didn't think it was enough changes in the state to use Redux, but it could also be a posibility.

2. About the structure, I always prefer to make the routes in a separate file, in case we have different types of that (If we have routes with or without session active). I added a types carpet. That contains all types in the app. Now while I'm writing this I was thinking in separate types depends on its cause (One for reducers, others for pokemons, and add more if the application requires to). I also prefer one service carpet (that's an habit for angular, and I read that it's cool if you do that with react too, tell me if I'm wrong). In components I prefer one carpet per screen, and all of the components in that screen would be in the same carpet with a _ at the beginning.

3. I prefer to use Typescript because it helps me in compilation time if I have an error about typing or stuff like that.

4. I used Material-ui because it's the UI library where I feel more confortable.

5. I'm open to suggestions, so if you have any, please let me know it, it makes me grow as a software developer.

Thanks!