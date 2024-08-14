import Vue from 'vue';
import Router from 'vue-router';
import BookList from './views/BookList.vue';
import BookDetail from './views/BookDetail.vue';
import AddBook from './views/AddBook.vue';
import UpdateBook from './views/UpdateBook.vue';
import AddReview from './views/AddReview.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/books' },
    { path: '/books', name: 'BookList', component: BookList },
    { path: '/books/new', name: 'AddBook', component: AddBook },
    { path: '/books/show/:id', name: 'BookDetail', component: BookDetail },
    { path: '/books/edit/:id', name: 'UpdateBook', component: UpdateBook },
    { path: '/books/show/:id/reviews', name: 'AddReview', component: AddReview },  ]
});

export default router;
