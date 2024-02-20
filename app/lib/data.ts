import axios from "axios";

export async function getSubjects() {
    try {
        const response = await axios.get("/api/resources/subjects");
        return response.data;
    } catch (error) {
        console.error(error);
    }

}