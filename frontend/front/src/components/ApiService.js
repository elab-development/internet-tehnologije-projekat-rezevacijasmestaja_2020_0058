import axios from "axios";

class ApiService {
  // User authentication
  register(user) {
    return axios.post("http://localhost:8000/api/register", user);
  }

  // login(email, password) {
  //   return axios.post("http://localhost:8000/api/login", {
  //     email: email,
  //     password: password
  //   });
  // }

  login(email, password) {
    return axios.post('http://localhost:8000/api/login', { email, password })
      .then(response => {
        const { access_token, user, role } = response.data;
        this.setToken(access_token);
        this.setLoginInfo(role, user.email, user.id);
        return response.data;
      });
  }

  // logout() {
  //   return window.sessionStorage.clear();
  // }

  logout() {
    return axios.post('http://localhost:8000/api/logout', {}, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    }).then(response => {
      this.clearLoginInfo();
      return response;
    });
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
    window.sessionStorage.setItem("userID", id);
  }

  getLoginInfo() {
    const role = window.sessionStorage.getItem("role");
    const email = window.sessionStorage.getItem("email");
    const id = window.sessionStorage.getItem("userID");

    return { role, email, id };
  } 

  clearLoginInfo() {
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("role");
    window.sessionStorage.removeItem("email");
    window.sessionStorage.removeItem("userID");
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

  getAccommodationsByUserId(userId){
    return axios.get(`http://localhost:8000/api/accommodations/user/${userId}`);
  }

  get3RandomAccommodations(){
    return axios.get("http://localhost:8000/api/accommodations3")
  }

  getAccommodationById(id) {
    return axios.get(`http://localhost:8000/api/accommodations/${id}`);
  }

  getAccommodationsByLocationId(locationId) {
    return axios.get(`http://localhost:8000/api/accommodations/location/${locationId}`);
  }

  createAccommodation(accommodation) {
    return axios.post("http://localhost:8000/api/accommodations", accommodation, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  deleteAccommodation(id){
    return axios.delete(`http://localhost:8000/api/accommodations/${id}`)
  }

  addAccommodation(data) {
    return axios.post('http://localhost:8000/api/accommodations', data);
  }

  updateAccommodation(id, data){
    return axios.put(`http://localhost:8000/api/accommodations/${id}`, data);
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

  // Search accommodations
  searchAccommodations(destination, startDate, endDate, guests) {
    return axios.get('http://localhost:8000/api/search', {
      params: { destination, startDate, endDate, guests }
    });
  }

  getUnavailableDates(destination) {
    return axios.get('http://localhost:8000/api/unavailable-dates', {
      params: { destination }
    });
  }

  //Locations
  getLocations() {
    return axios.get('http://localhost:8000/api/locations');
  }

  get5RandomLocations(){
    return axios.get("http://localhost:8000/api/locations5")
  }

  // Reservations
  
/*
  getReservationById(id) {
    return axios.get(`http://localhost:8000/api/reservations/${id}`);
  }*/

    getAccommodationTypes() {
      return axios.get('http://localhost:8000/api/accommodation-types');
    }

    getReservations(userID, page = 1, perPage = 5) {
      return axios.get(`http://localhost:8000/api/reservations/${userID}`, {params: {page, per_page: perPage}});
    }

    cancelReservation(reservationID){
      // console.log("apiservice: " + reservationID);
      return axios.delete(`http://localhost:8000/api/reservations/${reservationID}`);
    }

    getReservedDates(smestajID){
      return axios.get(`http://localhost:8000/api/reservations/${smestajID}/dates`)
    }

  createReservation(reservation) {
    return axios.post("http://localhost:8000/api/reservations", reservation, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
