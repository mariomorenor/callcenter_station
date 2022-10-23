<template>
    <div>
        <div class="calling-box">
            <strong>Nombre:</strong>
            <p>Jonathan Mario Moreno Rivera  </p>
            <strong>Cédula:</strong>
            <p>2300349640</p>
            <strong>Carrera:</strong>
            <p>Tecnologías de la Información</p>
            <hr class="my-2">
            <b-button icon-left="phone-volume" size="is-small" type="is-success"></b-button>
            <b-button icon-left="volume-mute" size="is-small" class="mx-1" type="is-warning"></b-button>
        </div>
    </div>

</template>

<script>
export default {
    name: "IncommingCall"
}
</script>

<style lang="scss">
.calling-box {
    width:300px;
    margin: .5rem 1rem;
    padding: 1rem;
    transition: all .3s;
    box-shadow: 2px 1px 5px black;
    border-radius: 5px;
    font-size: small;

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
        box-shadow: 2px 2px 10px 2px #0e0e0e;
    }
}
</style>