<template>
    <header class="header text-center">
        <h1>Login</h1>
    </header>

    <div class="container">
        <form class="col-md-4 mx-auto">
            <div class="form-floating mb-3">
                <input type="email" v-model="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating mb-3">
                <input type="password" v-model="password" class="form-control" id="floatingPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
            </div>
            <div class="mb-3 align-items-center">
                <button type="button" @click="login" class="btn btn-primary col-auto me-3">Login</button>
                <span class="form-text col-auto me-2">No Account?</span>
                <a class="link-primary" style="cursor: pointer" v-on:click="register()">Register</a>
            </div>
            <div class="alert alert-info" role="alert" v-show="alert">
                {{ message }}
            </div>
        </form>
    </div>
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
            message: '',
            alert: false
        }
    },
    methods: {
        async login() {
            const response = await login(this.email, this.password);
            this.message = response.msg;

            this.alert = true;
            setTimeout(() => {
                this.alert = false;
            }, 3000);

            if (response.redirect !== null) {
                router.push(response.redirect);
            }
        },
        register() {
            const redirect = new URLSearchParams(window.location.search).get('redirect');
            router.push('/register?redirect=' + redirect);
        }
    }
}

</script>

<style>
header {
    margin-top: 1rem;
    margin-bottom: 1rem;
}
</style>