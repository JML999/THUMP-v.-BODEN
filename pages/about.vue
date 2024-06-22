<script setup lang="ts">
</script>

<template>
  <div>
    <UContainer>
      <ClientOnly>
        <div class="content-container">
          <h2 class="sub-header">Contracts</h2>
          <ul class="contract-list">
            <li>
              <a href="https://explorer.hytopia.com/address/0x203800c56668c6A679588FFCD8d262898c96A38b?tab=txs" target="_blank" class="link">THUMP</a>
            </li>
            <li>
              <a href="https://explorer.hytopia.com/address/0xB9BDBBeD36Df340Ed71A257B8b1C1fA1f7161396?tab=contract" target="_blank" class="link">BODEN</a>
            </li>
            
          </ul>
          <div class="footer">
      <h3>Web3 Starter template by <a class="text-primary" href="https://twitter.com/abstruked">Abstrucked.eth</a></h3>
      <br>
      <p>&copy; 2024</p>
        </div>
    </div>
      </ClientOnly>
    </UContainer>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'Minecraftia';
  src: url('../assets/Minecraftia.ttf') format('truetype');
}

body {
  font-family: 'Minecraftia', sans-serif;
}

.header-container {
  font-family: 'Minecraftia', sans-serif;
  text-align: center;
  margin-bottom: 20px;
}

.footer {
  color: black;
  text-align: center;
  margin-top: 300px;
}

.main-header {
  font-family: 'Minecraftia', sans-serif;
  font-size: 3em;
  color: blue;
  margin: 0;
}

.sub-header {
  font-family: 'Minecraftia', sans-serif;
  font-size: 1.5em;
  color: blue;
}

.american-flag-background {
  background: repeating-linear-gradient(
    0deg,
    #ff0000,
    #ff0000 20px,
    #ffffff 20px,
    #ffffff 40px
  );
  padding: 20px;
}

.content-container {
  padding: 20px;
  text-align: center;
}

.description {
  margin-top: 20px;
  font-size: 1.2em;
}

.link {
  color: red;
  text-decoration: underline;
  font-family: 'Minecraftia', sans-serif;
}

ul.contract-list {
  font-family: 'Minecraftia', sans-serif;
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
}

ul.contract-list li {
  
  margin: 10px 0;
}
</style>

