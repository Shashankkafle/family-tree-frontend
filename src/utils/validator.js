import { toast } from "react-toastify";

export const validatePersonvalues = (data) => {
    if(!data.firstName) {
        toast.error('First Name is required')
        return 'firstName';
    };
    if(!data.lastName){
        toast.error('Last Name is required');
        return 'lastName';
    }
    if(!data.birthDate) {
        toast.error('Birth Date is required');
        return 'birthDate';
    }
    if(!data.gender){
        toast.error('Gender is required');
        return 'gender';
    }
    if(data.deathDate && new Date(data.deathDate) < new Date(data.birthDate)) {
        toast.error('Death Date cannot be before Birth Date');
        return 'deathDate';
    }
    if(data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        toast.error('Invalid email format');
        return 'email';
    }
    return null
}