# postit
# Required:
Java 21
Node JS

 
## Starting front-end:
navigate to postit-front directory: 
  cd postit-front
 start page in development mode:
  npm run dev

## Starting back end:
 navigate to postit directory:
  cd postit
 start back-end server:
  mvn spring-boot:run

## User roles:
to update user roles open H2 db in browser:
localhost:8080/h2-console/login.jsp?
update users table, role column values with roles
 ADMIN or USER
