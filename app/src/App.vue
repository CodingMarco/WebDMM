<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="dark">
      <b-button v-b-toggle.collapse-1 class="navbar-toggler">
        <span class="navbar-toggler-icon"></span>
        <span class="toggler-text">Menu</span>
      </b-button>

      <b-collapse id="collapse-1" is-nav>
        <div class="navbar-nav mt-sm-6">
          <b-nav-item to="/">Home</b-nav-item>
        </div>
      </b-collapse>
    </b-navbar>

    <b-modal v-model="settableShowErrorModal" title="Error" ok-only>
      <p class="my-4">{{ errorMessage }}</p>
    </b-modal>

    <div class="jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 offset-sm-0"><router-view /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["errorMessage", "showErrorModal"]),
    settableShowErrorModal: {
      get() {
        return this.showErrorModal;
      },
      set(newValue) {
        this.setShowErrorModal(newValue);
      },
    },
  },
};
</script>

<style scoped>
a {
  cursor: pointer;
}

button {
  display: flex;
  align-items: center;
  align-self: auto;
}

.toggler-text {
  margin-left: 10px;
}

@media (max-width: 576px) {
  .navbar-nav {
    margin-top: 6px;
  }
}
</style>

<style>
@font-face {
  font-family: "Digital-7 Mono";
  src: url("./fonts/digital-7-mono.ttf");
}
@font-face {
  font-family: "Droid Sans Mono";
  src: url("./fonts/droid-sans-mono.ttf");
}
</style>
