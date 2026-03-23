import axios from "axios";

export default axios.create({
    baseURL: "https://expense-tracker-backend-204916618868.us-central1.run.app/api"
});