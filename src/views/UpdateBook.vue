<template>
  <div class="ui container">
    <h1>Update Book</h1>
    <form @submit.prevent="onSubmit">
      <div class="ui form">
        <div class="field">
          <label>Title</label>
          <input type="text" v-model="book.title" required />
        </div>
        <div class="field">
          <label>Author</label>
          <input type="text" v-model="book.author" required />
        </div>
        <div class="field">
          <label>Genre</label>
          <input type="text" v-model="book.genre" />
        </div>
        <div class="field">
          <label>Summary</label>
          <textarea v-model="book.summary" />
        </div>
        <div class="field">
          <label>Published Date</label>
          <input type="date" v-model="formattedPublishedDate" />
        </div>
        <button type="submit" class="ui primary button" :disabled="isSubmitting">Update</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import { UpdateBook, ViewBook } from '../helpers/api';

export default {
  name: 'UpdateBook',
  data() {
    return {
      book: {
        title: '',
        author: '',
        genre: '',
        summary: '',
        publishedDate: '',
      },
      isSubmitting: false,
      errorMessage: '',
      successMessage: ''
    };
  },
  computed: {
    formattedPublishedDate: {
      get() {
        // Convert date to YYYY-MM-DD format
        return this.book.publishedDate ? new Date(this.book.publishedDate).toISOString().split('T')[0] : '';
      },
      set(value) {
        // Convert input date format to ISO string
        this.book.publishedDate = new Date(value).toISOString();
      }
    }
  },
  async mounted() {
    try {
      this.book = await ViewBook(this.$route.params.id);
    } catch (error) {
      console.error('Error fetching book details:', error);
      this.errorMessage = 'Error fetching book details. Please try again.';
    }
  },
  methods: {
    async onSubmit() {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      try {
        await UpdateBook(this.$route.params.id, this.book);
        this.successMessage = 'Book updated successfully!';
        this.flash('Book updated successfully!')
        this.$router.push(`/books/show/${this.$route.params.id}`);
      } catch (error) {
        this.errorMessage = 'Error updating book. Please try again.';
        console.error('Error updating book:', error);
        this.flash('Error updating book')
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
.success {
  color: green;
}
.button-container {
  text-align: center; /* Centers horizontally */
}

</style>
