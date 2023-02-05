package src.main.interceptors;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class ContactInterceptor extends HandlerInterceptorAdapter {
    @Override
    public boolean preHandle(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response, Object handler) throws Exception {
        System.out.println("This is contact preHandler interceptor");
        String name = request.getParameter("userName");
        if(name.startsWith("V")) {
            response.setContentType("text/html");
            response.getWriter().println("<h1>Your name starts with V, so you are invalid user.</h1>");
            return false;
        }
        return true;
    }
}
