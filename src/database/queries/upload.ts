import { QueryResultRow } from "pg";
import client from "../../config/db.js";

export class Upload {
  static async createUploadTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS uploads (
        id SERIAL PRIMARY KEY,
        name TEXT,
        url TEXT,
        mimetype TEXT,
        document INTEGER,
        created_at TIMESTAMP DEFAULT NOW(),
        CONSTRAINT fk_document FOREIGN KEY (document) REFERENCES document (id) ON DELETE CASCADE
      );
    `;
    try {
      await client.query(query);
    } catch (error) {
      console.error("Error creating upload table:", error);
    }
  }

  static async addUpload(
    name: string,
    url: string,
    mimetype: string,
    documentId: number,
  ): Promise<QueryResultRow> {
    try {
      const query = `
        INSERT INTO uploads (name, url, mimetype, document) VALUES ($1, $2, $3, $4) RETURNING *;
      `;
      const values = [name, url, mimetype, documentId];

      const { rows } = await client.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error adding upload:", error);
    }
  }
}
