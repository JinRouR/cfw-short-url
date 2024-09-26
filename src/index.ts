import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { nanoid } from 'nanoid'
import { z } from 'zod'

interface Env {
  URL_MAPPINGS: KVNamespace
}

const app = new Hono<{ Bindings: Env }>()

// URL 验证 schema
const urlSchema = z.string().url()

// base auth middleware
app.use("/", basicAuth({
  username: 'admin',
  password: "admin"
}))

// 主页路由
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>URL Shortener</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f0f0f0;
            }
            .container {
                background-color: white;
                padding: 2rem;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
                margin-bottom: 1rem;
            }
            form {
                display: flex;
                flex-direction: column;
            }
            input[type="url"] {
                padding: 0.5rem;
                margin-bottom: 1rem;
                border: 1px solid #ddd;
                border-radius: 4px;
            }
            button {
                padding: 0.5rem 1rem;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            button:hover {
                background-color: #0056b3;
            }
            #result {
                margin-top: 1rem;
                word-break: break-all;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>URL Shortener</h1>
            <form id="shortenForm">
                <input type="url" id="urlInput" placeholder="Enter URL to shorten" required>
                <button type="submit">Shorten</button>
            </form>
            <div id="result"></div>
        </div>
        <script>
            document.getElementById('shortenForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const url = document.getElementById('urlInput').value;
                const response = await fetch('/shorten', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url }),
                });
                const result = await response.json();
                if (response.ok) {
                    document.getElementById('result').innerHTML = 'Shortened URL: <a href="' + result.shortUrl + '" target="_blank">' + result.shortUrl + '</a>';
                } else {
                    document.getElementById('result').textContent = result.error || 'An error occurred';
                }
            });
        </script>
    </body>
    </html>
  `)
})

// 处理 URL 缩短请求
app.post('/shorten', async (c) => {
  const { url } = await c.req.json()

  try {
    urlSchema.parse(url)
  } catch (error) {
    return c.json({ error: 'Invalid URL' }, 400)
  }

  const shortId = nanoid(7)
  await c.env.URL_MAPPINGS.put(shortId, url)

  const shortUrl = `${new URL(c.req.url).origin}/${shortId}`
  return c.json({ shortUrl })
})

// 处理重定向
app.get('/:id', async (c) => {
  const id = c.req.param('id')
  const url = await c.env.URL_MAPPINGS.get(id)

  if (!url) {
    return c.text('URL not found', 404)
  }

  return c.redirect(url)
})

export default app