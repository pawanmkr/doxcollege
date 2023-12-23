import { QueryResultRow } from "pg";
import client from "../db.js";

export class PostNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PostNotFoundError";
  }
}

export class Document {
  static async createDocumentTable(): Promise<void> {
    const query = `
      CREATE TABLE
        IF NOT EXISTS document (
          id SERIAL PRIMARY KEY,
          title VARCHAR(40),
          description TEXT,
          year INTEGER,
          price INTEGER DEFAULT 0,
          created_by INTEGER,
          created_at TIMESTAMP DEFAULT NOW(),
          CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES users (id) ON DELETE CASCADE
      );
    `;
    try {
      await client.query(query);
    } catch (error) {
      console.error("Error creating Document table:", error);
    }
  }

  static async checkDocumentOwner(userId: number, documentId: number): Promise<boolean> {
    const { rows } = await client.query(`SELECT * FROM document WHERE created_by=$1`, [userId]);

    if (rows.length == 0) {
      throw new PostNotFoundError("The document does not exists.");
    } else if (rows[0].id === documentId) {
      return true;
    } else {
      return false;
    }
  }

  static async addDocument(
    title: string,
    description: string,
    year: number,
    price: number,
    created_by: number
  ): Promise<QueryResultRow> {
    try {
      const query = `
        INSERT INTO document (title, description, year, price, created_by)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `;
      const values = [title, description, year, price, created_by];

      const { rows } = await client.query(query, values);
      return rows[0];
    } catch (error) {
      console.error("Error adding document:", error);
    }
  }

  static async updateDocument(
    updates: {},
    id: number
  ): Promise<QueryResultRow> {

    let updateCols: (string | number)[] = Object.keys(updates);

    let cols: string;
    for (let i = 0; i < updateCols.length; i++) {
      if (i === 0) {
        cols = `${updateCols[i]}=$${i + 1}`;
      } else {
        cols += `,${updateCols[i]}=$${i + 1}`;
      }
    }

    updateCols = updateCols.map(col => {
      return updates[col];
    })

    updateCols.push(id);
    const query = `UPDATE document SET ${cols} WHERE id=$${updateCols.length} RETURNING *`;

    try {
      const { rows } = await client.query(query, updateCols);
      return rows[0];
    } catch (error) {
      console.error("Error adding document:", error);
    }
  }

  static async deleteDocument(documentId: number): Promise<void> {
    try {
      if (!documentId) {
        throw new Error("Document ID is required.");
      }

      const query = `DELETE FROM document WHERE id = $1;`;
      const values = [documentId];

      await client.query(query, values);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  }

  static async getDocumentById(documentId: number): Promise<any> {
    const query = `
      SELECT * FROM document
      WHERE id = $1;
    `;
    const values = [documentId];

    const { rows } = await client.query(query, values);
    return rows[0];
  }

  static async getDocuments(
    page: number,
    limit: number,
    sortBy: string,
    sortDir: string
  ): Promise<any[]> {
    const offset = (page - 1) * limit;
    const query = `
      SELECT * FROM document
      ORDER BY ${sortBy} ${sortDir}
      LIMIT $1 OFFSET $2;
    `;
    const values = [limit, offset];

    const { rows } = await client.query(query, values);
    return rows;
  }
}
