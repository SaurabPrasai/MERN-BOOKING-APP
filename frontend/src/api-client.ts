import { LoginFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";
import { HotelType } from "../../backend/src/models/hotel";
import {HotelSearchResponse} from '../../backend/src/routes/hotel'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/user/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.msg);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid token");
  }
  return response.json();
};

export const login = async (formData: LoginFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  console.log(responseBody);
  if (!response.ok) {
    throw new Error(responseBody.msg);
  }
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
  });
  const resBody = await response.json();
  if (!response.ok) {
    throw new Error(resBody.msg);
  }
  return resBody;
};

// My hotel

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });
  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }
  return response.json();
};

// get hotels
export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch hotels");
  }
  return response.json();
};

//get hotel
export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Error fetching hotels");
  }

  return res.json();
};

// edit hotel
export const updateMyHotelById = async (hotelFormData: FormData) => {
  const res = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
     method: "PUT",
     body: hotelFormData,
     credentials: "include",
   });

   if(!res.ok){
     throw new Error("Failed to update hotel")
 }

 return res.json()
};



export type SearchParams={
  destination?:string,
  checkIn?:Date,
  checkOut?:Date,
  adultCount?:number,
  childCount?:number,
  page?:string;
}


export const searchHotels=async(searchParams:SearchParams):Promise<HotelSearchResponse>=>{
    const queryParams=new URLSearchParams();
    queryParams.append("destination",searchParams.destination||"");
    queryParams.append("checkIn",searchParams.checkIn||"");
    queryParams.append("checkOut",searchParams.checkOut||"");
    queryParams.append("adultCount",searchParams.adultCount||"");
    queryParams.append("childCount",searchParams.childCount||"");
    queryParams.append("page",searchParams.page||"");


  const response=await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`)
    if(!response.ok){
      throw new Error("Failed to search hotels")
    }

    return response.json();

}


