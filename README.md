# To-Do-App
This is the API server for my project, To Do List application. Here you can find the different routes and controllers for the different functionalities of the application.

**Reminder: This application is now hosted via Heroku.**

## Getting Started
### On Your Terminal
Download the necessary packages
```bash
npm install
```

Run the API server
```bash
nodemon index
```

## Public Routes
After downloading all the packages and initiating the hot reload for the server. You can now test the public routes using Postman. Some of the routes below will require either an Authentication Token or toDoId params in the URL. Sample params is provided but for the token, it is highly recommended that you use Postman.

### Check for Duplicate Emails (POST)
Required: `"email"`
```
https://jp-to-do-list-app.herokuapp.com/api/users/email-exists
```

### Register New User (POST)
Required: `"givenName"`, `"familyName"`, `"email"`, `"password"`
```
https://jp-to-do-list-app.herokuapp.com/api/users/register
```

### Log In a User via Email (POST)
Required: `"email"`, `"password"`
```
https://jp-to-do-list-app.herokuapp.com/api/users/log-in
```

### Fetch User's Details (GET)*
```
https://jp-to-do-list-app.herokuapp.com/api/users/details
```

### Edit User's Given & Family Names (PUT)*
Required: `"givenName"`, `"familyName"`
```
https://jp-to-do-list-app.herokuapp.com/api/users/edit/names
```

### Edit User's Given Name (PUT)*
Required: `"givenName"`
```
https://jp-to-do-list-app.herokuapp.com/api/users/edit/given-name
```

### Edit User's Family Name (PUT)*
Required: `"familyName"`
```
https://jp-to-do-list-app.herokuapp.com/api/users/edit/fam-name
```

### Add a To Do (POST)*
Required: `"name"`, `"description"`, `"toDoDate"`
```
https://jp-to-do-list-app.herokuapp.com/api/users/add-to-do
```

### Edit a To Do's Details (PUT)*
Required: `"name"`, `"description"`, `"toDoDate"` \
Params: `toDoID = 60d301995530ce667097e98e`
```
https://jp-to-do-list-app.herokuapp.com/api/users/edit/to-do/:toDoId
```

### Edit a To Do's Name (PUT)*
Required: `"name"` \
Params: `toDoID = 60d301995530ce667097e98e`
```
https://jp-to-do-list-app.herokuapp.com/api/users/edit/to-do-name/:toDoId
```

### Edit a To Do's Description (PUT)*
Required: `"description"` \
Params: `toDoID = 60d301995530ce667097e98e`
```
https://jp-to-do-list-app.herokuapp.com/api/users/edit/to-do-desc/:toDoId
```

### Edit a To Do's toDoDate (PUT)*
Required: `"toDoDate"` \
Params: `toDoID = 60d301995530ce667097e98e`
```
https://jp-to-do-list-app.herokuapp.com/api/users/edit/to-do-date/:toDoId
```

### Edit a To Do's Status (PUT)*
To Do's have a default status of `"pending"` and if the user wants to change it to `"done"`, call this API. \
Params: `toDoID = 60d301995530ce667097e98e`
```
https://jp-to-do-list-app.herokuapp.com/api/users/edit/to-do-status/:toDoId
```

### Delete a To Do (DELETE)*
**Warning:** This will permanently delete a to do from the user's list.
```
https://jp-to-do-list-app.herokuapp.com/api/users/delete-to-do/:toDoId
```
---
\* Authentication Token required.
