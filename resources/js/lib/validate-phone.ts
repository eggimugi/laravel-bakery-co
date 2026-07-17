export const validatePhone = (value: string) => {
    const phoneRegex = /^[0-9+\-()\s]{7,15}$/;

    if (!value) {
        return 'Please enter a phone number';
    }

    if (!phoneRegex.test(value)) {
        return 'Invalid phone number format';
    }

    return null;
};
