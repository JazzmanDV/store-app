<template>
    <ul>
        <li><router-link to="/">О нас</router-link></li>
        <li><router-link to="/goods">Товары</router-link></li>
        <li>
            <router-link to="/cart">
                Корзина ({{ totalAmountInCart }})
                <svg
                    xmlns="http://www.w3.org/2000/svg"
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
    props: {
        totalAmountInCart: Number,
    },
};
</script>

<style scoped>
ul {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    z-index: 9999;

    box-shadow: 0px 0px 10px 0px rgba(34, 60, 80, 0.2);

    margin: 0;
    padding: 0.5rem;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;

    background-color: white;

    list-style-type: none;
}
a {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    text-decoration: none;

    border-bottom: 2px solid transparent;
    transition: 0.25s color, 0.25s border-bottom-color;
}
a:hover,
a:hover svg,
.link--active,
.link--active svg {
    color: var(--color-primary--hovered);
}
.link--active {
    border-bottom: 2px solid var(--color-primary--hovered);
}
</style>
