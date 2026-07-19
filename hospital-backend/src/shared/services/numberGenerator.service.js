import counterRepository from "../repositories/counter.repository.js";

class NumberGeneratorService {
    async generate(counterName) {
        const counter = await counterRepository.next(counterName);
        const year = counter.year ?? new Date().getFullYear();
        return `${counter.prefix}-${year}-${String(counter.value).padStart(counter.digits, "0")}`;
    }

}

export default new NumberGeneratorService();