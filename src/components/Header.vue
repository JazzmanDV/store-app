<template>
    <ul>
        <li><a href="#">О нас</a></li>
        <li><a href="#">Каталог</a></li>
        <li>
            <a href="#">Корзина <img src="../assets/cart-basket.svg" /></a>
        </li>
    </ul>
</template>

<script>
export default {
    name: "Header",
    props: {
        msg: String,
    },
};
</script>

<style scoped>
ul {
    display: flex;
    justify-content: center;
    gap: 2rem;
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
}
a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
}
</style>
