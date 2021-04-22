/* Add your Application JavaScript */
// Instantiate our main Vue Instance
const app = Vue.createApp({
    data() {
        return {

        }
    }
});

app.component('app-header', {
    name: 'AppHeader',
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">United Auto Sales</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/register">Register <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/login">Login <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/logout">Logout <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/explore">Explore <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/users/{user_id}">MyProfile <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/upload">Upload <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/cars/new">Add Car<span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/cars/{card_id}">Car Details <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

app.component('app-footer', {
    name: 'AppFooter',
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; {{ year }} Flask Inc.</p>
        </div>
    </footer>
    `,
    data() {
        return {
            year: (new Date).getFullYear()
        }
    }
});

//--------------------------------------------------------------
const Home = {
    name: 'Home',
    template: `
    <div class="row home-page" style="width:100%;">
      <div class="column home-des" style="float:left; width:50%; height:100%;">
        <div class="row">
          <h1><strong>Buy and Sell Cars Online</strong></h1>
        </div>

        <div class="row">
          <p>United Auto Sales provides the fastest, easiest and most user
             friendly way to buy or sell cars online. Find a Great Price on
             the Vehicle You Want
             </p>
        </div>

        <div class="row">
            <div class="col-md-2">
                <button @click="goToRegister()" type="submit" class="register typebtn" style="border:2px solid #20B2AA; background-color:#20B2AA; border-radius:25px; color:#FFFFFF;">Register</button>
            </div>

            <div class="col-md-2">
                <button @click="goToLogin()" type="submit" class="login typebtn" style="border: 2px solid #FFD700; background-color:#FFD700; border-radius:25px; color:#FFFFFF">Login</button>
            </div>
        </div>

      </div>

      <div class="column home-img" style="float:left; width:50%; height:100%;">
        <img src="/static/home-img.jpg" alt="home-img" style="object-fit:fill;" >
      </div>
    </div>
    `,
    data() {
        return {}
    },
      methods: {
        goToRegister(){
          this.$router.push('/api/register');
        },

        goToLogin(){
          this.$router.push('/api/login');
        }
    }
};
//--------------------------------------------------------------
const RegistrationForm = {
    name: 'registration-form',
    template: `
    <h2>Register New User</h2>
    <div v-if="message[0] == 'good'">
        <div class="alert alert-success" role="alert">
            <ul v-for="m in message[1]" > 
                <li>{{ m }}</li>
            </ul>
        </div>
    </div>
    <div v-if="message[0] == 'bad'">
        <div class="alert alert-warning" role="alert">
            <ul v-for="m in message[1]"> 
                <p>{{ m }}</p>
            </ul>
        </div>
    </div>
    
    <form @submit.prevent="uploadProfilePhoto" id="uploadprofile" method="post">
  
        <div class= "form-group">
          <label>Username</label>
          <input type="text" class ="form-control" name="Username">
        </div>
  
        <div class= "form-group">
          <label>Password</label>
          <input type="password" class ="form-control" name="Password">
        </div>
  
        <div class= "form-group">
          <label>Fullname</label>
          <input type="text" class ="form-control" name="Fullname">
        </div>
  
        <div class= "form-group">
          <label>Email</label>
          <input type="text" class ="form-control" name="Email">
        </div>

        <div class= "form-group">
          <label>Location</label>
          <input type="text" class ="form-control" name="Location">
        </div>
  
        <div class="form-group">
          <label class="font-weight-bold">Biography</label>
          <textarea class="form-control" rows="5" id="des" name="Biography"></textarea>
        </div>
    
        <div class = "form-group">
          <label>Upload Photo</label>
          <input class ="form-control" type="file" name="photo">
        </div>
        <button type="submit" name="submit" class="btn btn-primary" @click="goToProfile()">Register</button>
    </form>
    `,
    data() {
        return {
            message: []
        }
    },
    methods: {
        uploadProfilePhoto(){
            let self = this;
            let uploadprofile = document.getElementById('uploadprofile');
            let form_data = new FormData(uploadprofile);
  
            fetch("/api/register", {
                method: 'POST',
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                    },
                    credentials: 'same-origin'
                })
                .then(function (response) {
                return response.json();
                })
                .then(function (jsonResponse) {
                // display a success message
                console.log(jsonResponse);
                if(jsonResponse.error){
                    self.message = ['bad', jsonResponse.error]
                }
                else{
                    self.message = ['good',[jsonResponse]]
                }
                
                })
                .catch(function (error) {
                console.log(error);
                });
        },

        goToProfile(){
          this.$router.push('/api/users/<user_id>');
        }
    }
};
//--------------------------------------------------------------

const Login = {
    name: 'login',
    template: `
    <h2>Login to your account</h2>
    <div v-if="message[0] == 'good'">
        <div class="alert alert-success" role="alert">
            <ul v-for="m in message[1]" > 
                <li>{{ m }}</li>
            </ul>
        </div>
    </div>
    <div v-if="message[0] == 'bad'">
        <div class="alert alert-warning" role="alert">
            <ul v-for="m in message[1]"> 
                <p>{{ m }}</p>
            </ul>
        </div>
    </div>
    
    <form @submit.prevent="login" id="login" method="post">
  
        <div class= "form-group">
          <label>Username</label>
          <input type="text" class ="form-control" name="Username">
        </div>
  
        <div class= "form-group">
          <label>Password</label>
          <input type="password" class ="form-control" name="Password">
        </div>
    
        <button type="submit" name="submit" class="btn btn-primary">Login</button>
    </form>
    `,
    data() {
        return {
            message: []
        }
    },
    methods: {
     /*   Login(){

            fetch("/api/login", {
                method: 'POST',
                headers: {
                    'X-CSRFToken': token
                    },
                    credentials: 'same-origin'
                })
                .then(function (response) {
                return response.json();
                })
                .then(function (jsonResponse) {
                // display a success message
                console.log(jsonResponse);
                if(jsonResponse.error){
                    self.message = ['bad', jsonResponse.error]
                }
                else{
                    self.message = ['good',[jsonResponse.car.message]]
                }
                
                })
                .catch(function (error) {
                console.log(error);
                });
        }*/
    }
  };
//--------------------------------------------------------------

const Explore = {
    name: 'explore',
    template: `
    <h2>Explore</h2>
    <div class="form-inline d-flex justify-content-center">
      <div class="form-group mx-sm-3 mb-2">
        <label for="search">Make</label>
        <input type="search" name="make" v-model="searchTerm" id="make" class="form-control mb-2 mr-sm-2"/>

        <label for="search">Model</label>
        <input type="search" name="model" v-model="searchTerm" id="model" class="form-control mb-2 mr-sm-2"/>
        
        <button class="btn btn-primary mb-2" @click="searchCar">Search</button>
      </div>
    </div>

    <br>
    <br>

    <div class="car-list d-flex flex-row">

      <ul class="car-list d-flex flex-row flex-wrap">

            <div v-for="car in cars" class="card mr-4 mt-4 mb-4 ml-4" style="width:18rem;">
                <div class="card-body">

                  <div class="card1">
                    <img v-bind:src =car.urlToImage alt="car photo" class="card-img-top rounded-0"/>
                  </div>

                  <div class="card-title">
                    <h6 class="card-title m1-2 mb-0 pb-0" font-weight-bold mb-2>Random car Make</h6>
                    <button class="btn btn-primary mb-2">$100,000</button>
                  </div>

                  <div class="card-title">
                    <p>Random car Model</p>
                  </div>

                  <div class="card-text mb-3 mt d-flex flex-row flex-wrap">
                    <button class="btn btn-primary mb-2" @click="goToCarDetails">ViewDetails</button>
                  </div>
                </div>
            </div>
      </ul>
    </div>    
    `,
    data() {
        return {
            message: []
        }
    },
    methods: {
       searchCar(){
          
      },

      goToCarDetails(){
        this.$router.push('/cars/{card_id}');
      }
    }
};
//--------------------------------------------------------------

const MyProfile = {
  name: 'MyProfile',
  template:`
    <div class="card" id="myprofile">

      <div class="card-img"> 
        <img src="/static/img_avatar2.png" class="card-img-top" alt="profilephoto" id="profilephoto">
      </div>  

      <div class="card-body">
        <h5 class=card-title>2018 Danicka Patrick</h5>
        <h3 class=card-title>@dpatrick</h3>
        <br>
        <p class="card-text">Some random text until we connect the backend. Same thing for the titles.</p>
        <br>
        <br>
        <p class="card-text text-left">Email: dpatrick@example.com</p>
        <p class="card-text text-left">Location: Wisconsin, USA</p>
        <p class="card-text text-left">Joined: April 8,2021</p> 
      </div>
    </div>  

    <br>
    <br>

    <div>
      <h2 class="text-left">Cars Favourited</h2>
    </div>

    <div class="car-list d-flex flex-row">

      <ul class="car-list d-flex flex-row flex-wrap">

            <div v-for="car in cars" class="card mr-4 mt-4 mb-4 ml-4" style="width:18rem;">
                <div class="card-body">

                  <div class="card-title">
                    <h6 class="card-title m1-2 mb-0 pb-0" font-weight-bold mb-2>Random car title</h6>
                  </div>

                  <div class="card1">
                    <img v-bind:src =car.urlToImage alt="car photo" class="card-img-top rounded-0"/>
                  </div>

                  <div class="card-text mb-3 mt d-flex flex-row flex-wrap">
                    <p class="card-text">Random car description</p>
                  </div>
                </div>
            </div>
      </ul>
    </div>    
  `,
    created()
    {
    /*  let self = this;

      fetch("/api/users/{user_id}", {
          method: 'GET',
          body: form_data,
          headers: {
              'X-CSRFToken': token
              },
              credentials: 'same-origin'
          })
             .then(function(response){
                return response.json();
             })
             .then(function(data){
                console.log(data);
                self.users = data.users;
             }); */
    },
    data(){
      return{
        /*  users: [],
          searchTerm: '' */
      }
    },
    methods: {
     /* searchcar(){
        let self = this;

        fetch('/api/cars'+ self.searchTerm + '&language=en',{
          method: 'GET',
          body: form_data,
          headers: {
              'X-CSRFToken': token
              },
              credentials: 'same-origin'
          })
              .then(function(response){
                return response.json();
              })
              .then(function(data){
                console.log(data);
                self.cars = data.cars;
              });
      } */
    }
};
//--------------------------------------------------------------

const UploadForm = {
    name: 'upload-form',
    template: `
    <h2>Upload Form</h2>
    <div v-if="message[0] == 'good'">
        <div class="alert alert-success" role="alert">
            <ul v-for="m in message[1]" > 
                <li>{{ m }}</li>
            </ul>
        </div>
    </div>
    <div v-if="message[0] == 'bad'">
        <div class="alert alert-warning" role="alert">
            <ul v-for="m in message[1]"> 
                <p>{{ m }}</p>
            </ul>
        </div>
    </div>
    
    <form @submit.prevent="uploadPhoto" id="uploadForm" method="post">
        <div class= "form-group">
            <label>Description</label>
            <textarea class ="form-control" name="description" placeholder="Description"></textarea>
        </div>
        <div class = "form-group">
            <label>Photo Upload</label>
            <input class ="form-control" type="file" name="photo">
        </div>
        <button type="submit" name="submit" class="btn btn-primary">Upload</button>
    </form>
    `,
    data() {
        return {
            message: []
        }
    },
    methods: {
        uploadPhoto(){
            let self = this;
            let uploadForm = document.getElementById('uploadForm');
            let form_data = new FormData(uploadForm);

            fetch("/api/upload", {
                method: 'POST',
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                    },
                    credentials: 'same-origin'
                })
                .then(function (response) {
                return response.json();
                })
                .then(function (jsonResponse) {
                // display a success message
                console.log(jsonResponse);
                if(jsonResponse.error){
                    self.message = ['bad', jsonResponse.error]
                }
                else{
                    self.message = ['good',[jsonResponse.info.message]]
                }
                
                })
                .catch(function (error) {
                console.log(error);
                });
        }
    }
};

//--------------------------------------------------------------

const CarForm = {
    name: 'upload-form',
    template: `
    <h2>Add New Car</h2>
    <div v-if="message[0] == 'good'">
        <div class="alert alert-success" role="alert">
            <ul v-for="m in message[1]" > 
                <li>{{ m }}</li>
            </ul>
        </div>
    </div>
    <div v-if="message[0] == 'bad'">
        <div class="alert alert-warning" role="alert">
            <ul v-for="m in message[1]"> 
                <p>{{ m }}</p>
            </ul>
        </div>
    </div>
    
    <form @submit.prevent="uploadCarPhoto" id="uploadCar" method="post">
  
        <div class= "form-group">
          <label>Make</label>
          <input type="text" class ="form-control" name="Make"></input>
        </div>
  
        <div class= "form-group">
          <label>Model</label>
          <input type="text" class ="form-control" name="Model"></input>
        </div>
  
        <div class= "form-group">
          <label>Colour</label>
          <input type="text" class ="form-control" name="Colour"></input>
        </div>
  
        <div class= "form-group">
          <label>Year</label>
          <input type="text" class ="form-control" name="Year"></input>
        </div>
  
        <div class= "form-group">
          <label>Price</label>
          <input type="text" class ="form-control" name="Price"></input>
        </div>
  
        <div class= "form-group">
          <label>Car Type</label>
          <select id="Car_Type" name="Car_Type" class ="form-control">
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Truck">Truck</option>
          </select>
        </div>
  
        <div class= "form-group">
          <label>Transmission</label>
          <select id="Transmission" name="Transmission" class ="form-control">
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>
  
        <div class= "form-group">
          <label>Description</label>
          <textarea class ="form-control" name="Description" placeholder="Description"></textarea>
        </div>
  
        <div class = "form-group">
          <label>Photo Upload</label>
          <input class ="form-control" type="file" name="photo">
        </div>
        <button type="submit" name="submit" class="btn btn-primary">Upload</button>
    </form>
    `,
    data() {
        return {
            message: []
        }
    },
    methods: {
        uploadCarPhoto(){
            let self = this;
            let uploadCar = document.getElementById('uploadCar');
            let form_data = new FormData(uploadCar);
  
            fetch("/api/cars", {
                method: 'POST',
                body: form_data,
                headers: {
                    'X-CSRFToken': token
                    },
                    credentials: 'same-origin'
                })
                .then(function (response) {
                return response.json();
                })
                .then(function (jsonResponse) {
                // display a success message
                console.log(jsonResponse);
                if(jsonResponse.error){
                    self.message = ['bad', jsonResponse.error]
                }
                else{
                    self.message = ['good',[jsonResponse.car.message]]
                }
                
                })
                .catch(function (error) {
                console.log(error);
                });
        }
    }
  };

//----------------------------------------------------------------

const CarDetails = {
    name: 'car-details',
    template: `
    <div class="card" style="width: 18rem;" id="card-details">
      <img src="/static/home-img.jpg" class="card-img-top" alt="cars Logo" id="card-img">
      
      <div class="card-body">
        <h5 class=card-title>2018 Tesla</h5>
        <h4 class=card-title>Model S</h4>
        <p card-text>Some random text until we connect the backend. Same thing for the titles.</p>
      
        <div class="row">
          <div class="col-md-4">
            <p class="card-text">Colour: (Red)</p>
          </div>

          <div class="col-md-4">
            <p class="card-text">Body Type: (Sedan)</p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <p class="card-text">Price: ($100000)</p>
          </div>

          <div class="col-md-4">
            <p class="card-text">Transmission: (Automatic)</p>
          </div>
        </div>

        <div class="row" id="prop-btn">
            <button type="submit" name="submit" class="btn btn-primary">EmailOwner</button>
            <i class="bi bi-heart"></i>
        </div>
      </div>
    </div>
    `,
    data() {
        return {
            message: []
        }
    },
    methods: {}
};
//----------------------------------------------------------------
/*const Home = {
    name: 'Home',
    template: `
    <div class="jumbotron">
        <h1>United Auto Sales</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
    `,
    data() {
        return {}
    }
};*/

const NotFound = {
    name: 'NotFound',
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data() {
        return {}
    }
};

// Define Routes
const routes = [
    { path: "/", component: Home },
    // Put other routes here
    { path: '/register', component: RegistrationForm },
    { path: '/login', component: Login },
    //{ path: '/logout', component: Logout },
    { path: '/explore', component: Explore },
    { path: '/users/{user_id}', component: MyProfile },
    { path: '/upload', component: UploadForm },
    { path: '/cars/new', component: CarForm },
    { path: '/cars/{card_id}', component: CarDetails },
    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');