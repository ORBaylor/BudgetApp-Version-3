<template>
  <div id="app">
    <nav>

    </nav>
    <router-view />
  </div>
</template>

<style>
body {
  background-color: #2c3e50;
  /* background-color: aliceblue; */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}

nav {
  padding: 30px;
  background-color: #2c3e50;
  /* background-color: aliceblue; */
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  /* background-color: aliceblue;*/
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
