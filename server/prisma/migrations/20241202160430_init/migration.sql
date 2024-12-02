-- CreateTable
CREATE TABLE "blogs" (
    "id" SERIAL NOT NULL,
    "authorname" VARCHAR(255),
    "blog" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);
