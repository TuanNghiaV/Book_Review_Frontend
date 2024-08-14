import axios from 'axios';

const backendURL = 'https://book-review-backend-r4dz.onrender.com/books';

export const ViewAllBooks = async () => {
    try {
        const response = await axios.get(backendURL);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const ViewBook = async (id) => {
    try {
        const response = await axios.get(`${backendURL}${id}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const AddNewBook = async (book) => {
    try {
        const response = await axios.post(backendURL, book);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const UpdateBook = async (id, book) => {
    try {
        const response = await axios.put(`${backendURL}${id}`, book);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const DeleteBook = async (id) => {
    try {
        const response = await axios.delete(`${backendURL}${id}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const AddReview = async (bookId, review) => {
    try {
        const response = await axios.post(`${backendURL}${bookId}/reviews`, review);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const DeleteReview = async (bookId, reviewId) => {
    try {
        const response = await axios.delete(`${backendURL}${bookId}/reviews/${reviewId}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

export const DeleteAllBooks = async () => {
    try {
        const response = await axios.delete(backendURL);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};


