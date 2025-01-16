import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNGQ2ZjJmMTYyMThmNzZjZmQ0ZTgwNWNhYzZlN2M2YyIsIm5iZiI6MTczMjcxNTExMi44MjA4ODYxLCJzdWIiOiI2NzQ3MjBmOTMwMWZiNGY2YjYxN2E1ZDQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BDxKaBKOPRRTz5JLeJKB8hANTIPLk9sqedGBqTuMV98",
      // import.meta.env.VITE_REACT_APP_TOKEN
  },
});

export default instance
