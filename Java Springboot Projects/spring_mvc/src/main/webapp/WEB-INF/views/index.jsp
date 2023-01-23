<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import = "java.util.*" %>
<html>
    <head>
        <title>This is home page</title>
    </head>
    <body>
        <h1>This is home page</h1>
        <h1>Called by home controller</h1>

        <% String name = (String) request.getAttribute("name"); %>
        <% Integer age = (Integer) request.getAttribute("age"); %>
        <% List<String> friends = (List<String>) request.getAttribute("friends"); %>

        <p>Your name is <%= name %></p>
        <p>Your age is <%= age %></p>
        <% for(String friend: friends) { %>
                <h1><%= friend %></h1>
        <% } %>

    </body>
</html>