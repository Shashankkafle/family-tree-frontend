import { useState, useEffect } from "react";
import axios from "axios";

//to fetch all people
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

//to fetch all aprtners of a person
export const useFetchAllPartners = (parentId) => {
  const [partners, setPartners] = useState([]);
  const [isPartnerLoading, setIsPartnerLoading] = useState(false);
  const [partnerError, setPartnerError] = useState();
  async function fetchAllPartners() {
    try {
      setIsPartnerLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/person/partner/${parentId}`)
      if (response.data) {
        setPartners(response.data);
      }
    } catch (error) {
      setPartnerError(error);
      console.error("Failed to fetch partner:", error);
    } finally {
      setIsPartnerLoading(false);
    }
  }

  useEffect(() => {
    fetchAllPartners();
  }, []);

  return { partners, isPartnerLoading, partnerError };
};

