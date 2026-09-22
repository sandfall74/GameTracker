import express from "express";
import axios from "axios";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = Number(process.env.PORT || 3001);
const RAWG_API_KEY = process.env.RAWG_API_KEY;

if (!RAWG_API_KEY) {
  console.warn("[RAWG] Faltó RAWG_API_KEY en el archivo .env");
}

app.use(cors());

app.use("/rawg", async (req, res) => {
  if (!RAWG_API_KEY) {
    return res.status(500).json({
      error: "RAWG_API_KEY no está configurada en el servidor.",
    });
  }

  try {
    const rawPath = req.originalUrl.replace(/^\/rawg/, "").replace(/^\/+/, "");
    const url = rawPath ? `https://api.rawg.io/api/${rawPath}` : "https://api.rawg.io/api";
    const { data, status } = await axios.get(url, {
      params: {
        ...req.query,
        key: RAWG_API_KEY,
      },
      validateStatus: () => true,
    });

    return res.status(status).json(data);
  } catch (error) {
    console.error("[RAWG] Error al consultar la API:", error);
    return res.status(500).json({
      error: "No se pudo obtener la información de RAWG.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`[RAWG proxy] escuchando en https://gametrackerap.netlify.app:${PORT}`);
});
