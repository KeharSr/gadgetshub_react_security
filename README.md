# GadgetsHub Frontend

The React-based frontend for the **GadgetsHub eCommerce platform** provides tailored interfaces for both customers (User) and administrators (Admin). It allows users to browse and purchase products, manage their profiles and orders, and enables admins to oversee inventory, customer data, and order management seamlessly.

## Features

### Admin Role

- **Dashboard**: View an overview of eCommerce operations, including orders, inventory, and sales metrics.
- **Product Management**: Add, update, or delete product listings and manage product categories.
- **Order Management**: Process and update orders placed by customers with real-time status tracking.
- **Customer Management**: Access customer profiles, view order history, and manage customer details.
- **Activity Logs**: Generate activity and monitor store security.

### User Role

- **Secure Login**: Authenticate securely using a password-protected login system.
- **Product Browsing and Search**: Explore and filter products based on categories, pricing, and user preferences.
- **Shopping Cart**: Add, edit, and remove products from the cart before checking out.
- **Order History**: View and track previous orders with detailed status updates.
- **Profile Management**: Manage personal details, update delivery addresses, and save payment methods.

## Technologies Used

- **React.js**: Core library for building the frontend.
- **Use Effect**: State management for efficient data flow across the application.
- **Axios**: For making API requests to the backend.
- **React Router**: Handles routing and navigation within the application.
- **Tailwind CSS**: Utility-first CSS framework for creating a responsive and visually appealing UI.
- **React Hot Toast**: Provides elegant toast notifications for feedback on user actions.
- **Framer Motion**: Enables smooth animations for an enhanced user experience.

## Security Measures

The GadgetsHub frontend integrates various security practices to ensure safe and secure usage:

1. **Protected Routes**:
   - Certain routes are accessible only to authenticated users (e.g., cart, order history) or admins (e.g., product management).
   - Implements checks to redirect unauthorized users to the login page.

2. **Input Validation**:
   - All user inputs, such as login credentials, search queries, and form fields, are validated on the client side to prevent invalid data submission.

3. **Environment Variables**:
   - API keys and sensitive configuration details are stored securely in environment variables to prevent exposure in the source code.

4. **Secure Communication**:
   - Communicates with the backend over HTTPS to encrypt data transfer.
   - Ensures tokens are securely transmitted and stored during authentication.

5. **Session Management**:
   - Stores JWT tokens securely in local storage and verifies token validity for accessing protected resources.

6. **Rate Limiting Feedback**:
   - Detects backend rate-limiting errors (e.g., 429 responses) and informs users via toast notifications to avoid confusion.

## Challenges

1. **State Management**:
   - Managing shared state across complex components, such as the shopping cart and authentication, was simplified using Redux.

2. **API Integration**:
   - Implementing seamless communication with the backend for user authentication, product data, and order processing required thorough testing and optimization.

3. **Responsive Design**:
   - Ensuring the UI works seamlessly across various devices and screen sizes was achieved using Tailwind CSS's utility classes.

4. **Security Practices**:
   - Safeguarding sensitive user data and ensuring secure API communication required strict adherence to security standards.

## Environment Variables

The application uses the following environment variables for secure configuration:

- `REACT_APP_API_URL`: The base URL for the backend server.
- `REACT_APP_KHALTI_URL`: Base URL for the Khalti payment gateway.
- `REACT_APP_KHALTI_PUBLIC_KEY`: Public key for Khalti payment gateway authentication.

## Future Enhancements

- **Enhanced Personalization**:
  - Introduce AI-based recommendations to improve product discovery for users.
  
- **In-Store Pickup**:
  - Add an option for users to reserve products online and pick them up at physical store locations.
  
- **Social Media Integration**:
  - Enable users to share their favorite products directly on social media platforms.
  
- **Advanced Analytics**:
  - Provide admins with deeper insights into sales trends and customer behavior.

---

This frontend complements the GadgetsHub backend by offering a robust, secure, and feature-rich user experience. Its emphasis on security, responsiveness, and modern design ensures a seamless shopping journey for users and an efficient management interface for administrators.
