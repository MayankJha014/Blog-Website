import express from "express";
import cors from "cors";
import { NotionToMarkdown } from "notion-to-md";
import { Client } from "@notionhq/client";
import mongoose from "mongoose";
import CommentSchema from "./model/comment_model.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(
  cors({
    "Access-Control-Allow-Origin": "*", // Specify the allowed headers
    origin: [
      process.env.URL,
      "https://ps-fe.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"], // Specify the allowed headers
    credentials: true,
  })
);

const DB = process.env.MONGO_DB;
const databaseId = process.env.NOTION_DB_ID;

const notion = new Client({
  auth: process.env.NOTION_AUTH_KEY,
});

app.use(express.json());
const n2m = new NotionToMarkdown({ notionClient: notion });

app.get("/database", async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          timestamp: "last_edited_time",
          // property: "Created",
          direction: "descending",
        },
      ],
      // start_cursor: "4e4d3ddf-6894-4d02-90be-e3339041290e",
      // page_size: 2,
    });
    res.json(response["results"]);
  } catch (error) {
    console.error("Error querying Notion database:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/tags", async (req, res) => {
  try {
    const response = await notion.search({
      query: process.env.NOTION_DB,
      filter: {
        value: "database",
        property: "object",
      },
    });
    res.json(response["results"]);
  } catch (error) {
    console.error("Error querying Notion database:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/search/:id", async (req, res) => {
  try {
    const searchQ = req.params.id; // Assuming postId is a parameter in the route

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Name",
            rich_text: {
              contains: searchQ,
            },
          },
          {
            property: "Status",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          timestamp: "last_edited_time",
          // property: "Created",
          direction: "descending",
        },
      ],
    });
    res.json(response["results"]);
  } catch (error) {
    console.error("Error querying Notion database:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/tags/search/:id", async (req, res) => {
  try {
    const searchQ = req.params.id; // Assuming postId is a parameter in the route

    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Tags",
            multi_select: {
              contains: searchQ,
            },
          },
          {
            property: "Status",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          timestamp: "last_edited_time",
          // property: "Created",
          direction: "descending",
        },
      ],
    });
    res.json(response["results"]);
  } catch (error) {
    console.error("Error querying Notion database:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/user", async (req, res) => {
  try {
    const userId = process.env.NOTION_USER_ID;
    const response = await notion.users.retrieve({ user_id: userId });
    res.json(response);
  } catch (error) {
    console.error("Error querying Notion database:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/page/:id", async (req, res) => {
  try {
    const postId = req.params.id; // Assuming postId is a parameter in the route
    const response = await n2m.pageToMarkdown(postId);
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: error.code,
      response: error.message,
    });
  }
});

app.get("/title/:id", async (req, res) => {
  try {
    const postId = req.params.id; // Assuming postId is a parameter in the route
    const response = await notion.pages.retrieve({ page_id: postId });
    res.json(response);
  } catch (error) {
    res.status(500).json({
      error: error.code,
      response: error.message,
    });
  }
});

app.post("/comment", async (req, res) => {
  const { id, comData } = req.body;
  if (!id || !comData) {
    return res
      .status(400)
      .json({ error: "postId and comData are required in the request body." });
  }
  try {
    let data = new CommentSchema({
      postId: id,
      comment: comData,
    });
    data = await data.save();
    res.json(data);
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/comment/:id", async (req, res) => {
  const postId = req.params.id; // Assuming postId is a parameter in the route
  let data = await CommentSchema.find({ postId: postId }).sort({
    createdAt: -1,
  });
  res.json(data);
});

mongoose.connect(DB).then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
