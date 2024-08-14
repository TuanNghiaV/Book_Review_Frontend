<template>
  <div class="container">
    <h1 class="center aligned">Book List</h1>
    <table class="ui celled compact table">
      <thead>
        <tr>
          <th class="center aligned">Title</th>
          <th class="center aligned">Author</th>
          <th class="center aligned">Genre</th>
          <th class="center aligned">Published Date</th>
          <th colspan="3" class="center aligned">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, i) in books" :key="i">
          <td class="center aligned">{{ book.title }}</td>
          <td class="center aligned">{{ book.author }}</td>
          <td class="center aligned">{{ book.genre }}</td>
          <td class="center aligned">{{ formatDate(book.publishedDate) }}</td>
          <td class="center aligned">
            <router-link
              class="ui button green"
              :to="{ name: 'BookDetail', params: { id: book._id } }"
              aria-label="View Book Details"
            >
              <i class="eye icon"></i> View
            </router-link>
          </td>
          <td class="center aligned">
            <router-link
              class="ui button yellow"
              :to="{ name: 'UpdateBook', params: { id: book._id } }"
              aria-label="Edit Book"
            >
              <i class="edit icon"></i> Edit
            </router-link>
          </td>
          <td class="center aligned">
            <button
              class="ui red button"
              @click.prevent="onDelete(book._id)"
              aria-label="Delete Book"
            >
              <i class="trash icon"></i> Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ViewAllBooks, DeleteBook } from "../helpers/api";
import moment from 'moment';

export default {
  name: "BookList",
  data() {
    return {
      books: []
    };
  },
  async created() {
    try {
      this.books = await ViewAllBooks();
    } catch (error) {
      console.error('Failed to load books:', error);
      this.$emit('error', 'Failed to load books');
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).utc().format('DD/MM/YYYY');
    },
    async onDelete(id) {
      if (confirm("Are you sure you want to delete this book?")) {
        try {
          await DeleteBook(id);
          this.books = this.books.filter(book => book._id !== id);
          this.flash('Book deleted succesfully!')
        } catch (error) {
          console.error('Failed to delete book:', error);
          alert('Failed to delete book');
        }
      }
    }
  }
};
</script>

<style scoped>
.center.aligned {
  text-align: center !important;
}
.ui.button i {
  margin-right: 5px;
}
</style>
