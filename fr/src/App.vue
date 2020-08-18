<template>
    <div id="app">
        <div id="startingPage">
            <h1>Map Client</h1>
            <upload-file></upload-file>
             <br>
             <GetDemographics /><br><br>
            <GetFile />
           
        </div>
        <div id="body">
                <div id="essential">
                    <Essential />
                </div>
        </div>
    </div>
</template>

<script>
import GetFile from './components/GetFile.vue'
import Essential from './components/Essential.vue'
import GetDemographics from './components/GetDemographics.vue'
import UploadFile from '@/components/UploadFile.vue'

export default {
    name: 'App',
    components: {
        GetFile,
        Essential,
        GetDemographics,
        UploadFile,
    },
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

#nonEssential {
    width: 100%;
    height: 700px;
    background: #E8E8E8;
}

#startingPage {
    height: 500px;
}




</style>
