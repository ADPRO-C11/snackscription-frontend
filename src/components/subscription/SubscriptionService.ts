class SubscriptionService {
    static BASE_URL = process.env.NEXT_PUBLIC_SUBSCRIPTION_API
    
    static async createSubscription(subscription: object){
        try{
            const res = await fetch(`${SubscriptionService.BASE_URL}/subscription/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subscription),
            });
        } catch (error){
            throw error;
        }
    }

    static async getSubscription(){
        try {
            const res = await fetch(`${SubscriptionService.BASE_URL}/subscription/list`, {
                cache: "no-store"
            });
            return res;
        } catch (error) {
            throw error;
        }
    }

    static async getSubscriptionById(id: string){
        try{
            const res = await fetch(`${SubscriptionService.BASE_URL}/subscription/${id}`, {
                cache: "no-store"
            });
            return res.json();
        } catch (error) {
            console.log("Error", error)
        }
    }
}

export default SubscriptionService;