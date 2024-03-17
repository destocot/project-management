import { Outlet } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <Grid
      templateColumns="repeat(6, 1fr)"
      minH="100vh"
      templateRows={{ base: "125px 1fr", lg: "1fr" }}
    >
      <GridItem colSpan={{ base: 6, lg: 1 }} as="aside" p={4} bg={"blue.500"}>
        <Sidebar />
      </GridItem>
      <GridItem colSpan={{ base: 6, lg: 5 }} as="main" p={4}>
        <Navbar />
        <Outlet />
      </GridItem>
    </Grid>
  );
}
