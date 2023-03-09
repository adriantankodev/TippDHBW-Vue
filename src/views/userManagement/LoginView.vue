<template>
    <h1>My login Page</h1>

    <div>
        <label for="username">Email</label>
        <input type="text" id="email" v-model="email">
    </div>
    <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password">
    </div>
    <button @click="login">Login</button>
    <p>No Account?</p> <a v-on:click="register()">Register!</a>
    <p>{{ message }}</p>
</template>

<script>

import router from '../../router';
import { login } from '../../auth';

export default {
    name: 'LoginView',
    data() {
        return {
            email: '',
            password: '',
            message: ''
        }
    },
    methods: {
        async login() {
            const response = await login(this.email, this.password)
            this.message = response.msg;

            if (response.redirect !== null) {
                router.push({ path: response.redirect });
            }
        },
        register() {
            const redirect = new URLSearchParams(window.location.search).get('redirect');
            router.push('/register?redirect=' + redirect);
        }
    }
}

</script>