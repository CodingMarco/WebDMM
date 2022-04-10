<template>
  <b-card no-body>
    <template #header>
      <span class="mr-4 font-weight-bold">User {{ user.id }}</span>
      <b-button variant="danger" @click="onDelete">Delete</b-button>
    </template>
    <b-list-group flush>
      <b-list-group-item>Name: {{ user.name }}</b-list-group-item>
      <b-list-group-item>Email: {{ user.email }}</b-list-group-item>
      <b-list-group-item>User ID: {{ user.id }}</b-list-group-item>
      <b-list-group-item>Roles: {{ user.roles }}</b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "UserData",
  props: {
    user: Object,
  },
  computed: mapGetters(["currentUser"]),
  methods: {
    ...mapActions(["deleteUser", "logoutLocalUser"]),
    onDelete() {
      this.deleteUser(this.user.id);
      if (this.user.id === this.currentUser.id) {
        // If we have deleted ourselves, we just delete currentUser in the vuex-store
        // without calling the API since the API doesn't know about us anymore...
        this.logoutLocalUser();
      }
    },
  },
};
</script>
