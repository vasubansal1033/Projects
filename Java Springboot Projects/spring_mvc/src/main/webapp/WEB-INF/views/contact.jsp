<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <title>Contact form</title>
  </head>
  <body>

    <h3 class="text-center mt-5">Registration form</h3>

    <div class="container mt-5">
        <form action="/processForm" method="post">
          <div class="form-group row">
            <label for="userEmail" class="col-sm-2 col-form-label">User email</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="userEmail" name="userEmail" placeholder="User email">
            </div>
          </div>

          <div class="form-group row">
            <label for="userName" class="col-sm-2 col-form-label">User name</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="userName" name="userName" placeholder="User name">
            </div>
          </div>

          <div class="form-group row">
            <label for="userPassword" class="col-sm-2 col-form-label">User password</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="userPassword" name="userPassword" placeholder="User password">
            </div>
          </div>

            <div class="container text-center">
                <button type="submit" class="btn btn-success">Submit</button>
            </div>

        </form>
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  </body>
</html>