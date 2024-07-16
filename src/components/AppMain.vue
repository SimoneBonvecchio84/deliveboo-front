<script>
import axios from 'axios';
import { router } from '../router';
export default {
    data() {
        return {
            projects: [],
            curPage: "",
            totalPage: ""
        }
    },
    created() {
        this.curPage = 1;
        this.loadPage();
    },
    methods: {
        loadPage() {
            axios.get('http://127.0.0.1:8000/api/projects', {
                params: {
                    page: this.curPage
                }
            }).then((resp) => {
                this.projects = resp.data.result.data;
                this.totalPage = resp.data.result.last_page;
            })
        },
        changePage(value) {
            this.curPage = value;
            this.loadPage();
        },
        showNext() {
            if(this.curPage < this.totalPage ){
                this.curPage++;
                this.loadPage();
            }
        },
        showPrev() {
            if(this.curPage > 1) {
                this.curPage--;
                this.loadPage();
            }
        }

    }
}
</script>

<template>
    <div class="container">
        <h1 class="py-3">Lista Progetti</h1>



        <!-- pagination -->
        <nav aria-label="Page navigation" class="py-5">
            <ul class="pagination d-flex justify-content-center">

                
                <li :class="{ disabled: curPage === 1 }" @click.prevent="showPrev()">
                    &leftarrow;
                </li>

              
                <li v-for="page in totalPage" :key="page" :class="{ active: curPage === page }"
                    @click.prevent="changePage(page)">
                    {{ page }}
                </li>

                
                <li :class="{ disabled: curPage === numberPages }" @click.prevent="showNext()">
                    &RightArrow;
                </li>
            </ul>
        </nav>
        <!-- /pagination -->


        <div class="row gap-2">
            <div class="col" v-for="curProject in projects ">
                <router-link class="text-decoration-none" :to="{
                    name: 'about', params: {
                        slug: curProject.slug
                    }
                }">
                    <div class="card h-100" style="width: 18rem;">
                        <img src="..." class="card-img-top" alt="...">
                        <div class="card-body">
                            {{ curProject.title }}
                            <h5 class="card-title">
                            </h5>
                            <h5 class="card-title">
                                {{ curProject.type_id }}
                            </h5>

                            <p>
                                {{ curProject.content }}
                            </p>

                            <h6>Data:
                                {{ curProject.created_at }}
                            </h6>

                        </div>
                    </div>
                </router-link>

            </div>
        </div>
    </div>


</template>

<style lang="scss" scoped>
i:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}

li:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

li {
    text-align: center;
    display: inline-block;
    width: 40px;
    aspect-ratio: 1;
    line-height: 40px;
    background-color: black !important;
    border: 1px solid gray;
    color: white !important;
}

li.active {
    background-color: gray !important;
}
</style>