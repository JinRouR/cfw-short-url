# 🚀 URL Shortener

A simple yet powerful URL shortening service built with Hono and Cloudflare Workers.

## ✨ Features

- 🔗 Quickly generate short URLs
- 🌐 Leverage Cloudflare's global network
- 🔒 Secure URL validation
- 💅 Beautiful user interface
- ⚡ AJAX operations for a smooth user experience

## 🛠️ Tech Stack

- [Hono](https://hono.dev/) - Lightweight web framework
- [Cloudflare Workers](https://workers.cloudflare.com/) - Edge computing platform
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation
- [nanoid](https://github.com/ai/nanoid) - Small, secure, URL-friendly unique string ID generator

## 🚀 Quick Start

1. Clone the repository:
   ```
   git clone https://github.com/searchImage/cfw-short-url.git
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Set up Cloudflare Workers:
   - Create a new Worker in the Cloudflare dashboard
   - Create a KV namespace named "URL_MAPPINGS"

4. Configure `wrangler.toml`:
   ```toml
   kv_namespaces = [
     { binding = "URL_MAPPINGS", id = "your-kv-namespace-id" }
   ]
   ```

5. Deploy to Cloudflare Workers:
   ```
   wrangler publish
   ```

## 🖥️ Usage

1. Visit your deployed Worker URL
2. Enter the URL you want to shorten in the input field
3. Click the "Shorten" button
4. Copy the generated short URL and use it

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to [open an issue](https://github.com/searchImage/cfw-short-url/issues) or submit a Pull Request.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- Thanks to the [Hono](https://hono.dev/) team for the excellent web framework
- Thanks to [Cloudflare](https://www.cloudflare.com/) for providing a powerful edge computing platform

---

⭐ If you found this project helpful, consider giving it a star!
