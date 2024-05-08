class SubscriptionService {
    static BASE_URL = "http://localhost:8080"
    
    static async createSubscription(subscription: object){
        try{
            const res = await fetch('http://localhost:8080/subscription/create', {
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
            const res = await fetch(`http://localhost:8080/subscription/list`, {
                cache: "no-store"
            });
            return res;
        } catch (error) {
            throw error;
        }
    }

    static async getSubscriptionById(id: string){
        try{
            const res = await fetch(`http://localhost:8080/subscription/${id}`, {
                cache: "no-store"
            });
            return res.json();
        } catch (error) {
            console.log("Error", error)
        }
    }
}

export default SubscriptionService;