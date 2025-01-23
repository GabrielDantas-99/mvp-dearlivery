import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "@core/services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const token = auth.token;
  const router = inject(Router);

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userRole: string = payload.role || null;
      const allowedRoles: string[] = route.data["roles"] || [];
      const hasAccess = allowedRoles.some((role) => role === userRole);
      if (hasAccess) {
        return true;
      }
    } catch (e) {
      console.error("Erro ao decodificar o token:", e);
    }
  }

  return router.createUrlTree(["/"]);
};
