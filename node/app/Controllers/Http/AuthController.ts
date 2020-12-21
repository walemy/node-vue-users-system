import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator'
import User from 'App/Models/User'

export default class AuthController {
  /**
   * @swagger
   * /v1/register:
   *   post:
   *     tags:
   *       - Register
   *     description: Register new user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             allOf:
   *                 - $ref: "#/definitions/schemas/UserWithoutId"
   *                 - type: object
   *                 - properties:
   *                    password_confirmation:
   *                      type: integer
   *                      description: The user password confirmation
   *                      example: '123456'
   *     responses:
   *       200:
   *         description: Newly created user.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: "#/definitions/schemas/User"
   *       422:
   *         description: Validation errors.
   *         example:
   *           message: Hello Guess (temporary)
   */
  public async register({ request }: HttpContextContract) {
    const userData = await request.validate(UserValidator)
    return await User.create(userData)
  }
  /**
   * @swagger
   * /v1/login:
   *   post:
   *     tags:
   *       - Login
   *     description: Login a user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *                 description: User's email
   *                 example: admin@admin.admin
   *               password:
   *                 type: integer
   *                 description: User's password
   *                 example: '123456'
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Get token
   *         content:
   *           application/json:
   *             schema:
   *               properties:
   *                 type:
   *                   type: sting
   *                   description: Token type
   *                   example: Bearer
   *                 token:
   *                   type: sting
   *                   description: Token
   *                   example: Y2tpejNvZWljMDAwMHg2bGgwdXh4aGdlZQ.gX2pd7zHYKAdOCl17mJd9PJWRZsN_52zxz0HDnrLNi4_lqy3NT3iqxRa5LWz
   *       400:
   *         description: authentication failed
   */
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const token = await auth.use('api').attempt(email, password)
    return token.toJSON()
  }
}
