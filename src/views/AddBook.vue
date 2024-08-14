<template>
  <div class="ui container">
    <h1>Add New Book</h1>
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
          <input type="text" v-model="book.genre" required />
        </div>
        <div class="field">
          <label>Published Date</label>
          <input type="date" v-model="book.publishedDate" required />
        </div>
        <div class="field">
          <label>Summary</label>
          <textarea v-model="book.summary" class="large-textarea" required></textarea>
        </div>
        <button type="submit" class="ui primary button" :disabled="isSubmitting">Submit</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import { AddNewBook } from "../helpers/api";

export default {
  name: "AddBook",
  data() {
    return {
      book: {
        title: '',
        author: '',
        genre: '',
        publishedDate: '',
        summary: ''
      },
      isSubmitting: false,
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async onSubmit() {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      try {
        await AddNewBook(this.book);
        this.successMessage = 'Book added successfully!';
        this.flash('Book added successfully!', 'success');
        this.$router.push("/books");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.errorMessage = error.response.data.message;
          this.flash(error.response.data.message, 'error');
        } else {
          this.errorMessage = 'Failed to add book. Please try again.';
          console.error("Error adding book:", error);
          this.flash('Error adding book', 'error');
        }
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style scoped>
.large-textarea {
  height: 150px;
  width: 100%;
  padding: 10px;
  resize: vertical;
}
.error {
  color: red;
}
.success {
  color: green;
}
.button-container {
  text-align: center;
}
</style>
