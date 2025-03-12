import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:8080/api/courses";

export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  students: any[];
}

class CourseService {
  private getToken(): string {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user).token : "";
  }

  // 新增課程
  post(
    title: string,
    description: string,
    price: number
  ): Promise<AxiosResponse<Course>> {
    const token = this.getToken();
    return axios.post(
      API_URL,
      { title, description, price },
      {
        headers: { Authorization: token },
      }
    );
  }

  // 取得學生已選課程 (回傳 Course[])
  getEnrolledCourses(_id: string): Promise<AxiosResponse<Course[]>> {
    const token = this.getToken();
    return axios.get(`${API_URL}/student/${_id}`, {
      headers: { Authorization: token },
    });
  }

  // 取得講師開設的所有課程 (回傳 Course[])
  get(_id: string): Promise<AxiosResponse<Course[]>> {
    const token = this.getToken();
    return axios.get(`${API_URL}/instructor/${_id}`, {
      headers: { Authorization: token },
    });
  }

  // 根據課程名稱查詢課程 (回傳 Course[])
  getCourseByName(name: string): Promise<AxiosResponse<Course[]>> {
    const token = this.getToken();
    return axios.get(`${API_URL}/findByName/${name}`, {
      headers: { Authorization: token },
    });
  }

  // 報名課程 (回傳任意成功訊息或回應物件)
  enroll(_id: string): Promise<AxiosResponse<any>> {
    const token = this.getToken();
    return axios.post(
      `${API_URL}/enroll/${_id}`,
      {},
      {
        headers: { Authorization: token },
      }
    );
  }
}

export default new CourseService();
