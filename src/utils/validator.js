import { toast } from "react-toastify";


const isAlphabetic = (str) => /^[A-Za-z\s]+$/.test(str);
const isValidLength = (str, min = 1, max = 50) => str.length >= min && str.length <= max;
const isValidDate = (dateStr) => {
    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date);
};

export const validatePersonvalues = (data) => {
    if(!data.firstName) {
        toast.error('First Name is required')
        return 'firstName';
    };
    if (!isAlphabetic(data.firstName)) {
        toast.error('First Name must contain only letters');
        return 'firstName';
    }
    if (!isValidLength(data.firstName, 2, 30)) {
        toast.error('First Name must be between 2 and 30 characters');
        return 'firstName';
    }
    if(!data.lastName){
        toast.error('Last Name is required');
        return 'lastName';
    }
    if (!isAlphabetic(data.lastName)) {
        toast.error('Last Name must contain only letters');
        return 'lastName';
    }
    if (!isValidLength(data.lastName, 2, 30)) {
        toast.error('Last Name must be between 2 and 30 characters');
        return 'lastName';
    }
    if(!data.birthDate) {
        toast.error('Birth Date is required');
        return 'birthDate';
    }
    if (!isValidDate(data.birthDate)) {
        toast.error('Invalid Birth Date format');
        return 'birthDate';
    }
    if(!data.gender){
        toast.error('Gender is required');
        return 'gender';
    }
    if(!(data.gender==='male'||data.gender==='female')){
        throw  Error('Gender vslue can oly be male or female')
    }

    if(data.deathDate && new Date(data.deathDate) < new Date(data.birthDate)) {
        toast.error('Death Date cannot be before Birth Date');
        return 'deathDate';
    }
    if (data.deathDate && !isValidDate(data.deathDate)) {
        toast.error('Invalid Death Date format');
        return 'deathDate';
    }
    if(data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        toast.error('Invalid email format');
        return 'email';
    }
    return null
}