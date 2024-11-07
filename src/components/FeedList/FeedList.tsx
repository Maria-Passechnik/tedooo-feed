import React, { useCallback, useRef, useState } from "react";
import { fetchFeedItems, sendImpression } from "../../config/api";
import { FeedItemInterface } from "../../common/types";
import { FeedItem } from "../FeedItem/FeedItem";
import classes from "./FeedList.module.css";

const ITEMS_PER_LOAD = 6;

export const FeedList: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItemInterface[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const viewedItems = useRef<Set<string>>(new Set());

  const loadMoreItems = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const { data, hasMore } = await fetchFeedItems(skip);
      setFeedItems((prev) => [...prev, ...data]);
      setHasMore(hasMore);
      setSkip((prev) => prev + ITEMS_PER_LOAD);
    } catch (error) {
      console.error("Failed to load more items:", error);
    } finally {
      setIsLoading(false);
    }
  }, [skip, hasMore, isLoading]);

  const loadingRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreItems();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadMoreItems, hasMore, isLoading]
  );

  const handleImpression = async (itemId: string) => {
    if (!viewedItems.current.has(itemId)) {
      viewedItems.current.add(itemId);
      try {
        await sendImpression(itemId);
      } catch (error) {
        console.error("Failed to send impression:", error);
      }
    }
  };

  return (
    <div className={classes.feedListContainer}>
      {feedItems.map((item) => (
        <FeedItem key={item.id} item={item} onImpression={handleImpression} />
      ))}
      {isLoading && <p>Loading...</p>}
      <div ref={loadingRef} style={{ height: "20px" }}></div>
      {!hasMore && <p>No more items to load</p>}
    </div>
  );
};
