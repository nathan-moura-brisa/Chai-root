import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from 'single-spa-layout';
import microfrontendLayout from './microfrontend-layout.html';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth/authService';

const authService = new AuthService();
// document.cookie = "NovoRevan=eyJhdXRoIjp7ImFkbWluaXN0cmFkb3IiOjEsImNoYXQiOltdLCJjaGF0X2hhYmlsaXRhZG8iOjAsImNoYXRfaWQiOi0xLCJjaWRhZGVfaWQiOjIsImNvZGlnb191c3VhcmlvIjoiZGUzNjFlNzYtMmI5Yi00NWUzLWJmNmYtZTFlMGY5M2JhMWM4IiwiZGVwYXJ0YW1lbnRvX2dlcmVudGUiOjAsImRlcGFydGFtZW50b19pZCI6NDMsImRlcGFydGFtZW50b19ub21lIjoiQXRlbmRpbWVudG8gYW8gQ2xpZW50ZSIsImVtYWlsIjoibmF0YW4ubW91cmFAZ3J1cG9icmlzYW5ldC5jb20uYnIiLCJlcXVpcGVfaWQiOm51bGwsImVycm9yX2NoYXQiOiIiLCJmdW5jaW9uYXJpb19pZCI6OTIyNCwiaWQiOjg2OTIsImltYWdlbSI6bnVsbCwibG9naW4iOiIwNjguMjY5LjYxMy03NyIsIm5vbWUiOiJOYXRoYW4gTW91cmEiLCJvdHBfY29uZmlndXJhZG8iOjEsIm90cF9oYWJpbGl0YWRvIjoxLCJwYWd1ZWJyaXNhIjp7ImRvbWluaW9faWQiOjF9LCJwcmVmZXJlbmNpYSI6IntcInRpcG9fbWFwYVwiOiBcImh5YnJpZFwiLCBcImZpcnN0X2xvZ2luX3JhdW1pbFwiOiAwfSIsInJldmFuIjp7ImJ5cGFzcyI6MH0sInNldG9yX2lkIjpudWxsLCJzZXRvcl9ub21lIjpudWxsLCJzZXRvcmVzIjpbeyJzZXRvcl9pZCI6OCwic2V0b3Jfbm9tZSI6IlNpc3RlbWEgQUMiLCJzdXBlcnZpc29yIjp0cnVlfV0sInNldG9yZXNfaWRzIjpbOF0sInNpc3RlbWFfZXN0b3F1ZSI6MSwidGVsZWZvbmUiOiI4ODk5ODU1NjM0MyIsInRva2VuIjoiYzhkMmYxNDY2OWNiMjhiYmY4ZWRiNDExNTJjNWY0ZjJmNmVmY2NlMTA4MzNmNDY3NjIyZWY3MjU2NzNhYWJlZCIsInRva2VuX2RhdGFfY3JpYWNhbyI6IjExXC8wM1wvMjAyNSAxMDoyOToxMCIsInZlbmRhX2NhbmFsX2lkIjoxMH0sImV4cGlyZXMiOjE3NDE3ODYzMTZ9--9393eeeba37e78bbdb6467b300ae99974c7d3a99; expires=Wed, 12 Mar 2025 13:31:56 GMT; path=/; HttpOnly; SameSite=None; Secure";

function checkAuthentication() {
  if (authService.isAuthenticated()) {
    return of(true);
  } else {
    authService.login();
    return throwError(new Error('User is not authenticated'));
  }
}
checkAuthentication()

window.addEventListener("message", function(event) {
  console.log(event)

}, false);

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
