// src/hooks/useCities.ts
import { useState, useEffect } from 'react';
import { fetchCities, City } from '../api/citiesApi';

interface UseCitiesReturn {
  cities: City[];
  loading: boolean;
  error: Error | null;
}

export default function useCities(): UseCitiesReturn {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function getCities() {
      try {
        const citiesData = await fetchCities();
        setCities(citiesData);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getCities();
  }, []);

  return { cities, loading, error };
}
