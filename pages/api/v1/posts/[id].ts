import type { NextApiRequest, NextApiResponse } from 'next';
import Post from '../../../../models/Post';

export default async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, name },
    method,
  } = req;

  switch (method) {
    /**
     * @swagger
     * /api/v1/posts/{id}:
     *   get:
     *     description: Returns Post
     *     parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *     responses:
     *       200:
     *         description: This will provide posts
     */
    case 'GET':
      try {
        const post = await Post.findOne({ _id: id });
        if (!post) {
          res.status(401).json({ success: false, message: 'Data not found' });
        }
        res.status(200).json({ success: true, data: post });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    /**
     * @swagger
     * /api/v1/posts/{id}:
     *  put:
     *    description: Update Post
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The post id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Post'
     *    responses:
     *       200:
     *         description: This will create post
     *
     */
    case 'PUT':
      try {
        const post = await Post.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!post) {
          res.status(401).json({ success: false, message: 'Data not found' });
        }
        res.status(200).json({ success: true, data: post });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    /**
     * @swagger
     * /api/v1/posts/{id}:
     *  delete:
     *    description: Delete Post
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: The post id
     *    responses:
     *       200:
     *         description: This will create post
     *
     */
    case 'DELETE':
      try {
        await Post.findByIdAndRemove(id);
        res.status(200).json({ success: true });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
