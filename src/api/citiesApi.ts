export interface City {
    _id: string;
    name: string;
    country: string;
    description: string;
    image: string;
    currency: string;
    language: string;
    averageRating: number;
    itineraries: string[];
}

interface ApiResponse {
    status: number;
    statusMsg: string;
    data: City[];
}

export async function fetchCities(): Promise<City[]> {
    try {
      const response = await fetch("https://mytinerary-server.onrender.com/api/cities");
      const json: ApiResponse = await response.json();
      return json.data;
    } catch (error) {
      throw error;
    }
}