class AuthenticationService {
    static BASE_URL = process.env.NEXT_PUBLIC_AUTH_API
  
    static async login(email: string, password: string){
      try{
        const response = await fetch(`${AuthenticationService.BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email, password})
        });
        return response.json();
      } catch(err) {
        throw err;
      }
    }
  
    static async register(userData: object){
      try{
        const response = await fetch(`${AuthenticationService.BASE_URL}/auth/register`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
        return response.json();
      } catch(err) {
        throw err;
      }
    }

    static async getProfile(token: string){
        try{
            const response = await fetch(`${AuthenticationService.BASE_URL}/useradmin/get-profile`, {
                method: "GET",
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                },
              });
              return response.json();
        } catch(err) {
            throw err;
        }
    }
  
    static async getAllUsers(token: string){
      try{
        const response = await fetch(`${AuthenticationService.BASE_URL}/admin/get-all-users`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        return response.json();
      } catch(err) {
        throw err;
      }
    }
  
    static async getUserById(userId: string, token: string){
      try{
        const response = await fetch(`${AuthenticationService.BASE_URL}/admin/get-user/${userId}`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        return response.json();
      } catch(err) {
        throw err;
      }
    }
  
    static async delete(userId: string, token: string){
      try{
        const response = await fetch(`${AuthenticationService.BASE_URL}/useradmin/delete/${userId}`, {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        return response.json();
      } catch(err) {
        throw err;
      }
    }
  
    static async update(userId: string, userData: object, token: string){
      try{
        const response = await fetch(`${AuthenticationService.BASE_URL}/useradmin/delete/${userId}`, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        return response.json();
      } catch(err) {
        throw err;
      }
    }

    
  
    static logout(){
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  
    static isAuthenticated(){
      const token = localStorage.getItem('token')
      return !!token;
    }
  
    static isAdmin(){
      const role = localStorage.getItem('role')
        return role === 'ADMIN' ;
    }
    
    static isUser(){
      const role = localStorage.getItem('role')
        return role === 'USER' ;
    }
  
    static adminOnly(){
      return this.isAuthenticated() && this.isAdmin();
    }
  }
  
  export default AuthenticationService;