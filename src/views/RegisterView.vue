<template>
    <h1>My Register Page</h1>
    <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username">
    </div>
    <div>
        <label for="email">Email</label>
        <input type="text" id="email" v-model="email">
    </div>
    <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password">
    </div>
    <button @click="register">Register</button>

    <p>Already have an account?</p> <router-link to="/login">Login</router-link>
    <p>{{ message }}</p>
</template>

<script>

import router from '../router';
import { register } from '../auth';

export default {
    name: 'RegisterView',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            message: ''
        }
    },
    methods: {
        async register() {
            const response = await register(this.username, this.email, this.password);
            this.message = response.msg;

            if(response.redirect !== null) {
                router.push({path: response.redirect});
            }
        }
    }
}

</script>