import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import calendar from "../assets/calendar.png";
import todoList from "../assets/todolist.png";
import useIsMobile from "../hooks/useIsMobile";
import { COLOR } from "../style/constants";

const Home = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: isMobile ? 5 : 0,
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            fontWeight={600}
            variant={isMobile ? "h6" : "h2"}
            letterSpacing={-3}
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
          >
            우리는 무엇을{" "}
            <span
              style={{
                background: `linear-gradient(70deg,#ff5576 30%, #e63d5f 60%, #cf364d 90%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              함께
            </span>{" "}
            만들까요?
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: isMobile ? 2 : 5,
          }}
        >
          <Typography
            variant={isMobile ? "body1" : "h6"}
            fontSize={isMobile ? 10 : 20}
            color={COLOR.darkgray}
          >
            CC와 함께 일정을 정리하고 소중한 추억을 캘린더에 담아보세요.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              paddingTop: "100%",
            }}
          >
            <Button
              fullWidth
              sx={{
                position: "absolute",
                padding: 0,
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.4)",
                  transform: "translateY(-4px)",
                },
              }}
              onClick={() => navigate("/todoList")}
            >
              <img
                src={todoList}
                loading="lazy"
                style={{ width: "100%", height: "100%", borderRadius: "8px" }}
              />
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              paddingTop: "100%",
            }}
          >
            <Button
              fullWidth
              sx={{
                position: "absolute",
                padding: 0,
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.4)",
                  transform: "translateY(-4px)",
                },
              }}
              onClick={() => navigate("/calendar")}
            >
              <img
                src={calendar}
                loading="lazy"
                style={{ width: "100%", height: "100%", borderRadius: "8px" }}
              />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
