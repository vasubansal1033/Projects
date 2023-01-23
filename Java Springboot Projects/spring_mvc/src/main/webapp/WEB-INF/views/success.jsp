<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<html>
    <head>
        <title>Success page</title>
    </head>
    <body>
        <h1>Your name is ${user.getUserName()} and email is ${user.getUserEmail()}</h1>
        <p>Password: ${user.getUserPassword()}</p>
        <h2>${Header}</h2>
    </body>
</html>