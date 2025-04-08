export class AuthService {
  public def_user: any = null;
  private user: any = {};

  constructor() {}

  login(): void {}

  async check(): Promise<void> {
    const url = '/api/remoto/autenticacao/token/check?noCancelOnRouteChange=true';

    try { 
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data && data.authenticated) {
          this.def_user = data.user || null;
        } else {
          this.def_user = null; 
        }

        console.log('Resposta do check:', data);
      } else {
        throw new Error(`Erro ao verificar autenticação: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Erro ao fazer requisição de autenticação:', error);
      this.def_user = null;
    }
  }


  isAuthenticated(): boolean {
    this.check().then(
      (response)=>{
        console.log(response)
      }
    )

    return true
  }
}
