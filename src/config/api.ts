import axios from "axios";
import { FeedResponse } from "../common/types";

export const fetchFeedItems = async (skip = 0): Promise<FeedResponse> => {
  try {
    const response = await axios.get<FeedResponse>(
      `${process.env.REACT_APP_API_BASE_URL}hw/feed.json?skip=${skip}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch feed items");
  }
};

export const sendImpression = async (itemId: string) => {
  try {
    await axios.get(`${process.env.REACT_APP_API_BASE_URL}?itemId=${itemId}`);
  } catch (error) {
    throw new Error("Failed to send impression");
  }
};
