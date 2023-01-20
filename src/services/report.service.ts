import http from "./../http-common";

class ReportService {
  create(data: any): Promise<any> {
    return http.post("/report", data);
  }
}

export default new ReportService();
