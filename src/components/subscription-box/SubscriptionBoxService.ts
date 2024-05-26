class SubscriptionBoxService {
    static BASE_URL = process.env.NEXT_PUBLIC_SUBSCRIPTION_BOX_API as string;

    static async createSubscriptionBox(subscription: object, token: string): Promise<any> {
        try {
            const res = await fetch(`${SubscriptionBoxService.BASE_URL}/subscription-box/create`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subscription),
            });
            return res.json();
        } catch (error) {
            throw error;
        }
    }

    static async getSubscriptionBox(token: string): Promise<any> {
        try {
            const res = await fetch(`${SubscriptionBoxService.BASE_URL}/subscription-box/list`, {
                cache: "no-store",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            return res.json();
        } catch (error) {
            throw error;
        }
    }

    static async getSubscriptionBoxById(id: string, token: string): Promise<any> {
        try {
            const res = await fetch(`${SubscriptionBoxService.BASE_URL}/subscription-box/${id}`, {
                cache: "no-store",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            return res.json();
        } catch (error) {
            throw error;
        }
    }
    static async updateSubscriptionBox(subscription: object, token: string) {
        try {
          const res = await fetch(`${SubscriptionBoxService.BASE_URL}/subscription-box/update`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscription),
          });
          return res.json();
        } catch (error) {
          throw error;
        }
      }

    static async deleteSubscriptionBox(id: string, token: string): Promise<any> {
        try {
          const res = await fetch(`${SubscriptionBoxService.BASE_URL}/subscription-box/${id}`, {
            method: "DELETE",
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });
      
          if (res.ok) {
            return res.text(); // Return the plain text response
          } else {
            throw new Error('Failed to delete the subscription box');
          }
        } catch (error) {
          throw error;
        }
      }
      

    static async findByPriceLessThan(price: number, token: string): Promise<any> {
        try {
            const res = await fetch(`${SubscriptionBoxService.BASE_URL}/subscription-box/price/less-than/${price}`, {
                cache: "no-store",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            return res.json();
        } catch (error) {
            throw error;
        }
    }

    static async findByPriceGreaterThan(price: number, token: string): Promise<any> {
        try {
            const res = await fetch(`${SubscriptionBoxService.BASE_URL}/subscription-box/price/greater-than/${price}`, {
                cache: "no-store",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            return res.json();
        } catch (error) {
            throw error;
        }
    }

    static async findByPriceEquals(price: number, token: string): Promise<any> {
        try {
            const res = await fetch(`${SubscriptionBoxService.BASE_URL}/subscription-box/price/equals/${price}`, {
                cache: "no-store",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            return res.json();
        } catch (error) {
            throw error;
        }
    }

    static async findByName(name: string, token: string): Promise<any> {
        try {
            const res = await fetch(`${SubscriptionBoxService.BASE_URL}/subscription-box/name/${name.replace(" ", "-")}`, {
                cache: "no-store",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            return res.json();
        } catch (error) {
            throw error;
        }
    }

    static async findDistinctNames(token: string): Promise<any> {
        try {
            const res = await fetch(`${SubscriptionBoxService.BASE_URL}/subscription-box/distinct-names`, {
                cache: "no-store",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            return res.json();
        } catch (error) {
            throw error;
        }
    }

    static async getLogs(token: string): Promise<any> {
        try {
            const res = await fetch(`${SubscriptionBoxService.BASE_URL}/subscription-box/logs`, {
                cache: "no-store",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            return res.json();
        } catch (error) {
            throw error;
        }
    }

    
    static async getItems(token: string): Promise<any> {
        try {
            const res = await fetch(`${SubscriptionBoxService.BASE_URL}/items/list`, {
                cache: "no-store",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            return res.json();
        } catch (error) {
            throw error;
        }
    }
}

export default SubscriptionBoxService;
