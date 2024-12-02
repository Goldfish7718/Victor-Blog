import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.listen(3000, async () => {
  console.log("Server started on port 3000");
});

app.get("/", async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany();
    res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/new", async (req, res) => {
  try {
    const { authorname, blog } = req.body;

    await prisma.blog.create({
      data: { authorname, blog },
    });

    res.status(200).json({ message: "Blog saved Succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.blog.delete({ where: { id: parseInt(id) } });
    const blogs = await prisma.blog.findMany();

    res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { blog, authorname } = req.body;
    const { id } = req.params;

    await prisma.blog.update({
      where: { id: parseInt(id) },
      data: { authorname, blog },
    });

    res.status(200).json({ message: "Blog updated succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
