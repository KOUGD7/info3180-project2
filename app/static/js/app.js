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
            <router-link class="nav-link" to="/users/{user_id}">UserProfile <span class="sr-only">(current)</span></router-link>
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
const RegistrationForm = {
    name: 'registration-form',
    template: `
    <h2>Register New User</h2>
    <div>
 
    </div>
    `,
    data() {
        return {
            message: []
        }
    },
    methods: { }
};
//--------------------------------------------------------------

const Login = {
    name: 'login',
    template: `
    <h2>Login</h2>
    <div>
 
    </div>
    `,
    data() {
        return {
            message: []
        }
    },
    methods: {}
};
//--------------------------------------------------------------

const Logout = {
    name: 'logout',
    template: `
    <h2>Logout</h2>
    <div>
 
    </div>
    `,
    data() {
        return {
            message: []
        }
    },
    methods: {}
};
//--------------------------------------------------------------

const Explore = {
    name: 'explore',
    template: `
    <h2>Explore</h2>
    <div>
 
    </div>
    `,
    data() {
        return {
            message: []
        }
    },
    methods: {}
};
//--------------------------------------------------------------

const UserProfile = {
    name: 'users',
    template: `
    <h2>Users</h2>
    <div>
 
    </div>
    `,
    data() {
        return {
            message: []
        }
    },
    methods: {}
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
    <h2>Car Details</h2>
    <div>
 
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
const Home = {
    name: 'Home',
    template: `
    <div class="row home-page" style="width:100%;">
      <div class="column home-des" style="float:left; width:50%; height:100%;">
        <b-row>
          <h1><strong>Buy and Sell Cars Online</strong></h1>
        </b-row>

        <b-row>
          <p>United Auto Sales provides the fastest, easiest and most user
             friendly way to buy or sell cars online. Find a Great Price on
             the Vehicle You Want
             </p>
        </b-row>

        <div class="row">
            <div class="col-md-2">
                <button to="/register" type="submit" class="register typebtn" style="border:2px solid #20B2AA; background-color:#20B2AA; border-radius:25px; color:#FFFFFF;">Register</button>
            </div>

            <div class="col-md-2">
                <button to="/login" type="submit" class="login typebtn" style="border: 2px solid #FFD700; background-color:#FFD700; border-radius:25px; color:#FFFFFF">Login</button>
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
    { path: '/users/{user_id}', component: UserProfile },
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