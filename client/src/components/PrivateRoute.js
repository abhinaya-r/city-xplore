// import React, { useContext } from "react";
// import { Route, Navigate } from "react-router-dom";

// const PrivateRoute = ({ component: RouteComponent, token, ...rest }) => {
//   const { isLoggedIn } = token;
//   return (
//     <Route
//       {...rest}
//       render={(routeProps) =>
//         !!currentUser ? (
//           <RouteComponent {...routeProps} />
//         ) : (
//           <Navigate to={"/login"} />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;
