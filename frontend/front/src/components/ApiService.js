import axios from "axios";

class ApiService {
  // User authentication
  register(user) {
    return axios.post("http://localhost:8000/api/register", user);
  }

  login(email, password) {
    return axios.post("http://localhost:8000/api/login", {
      email: email,
      password: password,
    });
  }

  logout() {
    return window.sessionStorage.clear();
  }

  setToken(token) {
    window.sessionStorage.setItem("token", token);
  }

  getToken() {
    return window.sessionStorage.getItem("token");
  }

  setLoginInfo(role, email, id) {
    window.sessionStorage.setItem("role", role);
    window.sessionStorage.setItem("email", email);
    window.sessionStorage.setItem("id", id);
  }

  getLoginInfo() {
    const role = window.sessionStorage.getItem("role");
    const email = window.sessionStorage.getItem("email");
    const id = window.sessionStorage.getItem("id");

    return { role, email, id };
  }

 /* getLoggedInUser() {
    const token = this.getToken();
    const { id } = this.getLoginInfo();

    if (!token || !id) {
      return Promise.reject("User is not logged in");
    }

    return axios.get(`http://localhost:8000/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching logged-in user:", error);
        throw error;
      });
  }*/

  // Accommodations
  getAccommodations() {
    return axios.get("http://localhost:8000/api/accommodations");
  }

  /*getAccommodationById(id) {
    return axios.get(`http://localhost:8000/api/accommodations/${id}`);
  }*/

  createAccommodation(accommodation) {
    return axios.post("http://localhost:8000/api/accommodations", accommodation, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }
/*
  updateAccommodation(id, accommodation) {
    return axios.put(`http://localhost:8000/api/accommodations/${id}`, accommodation, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }*/

  /*deleteAccommodation(id) {
    return axios.delete(`http://localhost:8000/api/accommodations/${id}`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }*/

  // Reservations
  getReservations() {
    return axios.get("http://localhost:8000/api/reservations");
  }
/*
  getReservationById(id) {
    return axios.get(`http://localhost:8000/api/reservations/${id}`);
  }*/

  createReservation(reservation) {
    return axios.post("http://localhost:8000/api/reservations", reservation, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }
/*
  updateReservation(id, reservation) {
    return axios.put(`http://localhost:8000/api/reservations/${id}`, reservation, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }*/

 /* deleteReservation(id) {
    return axios.delete(`http://localhost:8000/api/reservations/${id}`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }*/


}

const apiService = new ApiService();

export { apiService };
