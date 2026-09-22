export async function handler(event) {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    }
  }

  const apiKey = process.env.RAWG_API_KEY

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "RAWG_API_KEY no está configurada en Netlify.",
      }),
    }
  }

  const incomingPath = event.path || "/"
  const pathWithoutFunction = incomingPath
    .replace(/^\/\.netlify\/functions\/rawg/, "")
    .replace(/^\/api\/rawg/, "")
    .replace(/^\/+/, "")

  const targetPath = pathWithoutFunction ? `/${pathWithoutFunction}` : ""
  const query = new URLSearchParams(event.queryStringParameters || {})
  query.set("key", apiKey)

  const url = `https://api.rawg.io/api${targetPath}?${query.toString()}`

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    })

    const contentType = response.headers.get("content-type") || "application/json"
    const body = await response.text()

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
      },
      body,
    }
  } catch (error) {
    console.error("[RAWG Netlify Function] Error:", error)

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "No se pudo conectar con RAWG.",
      }),
    }
  }
}
