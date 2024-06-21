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
              <a href="https://etherscan.io/address/0xC5FF85CE7A617D77D7E73DB113CA804F01F02A18" target="_blank" class="link">THUMP</a>
            </li>
            <li>
              <a href="https://etherscan.io/address/0x08e2f48832a71Ed1033900365F926145Bb6D6aC4" target="_blank" class="link">BODEN</a>
            </li>
          </ul>
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

