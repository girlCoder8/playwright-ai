import { test, expect, request } from '@playwright/test'

test.describe.parallel('API Testing', () => {
  const baseUrl = 'https://reqres.in/api'

  test('Simple API Test - Assert Response Status', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/3`)
    expect(response.status()).toBe(200)

    const responseBody = JSON.parse(await response.text())
  })

  test('Simple API Test - Assert Invalid Endpoint', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/2sadsadsad`)
    expect(response.status()).toBe(404)
  })

  test('GET Request - Get User Detail', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/1`)
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(1)
    expect(responseBody.data.first_name).toBe('George')
    expect(responseBody.data.email).toBeTruthy()
  })

  test('POST Request - Create New User', async ({ request }) => {
    const newName = 'morpheus'
    const response = await request.post(`${baseUrl}/users/`, {
      data: {
        name: newName,
        job: 'leader',
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(201)
    expect(responseBody.name).toBe(newName)
  })

  test('POST Request - Login', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.token).toBeTruthy()
  })

  test('POST Request - Login failed', async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
      data: {
        email: 'eve.holt@reqres.in',
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(400)
    expect(responseBody.error).toBe('Missing password')
  })

  test('PUT Request - Update user', async ({ request }) => {
    const response = await request.put(`${baseUrl}/users/2`, {
      data: {
        name: 'new name',
        job: 'new job',
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.name).toBe('new name')
    expect(responseBody.job).toBe('new job')
    expect(responseBody.updatedAt).toBeTruthy()
  })

  test('DELETE Request - Delete user', async ({ request }) => {
    const response = await request.delete(`${baseUrl}/users/2`)
    expect(response.status()).toBe(204)
  })
  
  test('GET Request - List Users (Pagination)', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users?page=2`)
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(Array.isArray(responseBody.data)).toBe(true)
    expect(responseBody.page).toBe(2)
  })

  test('GET Request - Non-existent User', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/9999`)
    expect(response.status()).toBe(404)
  })

  test('POST Request - Register Success', async ({ request }) => {
    const response = await request.post(`${baseUrl}/register`, {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'pistol',
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.token).toBeTruthy()
    expect(responseBody.id).toBeTruthy()
  })

  test('POST Request - Register Failure', async ({ request }) => {
    const response = await request.post(`${baseUrl}/register`, {
      data: {
        email: 'sydney@fife',
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(400)
    expect(responseBody.error).toBe('Missing password')
  })

  test('PATCH Request - Update user', async ({ request }) => {
    const response = await request.patch(`${baseUrl}/users/2`, {
      data: {
        name: 'patched name',
        job: 'patched job',
      },
    })
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.name).toBe('patched name')
    expect(responseBody.job).toBe('patched job')
    expect(responseBody.updatedAt).toBeTruthy()
  })

  test('GET Request - Delayed Response', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users?delay=3`)
    const responseBody = JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(Array.isArray(responseBody.data)).toBe(true)
  })
})
