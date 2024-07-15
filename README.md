# Savvy Saver

Welcome to **Savvy Saver**, an application designed to help you save on grocery items by locating grocery stores near you that offer the cheapest options for the items you need. Built with Next.js and TypeScript, and utilizing a PostgreSQL database, Savvy Saver aims to make grocery shopping more affordable and efficient.

## Features

-   **Search Capability**: Find the cheapest grocery items near you with a robust search functionality.
-   **Location-Based Results**: Get results from grocery stores in your vicinity.
-   **User-Friendly Interface**: Easy to navigate and use, ensuring a seamless experience.
-   **Up-to-Date Prices**: Regularly updated price information to help you make informed decisions.

## Technologies Used

-   **Next.js**: A React framework for server-rendered or statically-exported React applications.
-   **TypeScript**: A statically typed superset of JavaScript that enhances development with type safety and advanced features.
-   **PostgreSQL**: A powerful, open-source object-relational database system for storing and managing the application’s data.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js
-   npm (or yarn)
-   PostgreSQL

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/savvy-saver.git
    cd savvy-saver
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3. **Set Up the Database**

    Create a PostgreSQL database and update the `.env` file with your database credentials.

    ```bash
    DATABASE_URL=postgresql://user:password@localhost:5432/savvy_saver
    ```

4. **Run Database Migrations**

    ```bash
    npx prisma migrate deploy
    ```

5. **Start the Development Server**

    ```bash
    npm run dev
    ```

    or

    ```bash
    yarn dev
    ```

    The application will be available at `http://localhost:3000`.

## Usage

1. **Search for Grocery Items**

    Enter the name of the grocery item you’re looking for in the search bar.

2. **View Results**

    Browse through the list of grocery stores near you that offer the searched item at the cheapest prices.

3. **Select a Store**

    Click on a store to get more details about the item and the store’s location.

## Contributing

We welcome contributions to make Savvy Saver even better! To contribute, please follow these steps:

1. **Fork the Repository**

2. **Create a New Branch**

    ```bash
    git checkout -b feature/your-feature-name
    ```

3. **Make Your Changes**

4. **Commit Your Changes**

    ```bash
    git commit -m "Add some feature"
    ```

5. **Push to the Branch**

    ```bash
    git push origin feature/your-feature-name
    ```

6. **Open a Pull Request**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need further assistance, please contact us at support@savvysaver.com.

---

Thank you for using Savvy Saver! We hope it helps you save money and make your grocery shopping more convenient.
