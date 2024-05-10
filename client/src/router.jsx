import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
import CreateEvent from "./components/CreateEvent";
import SingleEvent from "./components/SingleEvent";
import UpdateEvent from "./components/UpdateEvent";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailed from "./components/PaymentFailed";
import MyEvents from "./components/MyEvents";
import About from "./components/About";
export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "/login",
      //   element: <Login />,
      // },
      // {
      //   path: "/register",
      //   element: <Register />,
      // },
      {
        path: "/create-event",
        element: <CreateEvent />,
      },
      {
        path: "/update-event",
        element: <UpdateEvent />,
      },
      {
        path: "/event/:id",
        element: <SingleEvent />,
      },
      {
        path: "/event/ticket/payment-success/:eventId",
        element: <PaymentSuccess />,
      },
      {
        path: "/event/ticket/payment-failed/:eventId",
        element: <PaymentFailed />,
      },
      {
        path: "/myevents",
        element: <MyEvents />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

function NavLayout() {
  //   const { colorMode } = useColorMode();

  return (
    <>
      <div className="w-full">
        <Toaster
          toastOptions={{
            style: {
              fontSize: "1.1rem",
            },
          }}
        />
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
