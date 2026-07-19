export const formatPatientNumber = (number) => {

    const year = new Date().getFullYear();

    return `PAT-${year}-${String(number).padStart(6,"0")}`;

}