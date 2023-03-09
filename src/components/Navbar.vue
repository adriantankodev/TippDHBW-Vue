<template>

    <nav class="navbar navbar-expand-md navbar-dark" style="background-color: #096A2E;">
        <div class="container">
            <a class="navbar-brand" v-on:click="this.$router.push({path: '/'})"><img src="/logo-banner.svg" height="40" width="100" alt="logo"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav">
                    <li class="nav-item" style="cursor: pointer">
                        <a class="nav-link px-2" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" active-class="active" v-on:click="this.$router.push({path: '/'})">Home</a>
                    </li>
                    <li class="nav-item" style="cursor: pointer">
                        <a class="nav-link px-2" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" active-class="active" v-on:click="this.$router.push({path: '/tippabgabe'})">Tippabgabe</a>
                    </li>
                    <li class="nav-item" style="cursor: pointer">
                        <a class="nav-link px-2" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" active-class="active" v-on:click="this.$router.push({path: '/tippuebersicht'})">Tippübersicht</a>
                    </li>
                    <li class="nav-item" style="cursor: pointer">
                        <a class="nav-link px-2" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" active-class="active" v-on:click="this.$router.push({path: '/rangliste'})">Rangliste</a>
                    </li>
                    <li class="nav-item" style="cursor: pointer">
                        <a class="nav-link px-2" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" active-class="active" v-on:click="this.$router.push({path: '/tabelle'})">Tabelle</a>
                    </li>
                    <li class="nav-item" style="cursor: pointer">
                        <a class="nav-link px-2" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" active-class="active" v-on:click="this.$router.push({path: '/about'})">Über uns</a>
                    </li>
                    <li class="nav-item" style="cursor: pointer">
                        <a class="nav-link px-2" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" active-class="active" v-on:click="this.$router.push({path: '/profile'})">Profile</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    methods: {
        logout() {
            localStorage.removeItem('token');
            this.$router.push({path: '/login'});
        }
    }
}
</script>

<style>

</style>
