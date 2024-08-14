<template>
  <div id="app">
    <!-- Navigation Bar -->
    <div class="navbar">
      <div class="ui secondary menu">
        <router-link to="/" class="item" exact>
          Home
        </router-link>
        <router-link to="/books/new" class="item">
          Add New Book
        </router-link>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div class="ui container">
        <router-view></router-view>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <div class="ui container">
        <p>&copy; 2024 Book Review App. All rights reserved.</p>
      </div>
    </div>

    <!-- Flash Messages -->
    <div class="flash-message-container">
      <flash-message></flash-message>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Basic Reset */
html, body {
  height: 100%;
  margin: 0;
}

/* Container Styles */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #F6EACB; /* Background color */
}

/* Navigation Bar Styles */
.navbar {
  margin-bottom: 20px;
  display: flex;
  justify-content: center; /* Center items horizontally */
  background-color: #D1E9F6; /* Navbar color */
}

.ui.menu {
  display: flex;
  justify-content: center; /* Center items within the menu */
}

/* Main Content Styles */
.main-content {
  flex: 1;
}

/* Footer Styles */
.footer {
  margin-top: auto; /* Pushes footer to the bottom */
  padding: 10px 0;
  text-align: center;
  background-color: #EECAD5; /* Footer color */
  color: black; /* Text color for contrast */
}

.footer a {
  color: #333; /* Darker color for links */
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

/* Flash Message Styles */
.flash-message-container {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
}


</style>
