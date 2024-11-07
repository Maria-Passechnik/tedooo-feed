export interface FeedItemInterface {
  avatar: string;
  comments: number;
  date: string;
  didLike: boolean;
  id: string;
  images: Array<string>;
  likes: number;
  premium: boolean;
  shopId: string;
  shopName: string;
  text: string;
  userId: string;
  username: string;
}

export interface FeedResponse {
  data: FeedItemInterface[];
  hasMore: boolean;
}
