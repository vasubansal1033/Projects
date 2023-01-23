<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false"%>
<html>
    <head>
        <title>This is help page</title>
    </head>
    <body>
        <h1>This is help page</h1>
        <%
        //  String name = (String) request.getAttribute("name");
        //  Integer rollNo = (Integer) request.getAttribute("rollNo");
        %>
        <p>Your name is ${name}</p>
        <p>Your rollNo is ${rollNo}</p>
        <p>Your marks are - ${marks}</p>
    </body>
</html>