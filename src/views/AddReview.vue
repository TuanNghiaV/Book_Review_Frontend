<template>
  <div class="ui container">
    <h1>Add Review</h1>
    <form @submit.prevent="onSubmit">
      <div class="ui form">
        <div class="field">
          <label>Reviewer</label>
          <input type="text" v-model="review.reviewer" required />
        </div>
        <div class="field">
          <label>Grade</label>
          <input type="number" v-model="review.grade" required>
        </div>
        <div class="field">
          <label>Rating</label>
          <vue-star-rating
            :star-size="30"
            :show-rating="false"
            :rating="review.rating"
            :star-half="true"
            @rating-selected="setRating"
            :star-empty-color="'#ddd'"
            :star-active-color="'#f39c12'"
            :star-half-color="'#f39c12'"
          ></vue-star-rating>
          <input type="hidden" v-model="review.rating" />
        </div>
        <div class="field">
          <label>Comment</label>
          <textarea v-model="review.comment" required></textarea>
        </div>
        <button type="submit" class="ui primary button" :disabled="isSubmitting">Submit</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </div>
    </form>
  </div>
</template>

<script>
import VueStarRating from 'vue-star-rating'; // Import the component
import { AddReview } from '../helpers/api';

export default {
  name: 'AddReview',
  components: {
    VueStarRating
  },
  data() {
    return {
      review: {
        reviewer: '',
        rating: 0, // Initialize rating as a number
        grade: '',
        comment: '',
        date: new Date().toISOString().substring(0, 10) // Default to today's date, but this will be set automatically
      },
      isSubmitting: false,
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    setRating(rating) {
      this.review.rating = rating;
    },
    async onSubmit() {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      // Set the current date when submitting the review
      this.review.date = new Date().toISOString();

      try {
        await AddReview(this.$route.params.id, this.review);
        this.successMessage = 'Review added successfully!';
        this.flash('Review added successfully')
        // Optionally reset the form or redirect
        this.$router.push(`/books/show/${this.$route.params.id}`);
      } catch (error) {
        this.errorMessage = 'Error adding review. Please try again.';
        console.error('Error adding review:', error);
        this.flash('Error adding review. Please try again.')
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

</style>
