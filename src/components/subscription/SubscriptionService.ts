class SubscriptionService {
    static BASE_URL = process.env.NEXT_PUBLIC_SUBSCRIPTION_API;
    
    static async createSubscription(subscription: object, token: string) {
      try {
        const res = await fetch(`${SubscriptionService.BASE_URL}/subscription/create`, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(subscription),
        });
      } catch (error) {
        throw error;
      }
    }
  
    static async getSubscription(token: string) {
      try {
        const res = await fetch(`${SubscriptionService.BASE_URL}/subscription/list`, {
          cache: "no-store",
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        return res;
      } catch (error) {
        throw error;
      }
    }
  
    static async getSubscriptionById(id: string, token: string) {
      try {
        const res = await fetch(`${SubscriptionService.BASE_URL}/subscription/${id}`, {
          cache: "no-store",
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        return res.json();
      } catch (error) {
        console.log("Error", error);
      }
    }
  
    static async getSubscriptionByUser(userId: string, token: string) {
      try {
        const res = await fetch(`${SubscriptionService.BASE_URL}/subscription/list/${userId}`, {
          cache: "no-store",
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });
        return res.json();
      } catch (error) {
        console.log("Error", error);
      }
    }
  
    static async updateSubscription(subscription: object, token: string) {
      try {
        const res = await fetch(`${SubscriptionService.BASE_URL}/subscription/update`, {
          method: "PATCH",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(subscription),
        });
        if (!res.ok) {
          throw new Error('Failed to update subscription');
        }
        return res.json();
      } catch (error) {
        throw error;
      }
    }
  }
  
  export default SubscriptionService;
  