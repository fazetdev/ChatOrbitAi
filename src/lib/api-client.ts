export type ApiResponse<T> = {
  data: T;
  error?: string;
};

class ApiClient {
  private baseUrl = "";

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || "";
  }

  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(this.baseUrl + url);
      const data = await res.json();
      return { data };
    } catch (err: any) {
      return { data: null as T, error: err.message };
    }
  }

  async post<T>(url: string, body: any): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(this.baseUrl + url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      return { data };
    } catch (err: any) {
      return { data: null as T, error: err.message };
    }
  }

  async put<T>(url: string, body: any): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(this.baseUrl + url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      return { data };
    } catch (err: any) {
      return { data: null as T, error: err.message };
    }
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(this.baseUrl + url, {
        method: "DELETE",
      });

      const data = await res.json();
      return { data };
    } catch (err: any) {
      return { data: null as T, error: err.message };
    }
  }
}

export const apiClient = new ApiClient();
