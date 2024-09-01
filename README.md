# 📝 Notion Blog Website

A feature-rich blog website built using ReactJS, Redux, and the Notion API. This project integrates with Notion to dynamically fetch and display blog posts. It includes a light/dark theme toggle for personalized viewing and a comment feature for user engagement.

## 🌟 Features

- **Fetch Posts from Notion:** Automatically fetches and displays blog posts from a specified Notion database.
- **Light/Dark Theme:** Users can toggle between light and dark modes for a customized reading experience.
- **Comment Feature:** Allows users to add comments to blog posts, enhancing interaction.
- **Responsive Design:** Optimized for both desktop and mobile viewing.
- **Modern UI:** Clean and intuitive design for a great user experience.

## 🛠️ Technologies Used

- **ReactJS**: For building the user interface.
- **Redux**: For state management.
- **Notion API**: To fetch content dynamically from Notion.
- **Axios**: For making HTTP requests to the Notion API.
- **CSS**: For styling, including light and dark themes.
- **LocalStorage**: To persist theme preference and comments.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- A Notion account and API key

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/notion-blog-website.git
   cd notion-blog-website
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory with the following:

   ```plaintext
   REACT_APP_NOTION_API_KEY=your_notion_api_key
   REACT_APP_NOTION_DATABASE_ID=your_notion_database_id
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

   Visit `http://localhost:3000` to see your blog website in action.

### Screenshot

![Screenshot 2024-09-01 163219](https://github.com/user-attachments/assets/e3579f5c-c035-42cd-8eaf-28f232562cd6)
![Screenshot 2024-09-01 163725](https://github.com/user-attachments/assets/7276e540-7cb2-443a-9eb1-4bd05a1090ad)
