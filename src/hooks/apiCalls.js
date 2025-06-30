import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchAllPerson = () => {
  const [people, setPeople] = useState([]);
  const [isPeopleLoading, setIsPeopleLoading] = useState(false);
  const [peopleError, setPeopleError] = useState();

  async function fetchAllPerson() {
    try {
      setIsPeopleLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/person`
      );
      if (response.data) {
        setPeople(response.data);
      }
    } catch (error) {
      setPeopleError(error);
      console.error("Failed to fetch people:", error);
    } finally {
      setIsPeopleLoading(false);
    }
  }

  useEffect(() => {
    fetchAllPerson();
  }, []);

  return { people, isPeopleLoading, peopleError };
};

