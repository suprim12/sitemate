// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Post from '../../../../models/Post';
import dbConnect from '../../../../utils/db';

dbConnect();

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         description:
 *           type: string
 *           description: The book author
 *       example:
 *         title: The New Turing Omnibus
 *         description: Alexander K. Dewdney
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {
    query: { id, name },
    method,
  } = req;
  switch (method) {
    /**
     * @swagger
     * /api/v1/posts:
     *   get:
     *     description: Returns Posts
     *     responses:
     *       200:
     *         description: This will provide posts
     */
    case 'GET':
      try {
        const posts = await Post.find();
        res.status(200).json({ success: true, data: posts });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    /**
     * @swagger
     * /api/v1/posts:
     *   post:
     *     description: Create Post
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Post'
     *     responses:
     *       200:
     *         description: This will create post
     *
     */
    case 'POST':
      try {
        const post = await Post.create(req.body);
        res.status(200).json({ success: true, data: post });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
