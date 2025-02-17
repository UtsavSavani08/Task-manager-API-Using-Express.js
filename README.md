# Task Manager API

This is a simple Node.js API using Express.js for managing tasks. Tasks are stored in a `tasks.json` file.

## Setup

1. Install [Node.js](https://nodejs.org/).
2. Clone this repository and navigate to the folder.
3. Run the following command to install dependencies:
   ```sh
   npm install
   ```
4. Start the server:
   ```sh
   node index.js
   ```
   The server will run at `http://localhost:3000`.

## API Endpoints

### 1. Get All Tasks

**GET** `/tasks`

- Returns a list of all tasks.
- Example response:
  ```json
  [
    {
      "id": "1",
      "title": "Complete project documentation",
      "status": "Pending"
    },
    {
      "id": "2",
      "title": "Review pull requests",
      "status": "Completed"
    },
    {
      "id": "3",
      "title": "Prepare for team meeting",
      "status": "Pending"
    },
    {
      "id": "4",
      "title": "Fix bugs in API",
      "status": "Completed"
    },
    {
      "id": "5",
      "title": "Update user dashboard UI",
      "status": "Pending"
    }
  ]
  ```

### 2. Create a Task

**POST** `/tasks`

- Body (JSON):
  ```json
  {
    "title": "Task Name",
    "status": "Pending"
  }
  ```
- Creates a new task with a unique ID.
- Example response:
  ```json
  {
    "id": "abcd",
    "title": "Task Name",
    "status": "Pending"
  }
  ```

### 3. Update a Task

**PUT** `/tasks/:id`

- Body (JSON):
  ```json
  {
    "title": "Updated Task",
    "status": "Completed"
  }
  ```
- Updates an existing task by ID.
- Example response:
  ```json
  {
    "id": "abcd",
    "title": "Updated Task",
    "status": "Completed"
  }
  ```

### 4. Delete a Task

**DELETE** `/tasks/:id`

- Deletes a task by ID.
- Example response:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

## Using Postman

1. Open [Postman](https://www.postman.com/).
2. Set the request type (GET, POST, PUT, DELETE).
3. Enter the request URL (`http://localhost:3000/tasks` or `http://localhost:3000/tasks/:id`).
4. If required, go to the **Body** tab, select **raw** and choose **JSON**, then enter the request data.
5. Click **Send** to execute the request.
6. Check the response for confirmation.

Now you can manage tasks easily using this API! 

