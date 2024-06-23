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
              <a href="https://hychain.calderaexplorer.xyz/address/0x1ea1171efb09860cc62c3d8e10a91501198ff1ff" target="_blank" class="link">THUMP</a>
            </li>
            <li>
              <a href="https://hychain.calderaexplorer.xyz/address/0xf5a3be317415594a5eaaea17048f4dcad978546b" target="_blank" class="link">BODEN</a>
            </li>
            
          </ul>
          <div class="footer">
      <h3>Web3 Starter template by <a class="text-primary" href="https://x.com/abstrucked">Abstrucked.eth</a></h3>
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

