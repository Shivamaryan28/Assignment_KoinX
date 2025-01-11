## **Assignment Koinx**

### **Overview**
This is a Node.js-based project that tracks cryptocurrency data. It fetches data from the CoinGecko API, 
stores it in a MongoDB database, and provides API endpoints to query the stored data.
Additionally, a cron job runs every 2 hours to update the database with the latest cryptocurrency information.

---

### **Features**
1. Fetches cryptocurrency data (price, market cap, 24h change) from the CoinGecko API.
2. Stores the data in MongoDB.
3. Provides REST API endpoints to:
   - Retrieve cryptocurrency data.
   - Calculate the standard deviation of the price for the last 100 records.
4. A cron job that updates the database every 2 hours.

---

### **Prerequisites**
1. Install [Node.js](https://nodejs.org/en/) (v16+ recommended).
2. Install [MongoDB](https://www.mongodb.com/try/download/community) and ensure it is running locally or provide a remote connection string.
3. Install `npm` (comes with Node.js).

---

### **Setup**

#### 1. **Clone the Repository**
```bash
git clone <repository_url>
cd assignment_koinx
```

#### 2. **Install Dependencies**
```bash
npm install
```

#### 3. **Set Up Environment Variables**
Create a `.env` file in the root directory and add the following:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/crypto
```

#### 4. **Start MongoDB**
Make sure MongoDB is running:
```bash
mongod
```

#### 5. **Run the Application**
- Start the server in production mode:
  ```bash
  npm start
  ```
- Start the server in development mode (with `nodemon`):
  ```bash
  npm run dev
  ```

The server will be running on `http://localhost:3000`.

---

### **Cron Job**
The application includes a cron job that runs every **2 hours**. It:
1. Fetches cryptocurrency data (Bitcoin, Ethereum, and Matic) from the CoinGecko API.
2. Stores the data (price, market cap, 24h change) in MongoDB.

Cron Expression: `0 */2 * * *`  
**Interval**: Every 2 hours.

---

### **API Endpoints**

#### 1. **Health Check**
- **URL**: `GET /`
- **Description**: Checks if the server is running.
- **Response**:
  ```json
  {
    "status": "working"
  }
  ```

---

#### 2. **Trigger Initial Data Fetch**
- **URL**: `POST /api/v1/update-data`
- **Description**: Route to initially populate the database with cryptocurrency data.
- **Response**:
  ```json
  {
    "message": "Database updated successfully."
  }
  ```

---

#### 3. **Get Latest Cryptocurrency Data**
- **URL**: `GET /api/v1/stats`
- **Description**: Route to fetch the latest data of the specified coin.
- **Query Parameters**:
  - `coin` (string): The name of the cryptocurrency. Options include:
    - `bitcoin`
    - `matic`
    - `ethereum`
- **Response** (Example for `bitcoin`):
  ```json
  {
    "price": 94289,
    "marketCap": 1867147323124.2559,
    "24hChange": 1.0025448588945287
  }
  ```

---

#### 4. **Get All Cryptocurrency Data**
- **URL**: `GET /api/v1/stats-all`
- **Description**: Route to fetch all available data of the specified coin.
- **Query Parameters**:
  - `coin` (string): The name of the cryptocurrency. Options include:
    - `bitcoin`
    - `matic`
    - `ethereum`
- **Response** (Example for `bitcoin`):
  ```json
  [
    {
      "price": 94289,
      "marketCap": 1867147323124.2559,
      "24hChange": 1.0025448588945287,
      "timestamp": "2025-01-11T17:11:00.372Z"
    },
    {
      "price": 94263,
      "marketCap": 1870201007496.0984,
      "24hChange": 0.7456978871250971,
      "timestamp": "2025-01-11T17:05:27.081Z"
    }
  ]
  ```

---

#### 5. **Get Standard Deviation of Prices**
- **URL**: `GET /api/v1/deviation`
- **Description**: Calculates the standard deviation of the price for the last 100 records of the specified cryptocurrency.
- **Query Parameters**:
  - `coin` (string): The name of the cryptocurrency. Options include:
    - `bitcoin`
    - `matic`
    - `ethereum`
- **Response** (Example for `bitcoin`):
  ```json
  {
    "standardDeviation": "0.35"
  }
  ```

---

### **Request Examples**

#### **Get Latest Cryptocurrency Data (Bitcoin)**

- **Request**:
  ```bash
  GET /api/v1/stats?coin=bitcoin
  ```

- **Response**:
  ```json
  {
    "price": 94289,
    "marketCap": 1867147323124.2559,
    "24hChange": 1.0025448588945287
  }
  ```

#### **Get All Cryptocurrency Data (Ethereum)**

- **Request**:
  ```bash
  GET /api/v1/stats-all?coin=ethereum
  ```

- **Response**:
  ```json
  [
    {
      "price": 2834.95,
      "marketCap": 335250418829.7124,
      "24hChange": 0.4362787752337582,
      "timestamp": "2025-01-11T17:10:00.372Z"
    },
    {
      "price": 2832.72,
      "marketCap": 335020820182.1054,
      "24hChange": 0.3154674926709207,
      "timestamp": "2025-01-11T17:00:27.081Z"
    }
  ]
  ```

#### **Get Standard Deviation of Prices (Matic)**

- **Request**:
  ```bash
  GET /api/v1/deviation?coin=matic
  ```

- **Response**:
  ```json
  {
    "standardDeviation": "0.62"
  }
  ```

---

### **File Structure**
```
assignment_koinx/
├── database/
│   └── db_connection.js      # Database connection logic
├── routes/
│   └── cryptoRoutes.js       # Routes for cryptocurrency APIs
├── controllers/
│   └── cryptoController.js   # Logic for handling requests and fetching data
├── utils/
│   └── cron.js               # Cron job logic for periodic data fetching
├── index.js                  # Main server file
├── package.json              # Project metadata and dependencies
├── .env                      # Environment variables
└── .gitignore                # Ignored files (node_modules, .env)
```

---

### **Dependencies**
- **Core**:
  - `express`: Web framework for building REST APIs.
  - `mongoose`: ODM for MongoDB.
  - `dotenv`: For environment variable management.
  - `axios`: For making HTTP requests to CoinGecko.
  - `mathjs`: For mathematical operations (e.g., standard deviation).
- **Dev**:
  - `nodemon`: For automatic server restarts during development.

---

### **Expected Outputs**
1. **Database Data**:
   - MongoDB will store the cryptocurrency data with fields: `name`, `price`, `marketCap`, `24hChange`, and `timestamp`.

2. **Cron Logs**:
   - Logs like `Fetching crypto data...` and `Crypto data saved successfully` will appear in the console when the cron job runs.

3. **API Responses**:
   - JSON responses for all API endpoints as described above.

---

