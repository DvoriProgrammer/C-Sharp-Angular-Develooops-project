// import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";



import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (
    req: HttpRequest<any>,
    next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
    let token: string | null = null;

    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem("token");
    }
    // הוסף את התנאי כאן לבדיקה האם נדרש לא להוסיף את הכותרת
    if (req.url.includes('https://api.openai.com/v1/chat/completions')||req.url.includes('https://pixabay.com/api')) {
        return next(req);
    }

    if (token) {
        console.log(token)
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
        return next(cloned);
    } else {
        return next(req);
    }
};









// export const authInterceptor: HttpInterceptorFn = (
//     req: HttpRequest<any>,
//     next: HttpHandlerFn
// ): Observable<HttpEvent<any>> => {
 
//   const token = sessionStorage.getItem('token');
//   if (token) {
//     const cloned = req.clone({
//       setHeaders: {
//         authorization: token,
//       },
//     });
//     return next(cloned);
//   } else {
//     return next(req);
//   }
// };



// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const token = sessionStorage.getItem('token');
//         if (token) {
//             const cloned = req.clone({
//                 setHeaders: {
//                     authorization: `Bearer ${token}`,
//                 },
//             });
//             return next.handle(cloned);
//         } else {
//             return next.handle(req);
//         }
//     }
// }