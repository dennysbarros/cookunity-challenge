export const generateUniqueEmail = () => {
    const timestamp = Date.now();
    return `qa.mail${timestamp}@gmail.com`;
};