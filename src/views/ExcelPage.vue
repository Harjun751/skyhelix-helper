<script setup>
    import { useRideStore } from '@/stores/store';
    const store = useRideStore();

    function generateSheet(){
        let generated = window.myBundle(store.rides);
        generated.then((result) => {
            const blob = new Blob([result], { type: 'application/octet-stream'})
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob);
            link.download = "SH CABIN MANIFEST.xlsx";
            link.click();
            URL.revokeObjectURL(link.href);
        })
    }
</script>

<template>
    <div>
        <button id="generate" @click="generateSheet">
            <div>
                <!-- <img :src=image /> -->
                <span>Generate Excel Sheet (WIP)</span>
            </div>
        </button>
    </div>
    total pax??
</template>

<style>
div{
    text-align: center;
}
button{
    margin:auto;
    margin-top:40px;
    border-radius: 5px;
    height:50px;
    width: 80vw;
    max-width: 350px;
    padding: 0;
    border: 0;
    font-size: 23px;
    cursor: pointer;
    display:block;
    background-color: var(--secondary-color);
    box-shadow: 0px 5px rgba(0,0,0, 0.25);
}
/* #generate > div > span {
    vertical-align: middle;
    margin-left:10px;
}
#generate > div > img {
    width:40px;
    height:40px;
    vertical-align: middle;
    position:relative;
    top:1px;
} */
</style>