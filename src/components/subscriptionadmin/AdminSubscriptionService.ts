class AdminSubscriptionService {
    static BASE_URL = process.env.NEXT_PUBLIC_SUBSCRIPTION_API

    static async getSubscriptions() {
        try {
            const response = await fetch(`${AdminSubscriptionService.BASE_URL}/list`, {
                cache: "no-store"
            });
            return await response.json();
        } catch (error) {
            throw error;
        }
    }

    static async getSubscriptionById(id: any) {
        try {
            const response = await fetch(`${AdminSubscriptionService.BASE_URL}/${id}`, {
                cache: "no-store"
            });
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
}

export default AdminSubscriptionService;