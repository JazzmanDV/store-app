<template>
    <ul>
        <li><router-link to="/">О нас</router-link></li>
        <li><router-link to="/goods">Каталог</router-link></li>
        <li>
            <router-link to="/cart"
                >Корзина
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="rubicons cart-basket"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1"
                    fill="none"
                >
                    <path d="M19 21H5L3 9h18l-2 12z" stroke-linecap="round"></path>
                    <path d="M6 9l3-6M18 9l-3-6" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M8 13v4M12 13v4M16 13v4" stroke-linecap="round"></path>
                </svg>
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: "Header",
};
</script>

<style scoped>
ul {
    display: flex;
    justify-content: center;
    gap: 2rem;

    padding: 0.5rem;
    margin: 0;

    border-bottom: 1px solid var(--color-primary);

    list-style-type: none;
}
a {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    text-decoration: none;
}
a:hover,
.link--active svg {
    color: var(--color-primary--hovered);
}
.link--active {
    color: var(--color-primary--hovered);
    text-decoration: underline;
}
</style>
