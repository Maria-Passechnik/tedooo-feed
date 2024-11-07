import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

import { FeedItemInterface } from "../../common/types";
import { Button } from "../common/Button";

import classes from "./FeedItem.module.css";

interface FeedItemProps {
  item: FeedItemInterface;
  onImpression: (itemId: string) => void;
}

export const FeedItem: React.FC<FeedItemProps> = ({ item, onImpression }) => {
  const [likes, setLikes] = useState(item.likes);
  const [isLiked, setIsLiked] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery("(max-width:800px)");

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onImpression(item.id);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [item.id, onImpression]);

  return (
    <Card
      ref={ref}
      sx={{ width: "80%", margin: "0 auto" }}
      className={classes.feedItem}
    >
      <CardContent sx={{ padding: "0" }}>
        <Box className={classes.detailsContainer}>
          <Box className={classes.shopContainer}>
            <Avatar src={item.avatar} sx={{ width: "40px", height: "40px" }} />
            <Box>
              <Typography className={classes.username}>
                {item.username}
              </Typography>
              <Typography className={classes.shopName}>
                {item.shopName}
              </Typography>
            </Box>
          </Box>
          <Typography className={classes.description}>{item.text}</Typography>
        </Box>

        <Box
          className={`${classes.imagesContainer} ${
            item.images.length === 1 ? classes.singleImage : classes.twoImages
          }`}
        >
          {item.images.slice(0, isMobile ? 1 : 2).map((img, index) => (
            <img
              key={index}
              src={img}
              alt="post"
              className={classes.feedImage}
              loading="lazy"
            />
          ))}
        </Box>

        <Box className={classes.countsContainer}>
          <Box display="flex" alignItems="center">
            <ThumbUpAltIcon className={classes.icon} />
            <Typography className={classes.countsText}>
              {likes} Likes
            </Typography>
          </Box>
          <Typography className={classes.countsText}>
            {item.comments} Comments
          </Typography>
        </Box>
      </CardContent>
      <Divider variant="middle" />
      <CardActions className={classes.actionsContainer}>
        <Button
          onClick={handleLike}
          className={`${isLiked ? classes.unlikedBtn : classes.likedBtn}`}
        >
          <ThumbUpOffAltIcon
            className={`${isLiked ? classes.unlikedIcon : classes.likeIcon}`}
          />
          Like
        </Button>
        <Button className={classes.commentBtn}>
          <ChatBubbleOutlineIcon className={classes.likeIcon} />
          Comment
        </Button>
      </CardActions>
    </Card>
  );
};
