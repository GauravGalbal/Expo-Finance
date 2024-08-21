// types.ts
export interface User {
  uid: string;
  email: string | null;
  experienceLevel: string;
  users?: string;
}

interface AuthTokens {
  token: string;
}

interface Step1 {
  ageRange: string;
  country: string;
  username: string;
}

interface Step2 {
  experienceLevel: string;
}
interface UserObj {
  authTokens: AuthTokens;
  step1?: Step1;
  step2?: Step2;
}
interface Users {
  [key: string]: UserObj;
}

// Example of using the Users interface to represent the given JSON structure
// const users: Users = {
//   "uAsZUCEDd8ZoY6MgefaPQGqsMPZ2": {
//     authTokens: {
//       token: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxNTQwYWM3MWJiOTJhYTA2OTNjODI3MTkwYWNhYmU1YjA1NWNiZWMiLCJ0eXAiOiJKV1QifQ."
//     }
//   },
//   "xQjH9HzVhyLCyrnPu3yJxFBZWrl2": {
//     authTokens: {
//       token: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxNTQwYWM3MWJiOTJhYTA2OTNjODI3MTkwYWNhYmU1YjA1NWNiZWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20va29ycmEtb2ZmaWNpYWwiLCJhdWQiOiJrb3JyYS1vZmZpY2lhbCIsImF1dGhfdGltZSI6MTc"
//     },
//     step1: {
//       ageRange: "46+",
//       country: "UK",
//       username: "Master K"
//     },
//     step2: {
//       experienceLevel: "Beginner"
//     }
//   }
// };
