import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";

const app = new Hono();
const prisma = new PrismaClient();
const port = 3000;

app.use("/*", cors());

app.get("/", async (ctx) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return ctx.json({ blogs });
  } catch (error) {
    console.log(error);
    return ctx.json({ message: "Internal Server Error" }, 500);
  }
});

app.get("/:id", async (ctx) => {
  try {
    const { id } = ctx.req.param();
    const blog = await prisma.blog.findUnique({ where: { id: parseInt(id) } });

    return ctx.json({ blog });
  } catch (error) {
    console.log(error);
    return ctx.json({ message: "Internal Server Error" }, 500);
  }
});

app.post("/new", async (ctx) => {
  try {
    const { authorname, blog } = await ctx.req.json();

    await prisma.blog.create({
      data: { authorname, blog },
    });

    return ctx.json({ message: "Blog saved Succesfully" });
  } catch (error) {
    console.log(error);
    return ctx.json({ message: "Internal Server Error" }, 500);
  }
});

app.delete("/delete/:id", async (ctx) => {
  try {
    const { id } = ctx.req.param();

    await prisma.blog.delete({ where: { id: parseInt(id) } });
    const blogs = await prisma.blog.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return ctx.json({ blogs });
  } catch (error) {
    console.log(error);
    return ctx.json({ message: "Internal Server Error" }, 500);
  }
});

app.put("/update/:id", async (ctx) => {
  try {
    const { blog, authorname } = await ctx.req.json();
    const { id } = ctx.req.param();

    await prisma.blog.update({
      where: { id: parseInt(id) },
      data: { authorname, blog },
    });

    return ctx.json({ message: "Blog updated succesfully" });
  } catch (error) {
    console.log(error);
    return ctx.json({ message: "Internal Server Error" }, 500);
  }
});

console.log(`Server is running on http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port,
});
