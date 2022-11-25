import request from 'supertest'
import { app } from '../../app'

it('return 400 when signing in with unregistered email', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'unregistered@unregistered.com',
      password: 'test1234'
    })
    .expect(400)
})

it('returns 400 with wrong password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'test1234' })
    .expect(201)
  return request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'wrongPassword' })
    .expect(400)
})

it('sets a cookie after succesful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'test1234' })
    .expect(201)

  const response = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'test1234' })
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})
