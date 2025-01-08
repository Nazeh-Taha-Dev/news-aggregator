# News Aggregator

The **News Aggregator** is a React-based web application that allows users to browse, search, and filter news articles from multiple trusted sources. Users can personalize their news feed based on preferred categories, sources, and authors, ensuring a customized experience. This project follows best software development practices, including **DRY**, **KISS**, and **SOLID** principles, and is fully containerized using **Docker**.

---

## Obstacles

While developing this project, I encountered several obstacles, including:

1. **APIs do not support multiple values for categories:**  
   The APIs used in this project do not natively support querying multiple categories in a single request. This required implementing additional client-side filtering to meet the project's requirements.

2. **APIs do not support filtering by authors:**  
   Since the APIs lack support for filtering articles by specific authors, I had to implement custom logic to extract, store, and filter articles by authors on the client side.

3. **No API available to retrieve a list of authors:**  
   Since none of the APIs provided an endpoint to fetch a list of authors directly, I implemented a custom solution that extracts author names from the retrieved articles and stores them locally.

4. **API request limitations:**  
    The APIs used have strict rate limits, which posed challenges when testing and debugging the application. To handle this, caching and local storage mechanisms were used to reduce unnecessary API calls.
   mechanisms were used to reduce unnecessary API calls.

## Features

### Core Features

- **Article Search & Filtering**:  
  Users can search for articles by keyword and apply filters based on date, category, and source.
- **Personalized News Feed**:  
  Users can customize their news feed by selecting preferred categories, sources, and authors. Preferences are stored locally using `localStorage` to maintain user choices across sessions.

- **Mobile Responsive Design**:  
  The user interface is designed to be fully responsive, ensuring a smooth experience on both desktop and mobile devices.

- **Infinite Scroll**:  
  The application implements infinite scrolling to load articles dynamically as the user scrolls down the page.

---

## Technologies Used

### Frontend

- **ReactJS**:  
  The core framework for building the user interface.
- **Material-UI**:  
  A popular React UI framework used for designing responsive and accessible components.

- **Custom Hooks**:  
  Custom React hooks were created for managing infinite scroll, filters, and local storage operations.

- **State Management**:  
  `useState`, `useEffect`, and `useContext` hooks were utilized for managing component state and context-based global state (e.g., user preferences).

### Data Sources (APIs)

This project integrates with three external news APIs to fetch and display articles:

1. **NewsAPI**
2. **The Guardian API**
3. **New York Times API**

The APIs are used to fetch real-time news articles, including metadata like authors, categories, and publication dates.

---

## Project Structure

The project is organized into the following main folders:

- **components/**: Contains reusable UI components such as `ArticleCard`, `FilterCard`, and `CheckBoxGroup`.
- **pages/**: Includes the main page components, such as `HomePage`.
- **hooks/**: Custom React hooks, including `useInfiniteScroll` and `useLocalStorage`.
- **utils/**: Utility functions for tasks like formatting dates and managing API responses.
- **constants/**: Contains constants such as category and source options.
- **context/**: Includes context providers like `FilterDataContext` for managing global state.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/) (latest version)

---

## Steps to Run the Project in Docker

### Step 1: Clone the Repository

```bash
git clone https://github.com/Nazeh-Taha-Dev/news-aggregator.git
cd news-aggregator
```

### Step 2: Build the Docker Image

Use the following command to build the Docker image:

```bash
docker build -t news-aggregator .
```

### Step 3: Run the Docker Container

Once the image is built, run the container using:

```bash
docker run -d -p 3000:80 --name news-aggregator news-aggregator
```

### Step 4: Access the Application

Open your browser and navigate to:
http://localhost:3000

## Steps to Run the Project Locally (Without Docker)

### Step 1:Clone the Repository

```bash
git clone https://github.com/Nazeh-Taha-Dev/news-aggregator.git
cd news-aggregator
```

### Step 2:Install Dependencies
Ensure you have NodeJs (v16+ recommended) installed, then run:

```bash
npm install
```

### Step 3:Start the Development Server

```bash
npm start
```

### Step 4: Access the Application

Open your browser and navigate to:
http://localhost:3000
