import axios from "axios";

class ApiService {

    getAllAccommodations(){
        return axios.get("http://localhost:8000/api/accommodations");
    }

  
};

const apiService = new ApiService();

export { apiService };