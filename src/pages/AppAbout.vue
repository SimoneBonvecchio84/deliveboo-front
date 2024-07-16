<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    data() {
        return {
            projects: [],
            store,
        }
    },
    created() {
        // this.getProject()
        const slug = this.$route.params.slug;
        console.log(slug);
        axios.get(`${store.apiMainUrl}/api/projects/${slug}`).then((resp) => {
            console.log(resp);
            this.projects = resp.data.result;
            console.log(this.projects);
        });
    }    
 
}

</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col">

            </div>
        </div>
    </div>
</template>