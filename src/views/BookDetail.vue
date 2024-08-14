<template>
  <div class="ui container">
    <h1>{{ book.title }}</h1>
    <p><strong>Author:</strong> {{ book.author }}</p>
    <p><strong>Genre:</strong> {{ book.genre }}</p>
    <p><strong>Summary:</strong> {{ book.summary }}</p>
    <p><strong>Published Date:</strong> {{ formattedPublishedDate }}</p>

    <h2>Reviews</h2>
    <div v-if="book.reviews && book.reviews.length">
      <div v-for="(review, index) in book.reviews" :key="index" class="ui segment">
        <p><strong>Reviewer:</strong> {{ review.reviewer }}</p>
        <p><strong>Grade:</strong> {{ review.grade }}</p>
        <p><strong>Rating:</strong>
          <span v-for="star in Math.floor(review.rating)" :key="star" class="star">★</span>
        </p>
        <p><strong>Comment:</strong> {{ review.comment }}</p>
        <p><strong>Date:</strong> {{ formatDate(review.date) }}</p>
      </div>
    </div>
    <div v-else>
      <p>No reviews yet.</p>
    </div>

    <!-- Centered Add Review Button -->
    <div class="button-container">
      <router-link :to="`/books/show/${book._id}/reviews`">
        <button class="ui primary button">Add a Review</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { ViewBook } from '../helpers/api';

export default {
  name: 'BookDetail',
  data() {
    return {
      book: {}
    };
  },
  computed: {
    formattedPublishedDate() {
      return moment(this.book.publishedDate).format('DD/MM/YYYY');
    }
  },
  async mounted() {
    this.book = await ViewBook(this.$route.params.id);
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    }
  }
};
</script>

<style scoped>
.star {
  color: gold;
}
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
