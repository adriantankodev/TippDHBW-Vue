<template> 
  <section id="bg_ost" class="jumbotron text-center">
    <div class="container">
      <h1 class="custom-class">Willkommen bei TippMeToTheMoon!</h1>
      <h6 id="text_home" class="custom-class">Wir bieten Euch ein phänomenales Tipperlebnis mit unzähligen Features. <br> Probiert es
        selbst aus und ladet Eure Freunde ein für eine einzigartige Erfahrung! <br> Viel Spaß! </h6>
    </div>
  </section>

  <div class="album py-5 bg-light">
    <div class="container">

      <div class="row">
        <div class="col-md-4">
          <router-link class="nav-link px-2" active-class="active" to="/tippabgabe">
            <div class="card bg-dark text-white">
              <img class="card-img" src="/kopfball.jpg" alt="Card image">
              <div class="card-img-overlay">
                <h4 class="card-title">Zur Tippabgabe</h4>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-md-4">
          <router-link class="nav-link px-2" active-class="active" to="/tippuebersicht">
            <div class="card bg-dark text-white">
              <img class="card-img" src="/jubel.jpg" alt="Card image">
              <div class="card-img-overlay">
                <h4 class="card-title">Zur Tippübersicht</h4>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-md-4">
          <router-link class="nav-link px-2" active-class="active" to="/Tabelle">
          <div class="card bg-dark text-white">
            <img class="card-img" src="/buli.jpg" alt="Card image">
            <div class="card-img-overlay">
              <h4 class="card-title">Zur Tabelle</h4>
            </div>
          </div>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<style>
#bg_ost {
  background-image: url("../background.jpg") !important;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.6;
}

#text_home{
  margin-bottom: 100px; ;
}

:root {
  --jumbotron-padding-y: 3rem;
}

.jumbotron {
  color: white;
  padding-top: var(--jumbotron-padding-y);
  padding-bottom: var(--jumbotron-padding-y);
  margin-bottom: 0;
  background-color: #fff;
}

@media (min-width: 500px) {
  .jumbotron {
    padding-top: calc(var(--jumbotron-padding-y) * 2);
    padding-bottom: calc(var(--jumbotron-padding-y) * 2);
  }

  .div.container.h1 {
    font-size: 8px;
  }
}


.jumbotron p:last-child {
  margin-bottom: 0;
}

.jumbotron-heading {
  font-weight: 300;
}

.jumbotron .container {
  max-width: 40rem;
}

.box-shadow {
  box-shadow: 0 .25rem .75rem rgba(0, 0, 0, .05);
}

div.row {
  --bs-gutter-y: 1rem;
}

.card:hover {
  opacity: 60%;
}
</style>


