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
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">

      <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
            <router-link class="nav-link" to="/">United Auto Sales<span class="sr-only">(current)</span></router-link>
            </li>
      </ul>
      
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul v-if="seen" class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/cars/new">Add Car<span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/explore">Explore <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <a class="nav-link" @click="myProfile">My Profile<span class="sr-only">(current)</span></a>
          </li>
        </ul>
        
        <ul v-if="seen" class = "navbar-nav mr-auto">
          <li class="nav-item active">
            <a @click="LogoutP" class="nav-link">Logout <span class="sr-only">(current)</span></a>
            <!-- <router-link @click="LogoutP" v-if="seen" class="nav-link" to="/logout">Logout <span class="sr-only">(current)</span></router-link> -->
          </li>
        </ul>
        <ul v-else class = "navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/register">Register <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/login">Login <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `,
    created(){
      let self = this;
      self.seen = localStorage.auth;
      console.log(self.seen)
    },
    data() {
      return {
        user: [],
        seen: localStorage.auth,
      }
      /**if("auth" in localStorage){
        console.log(localStorage.auth)
        return {
          user: [],
          seen: true,
        }
      }
      else{
        console.log(localStorage.auth)
        return {
          user: [],
          seen: false,
        }
      }**/
  },
  methods: {
    myProfile(){
      let uid = localStorage.uid
      router.push(`/users/${uid}`);

    },
    LogoutP(){
      let self = this;
      //self.seen = false;
      //localStorage.auth = false;
      fetch('/api/auth/logout',{
        method: 'GET',
        headers: {
          Authorization: "Bearer " + localStorage.token,
        // 'Authorization': 'Bearer <>'
        'X-CSRFToken': token
      },
      credentials: 'same-origin'
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        localStorage.removeItem('uid')
        localStorage.removeItem('token')
        localStorage.removeItem('auth')
        console.log(localStorage.auth)

        router.push('/');
      }) 
      .catch(function (error) {
        console.log(error);
      });
      
      //self.seen = false
    }
    
  }
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
    <app-header></app-header>
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
          this.$router.push('/register');
        },

        goToLogin(){
          this.$router.push('/login');
        }
    }
};

//--------------------------------------------------------------
const RegistrationForm = {
    name: 'registration-form',
    template: `
    <app-header></app-header>
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
          <label>Full name</label>
          <input type="text" class ="form-control" name="Name">
        </div>
  
        <div class= "form-group">
          <label>Email</label>
          <input type="email" class ="form-control" name="Email">
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
        <button type="submit" name="submit" class="btn btn-primary">Register</button>
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
                    //self.message = ['good',[jsonResponse]]
                }
                
                })
                .catch(function (error) {
                console.log(error);
                });
        }/* ,

        goToProfile(){
          this.$router.push('/api/users/<user_id>');
        } */
    }
};

//--------------------------------------------------------------
const Login = {
    name: 'login',
    template: `
    <app-header></app-header>
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
    
    <form @submit.prevent="loginPro" id="loginForm" method="post">
  
        <div class= "form-group">
          <label>Username</label>
          <input type="text" class ="form-control" id="username" name="Username">
        </div>
  
        <div class= "form-group">
          <label>Password</label>
          <input type="password" class ="form-control" id="password" name="Password">
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
      loginPro(){
        let self = this;
        let loginF = document.getElementById('loginForm');
        let form_data = new FormData(loginF);
        /* let p = document.getElementById('username').value;
        let l = document.getElementById('password').value;
        console.log(form_data)
        console.log(p)
        console.log(l)*/
        fetch("/api/auth/login", {
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
              let token = jsonResponse.info.token
              const tokenParts = token.split('.')
              const payload = JSON.parse(atob(tokenParts[1]))
              //console.log(payload)
              //Store User Infomation in Local Storage
              localStorage.uid = payload.id
              localStorage.token = token
              localStorage.auth = true
              router.push('/explore');
              }
              })
              .catch(function (error) {
                console.log(error);
              
              });
        }
    }
};

//------------------------------------------------------------
const Logout = {
    name: 'logout',
    template: `<app-header></app-header>`,
    data() {
        return {
            message: []
        }
    },
    created(){
      fetch('/api/auth/logout',{
        method: 'GET',
        headers: {
        Authorization: "Bearer " + localStorage.token,
        // 'Authorization': 'Bearer <>'
        'X-CSRFToken': token
      },
      credentials: 'same-origin'
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        localStorage.removeItem('uid')
        localStorage.removeItem('token')
        localStorage.removeItem('auth')
        console.log(localStorage.auth)
        router.push('/');
      }) 
      .catch(function (error) {
        console.log(error);
      });
      
    }

};

