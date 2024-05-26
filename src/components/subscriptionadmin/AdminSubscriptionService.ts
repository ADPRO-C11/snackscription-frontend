class AdminSubscriptionService {
    static BASE_URL = "http://localhost:8080";

    static async getSubscriptions() {
        try {
            const response = await fetch(`${this.BASE_URL}/list`, {
                cache: "no-store"
            });
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}

export default AdminSubscriptionService;