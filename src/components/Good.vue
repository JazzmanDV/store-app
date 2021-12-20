<template>
    <div class="good">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <span>{{ price }} у.е.</span>
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 4">
                <line
                    x1="2"
                    y1="0"
                    x2="2"
                    y2="4"
                    stroke="black"
                    stroke-width="1px"
                    vector-effect="non-scaling-stroke"
                ></line>
                <line
                    x1="0"
                    y1="2"
                    x2="4"
                    y2="2"
                    stroke="black"
                    stroke-width="1px"
                    vector-effect="non-scaling-stroke"
                ></line>
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    name: "Good",
    props: {
        title: String,
        description: String,
        price: Number,
    },
};
</script>

<style scoped>
.good {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding: 1rem;
    background-color: #fff;
    border: 1px solid var(--color-primary);
}
h3 {
    margin: 0;
    text-align: center;
}
p {
    margin: 0;
}
span {
    align-self: flex-end;
}
button {
    cursor: pointer;
    font: inherit;

    width: 2rem;
    height: 2rem;

    align-self: flex-end;

    padding: 0.25rem;

    background-color: #fff;
    border: 1px solid var(--color-primary);
    transition: 0.25s border;
}
line {
    transition: 0.25s stroke;
}
button:hover {
    border: 1px solid var(--color-primary--hovered);
}
button:hover line {
    stroke: var(--color-primary--hovered);
}
</style>