//--------------------------------------------------------------
const Explore = {
    name: 'explore',
    template: `
    <app-header></app-header>
    <h2>Explore</h2>
    <form @submit.prevent="searchCar" id="searchForm" method="get">
    <div class="form-inline d-flex justify-content-center">
      <div class="form-group mx-sm-3 mb-2">
        <label for="search">Make</label>
        <input type="search" name="make" id="make" class="form-control mb-2 mr-sm-2"/>

        <label for="search">Model</label>
        <input type="search" name="model" id="model" class="form-control mb-2 mr-sm-2"/>
        
        <button class="btn btn-primary mb-2">Search</button>
      </div>
    </div>
    </form>

    <br>
    <br>

    <div class="car-list d-flex flex-row">

      <ul class="car-list d-flex flex-row flex-wrap">

            <div v-for="car in cars" class="card mr-4 mt-4 mb-4 ml-4" style="width:18rem;">
                <div class="card-body">

                  <div class="card1">
                    <img v-bind:src = car.photo alt="car photo" class="card-img-top rounded-0"/>
                  </div>

                  <div class="card-title">
                    <h6 class="card-title m1-2 mb-0 pb-0" font-weight-bold mb-2>{{car.make}}</h6>
                    <button class="btn btn-primary mb-2">{{car.price}}</button>
                  </div>

                  <div class="card-title">
                    <p>{{car.model}}</p>
                  </div>

                  <div class="card-text mb-3 mt d-flex flex-row flex-wrap">
                    <button class="btn btn-primary mb-2" @click="goToCarDetails(car.id)">ViewDetails</button>
                  </div>
                </div>
            </div>
      </ul>
    </div>    
    `,
    created() {
      let self = this;
      fetch('/api/cars',{
        method: 'GET',
        headers: {
        // JWT requires the Authorization schema to be `Bearer` instead of `Basic`
        Authorization: "Bearer " + localStorage.token,
        'X-CSRFToken': token
      },
      credentials: 'same-origin'
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        if(data.code){
          router.push('/login');
        }
        else{
          self.cars = data.cars;
        }
        
      });
    },
    data() {
        return {
            cars: [],
            message:[]
        }
    },
    methods: {
       searchCar(){
        let self = this;
        let model = document.getElementById('model').value;
        let make = document.getElementById('make').value;
        //console.log(model);
        //console.log(make);

        fetch(`/api/search?model=${model}&make=${make}`, {
            method: 'GET',
            headers: {
              Authorization: "Bearer " + localStorage.token,
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
            self.cars = jsonResponse.cars;
            
            })
            .catch(function (error) {
            console.log(error);
            });
      },

      goToCarDetails(cid){
        this.$router.push(`/cars/${cid}`);

      }
    }
};

//--------------------------------------------------------------
const CarDetails = {
  name: 'car-details',
  template: `
  <app-header></app-header>
  <div class="card" id="card-details">
<<<<<<< HEAD
=======
    <img v-bind:src = car.photo class="card-img-top" alt="cars Logo" id="card-img">
>>>>>>> 92aeac63716b37e20557a00d3f623a8f1ad12c53
    
      <img src="/static/home-img.jpg" class="card-img-top" alt="cars Logo" id="card-img">
    
      <div class="card-body">
        <h5 class=card-title>{{car.year}} {{car.make}}</h5>
        <h4 class=card-title>{{car.model}}</h4>
        <p card-text>{{car.description}}</p>
      
        <div class="row">
          <div class="col-md-4">
            <p class="card-text">Colour: {{car.colour}}</p>
          </div>

          <div class="col-md-4">
            <p class="card-text">Body Type: {{car.car_type}}</p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <p class="card-text">Price: {{car.price}}</p>
          </div>

          <div class="col-md-4">
            <p class="card-text">Transmission: {{car.transmission}}</p>
          </div>
        </div>

<<<<<<< HEAD
        <div class="row" id="prop-btn">
            <button type="submit" name="submit" class="btn btn-primary">EmailOwner</button>
            <button type="submit" name="submit" class="btn btn-primary" @click="addToFavourites(car_id)">Like</button>
            <i class="bi bi-heart"></i>
        </div>
=======
      <div class="row" id="prop-btn">
          <button type="submit" name="submit" class="btn btn-primary">EmailOwner</button>
          <button type="submit" name="submit" class="btn btn-primary" @click="addToFavourites(car.id)">Like</button>
          <i class="bi bi-heart"></i>
      </div>
>>>>>>> 92aeac63716b37e20557a00d3f623a8f1ad12c53
    </div>
  </div>
  `,
  data() {
      return {
          car: [],
          message: []
      }
  },
  methods: {
    addToFavourites(car_id){
      let self = this;
      let host = window.location.protocol + "//" + window.location.host;
      //fetch(`api/cars/${car_id}/favourite`,{
      fetch(`${host}/api/cars/${car_id}/favourite`,{
        method: 'POST',
        headers: {
          Authorization: "Bearer " + localStorage.token,
          'X-CSRFToken': token
          },
          credentials: 'same-origin'
      })
          .then(function (response) {
            return response.json();
      })
             .then(function(data){
                console.log(data);
                //self.car = data.car;
      });
    }
  },
  created() {
    let self = this;
    fetch(`/api/cars/${self.$route.params.car_id}`,{
      method: 'GET', 
      headers: {
      Authorization: "Bearer " + localStorage.token,
      // 'Authorization': 'Bearer <>'
      'X-CSRFToken': token
    },
    credentials: 'same-origin'
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      self.car = data.car;

    });
  },
};

//--------------------------------------------------------------
const User = {
  name: 'user',
  template:`
    <app-header></app-header>
    <div class="card" id="myprofile">

      <div class="card-img"> 
        <img v-bind:src = user.photo class="card-img-top" alt="profilephoto" id="profilephoto">
      </div>  

      <div class="card-body">
        <h5 class=card-title>{{user.name}}</h5>
        <h3 class=card-title>@{{user.username}}</h3>
        <br>
        <p class="card-text">{{user.biography}}</p>
        <br>
        <br>
        <p class="card-text text-left">Email: {{user.email}}</p>
        <p class="card-text text-left">Location: {{user.location}}</p>
        <p class="card-text text-left">Joined: {{user.date_joined}}</p> 
      </div>
    </div>  

    <br>
    <br>

    <div>
      <h2 class="text-left">Cars Favourited</h2>
    </div>

    <div class="car-list d-flex flex-row">

      <ul class="car-list d-flex flex-row flex-wrap">

            <div v-for="car in favourites" class="card mr-4 mt-4 mb-4 ml-4" style="width:18rem;">
                <div class="card-body">

                  <div class="card-title">
                    <h6 class="card-title m1-2 mb-0 pb-0" font-weight-bold mb-2>{{car.year}} {{car.make}} {{car.model}}</h6>
                  </div>

                  <div class="card1">
                    <img v-bind:src =car.photo alt="car photo" class="card-img-top rounded-0"/>
                  </div>

                  <div class="card-text mb-3 mt d-flex flex-row flex-wrap">
                    <p class="card-text">{{car.description}}</p>
                  </div>
                  <div class="card-text mb-3 mt d-flex flex-row flex-wrap">
                    <button class="btn btn-primary mb-2" @click="goToCarDetails(car.id)">ViewDetails</button>
                  </div>
                </div>
            </div>
      </ul>
    </div>    
  `,
    created()
    {
      let self = this;
      let uid = localStorage.uid

      fetch(`/api/users/${self.$route.params.user_id}`, {
          method: 'GET',
          headers: {
            Authorization: "Bearer " + localStorage.token,
              'X-CSRFToken': token
              },
              credentials: 'same-origin'
          })
             .then(function(response){
                return response.json();
             })
             .then(function(data){
                console.log(data);
                if(data.code){
                  router.push('/login');
                }
                self.user = data.user;
             });

      fetch(`/api/users/${uid}/favourites`, {
              method: 'GET',
              headers: {
                Authorization: "Bearer " + localStorage.token,
                  'X-CSRFToken': token
                  },
                  credentials: 'same-origin'
              })
                 .then(function(response){
                    return response.json();
                 })
                 .then(function(data){
                    console.log(data);
                    self.favourites = data.cars;
                 });
    },
    methods: {
      goToCarDetails(cid){
        this.$router.push(`/cars/${cid}`);

      }
    },
    data(){
      return{
        user: [],
        favourites: []
  
      }
  }
};

//--------------------------------------------------------------
const CarForm = {
    name: 'upload-form',
    template: `
    <app-header></app-header>
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
          <input type="text" class ="form-control" name="Make">
        </div>
  
        <div class= "form-group">
          <label>Model</label>
          <input type="text" class ="form-control" name="Model">
        </div>
  
        <div class= "form-group">
          <label>Colour</label>
          <input type="text" class ="form-control" name="Colour">
        </div>
  
        <div class= "form-group">
          <label>Year</label>
          <input type="text" class ="form-control" name="Year">
        </div>

        <input type="hidden" class ="form-control" name="User" :value=uid>
  
        <div class= "form-group">
          <label>Price</label>
          <input type="text" class ="form-control" name="Price">
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
            message: [],
            uid: localStorage.uid
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
                else if(jsonResponse.code){
                  self.message = ['bad', ["Please Login"]]
                  router.push('/login');
                }
                else{
                    self.message = ['good',["Car Sucessfully Added"]]
                }
                
                })
                .catch(function (error) {
                console.log(error);
                });
        }
    }
};

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
    { path: '/logout', component: Logout },
    { path: '/explore', component: Explore },
    { path: '/users/:user_id', component: User },
    { path: '/cars/new', component: CarForm },
    { path: '/cars/:car_id', component: CarDetails },
    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');