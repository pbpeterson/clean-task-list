import { styled, keyframes } from "@stitches/react";

const animation = keyframes({
  "0%": { translate: "0 -2rem" },
  "100%": { translate: "0 0" },
});

export const Wrapper = styled("div", {
  margin: "2rem auto",
  display: "flex",
  justifyContent: "center",
  gap: "3rem",
  padding: "1rem",
});

export const WrapperTodo = styled("div", {
  maxWidth: "25rem",
  flex: "1",
  display: "flex",
  borderRadius: "1rem",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "2rem",
  background: "white",
});

export const Input = styled("input", {
  "&:focus": {
    outline: "none",
  },
  width: "15rem",
  marginTop: "1rem",
  fontSize: "1rem",
  padding: ".5rem .5rem",
});

export const Title = styled("h1", {
  fontSize: "2rem",
  color: "#121212",
  textAlign: "center",
});

export const TasksWrapper = styled("div", {
  marginTop: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: ".5rem",
});

export const TaskWrapper = styled("div", {
  width: "15rem",
  padding: ".8rem .5rem",
  background: "#f2f2f2",
  display: "flex",
  justifyContent: "space-between",
  animation: `${animation} .5s`,
});

export const RemoveTask = styled("div", {
  cursor: "pointer",
  width: "1.2rem",
  height: "1.2rem",
  borderRadius: "100%",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "red",
});

export const TaskContent = styled("p", {
  fontSize: "1rem",
  width: "12rem",
  overflow: "hidden",
  marginRight: "1rem",
  textOverflow: "ellipsis",
});

export const TaskDescriptionWrapper = styled("div", {
  display: "flex",
  width: "15rem",
  flex: "1",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "1.5rem",
});

export const TaskDescription = styled("p", {
  fontSize: "0.8rem",
  fontWeight: "bold",
});

export const ClearAllButton = styled("button", {
  fontSize: "1rem",
  cursor: "pointer",
  fontWeight: "bold",
  color: "white",
  background: "#a601e1",
  border: "none",
  padding: ".5rem",
  borderRadius: ".3rem",
});
