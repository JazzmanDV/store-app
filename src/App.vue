<template>
    <div>
        <Header />
        <router-view></router-view>
    </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
    name: "App",
    components: {
        Header,
    },
};
</script>

<style>
:root {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 22px;

    background-color: #f6f6f6;

    --color-primary: black;
    --color-primary--hovered: #e6ab3f;
}
a,
svg {
    color: var(--color-primary);
    transition: 0.25s color;
}
h2 {
    text-align: center;
}
</style>
