// import { BrowserRouter } from 'react-router-dom';
// import { Route, Routes } from 'react-router-dom';
// import HomeLayout from './components/common/layouts/HomeLayout';
// import Group from './pages/Group';
// import Profile from './pages/Profile';
// import GroupMainView from './components/group/GroupMainView';

// const routes = () => {
//     return (
//       <BrowserRouter>
//         <Routes>
//           {/* Header,Footer,Nav을 보여주고 싶은 컴포넌트 */}
//           <Route element={<HomeLayout />}>
//             <Route path="/" element={<Group />} />
//             <Route path="/" element={<Profile />} />
//           </Route>
//           {/* Header,Footer,Nav을 안 보여주고 싶은 컴포넌트 */}
//           {/* <Route path="/sign-up" element={<SignUpPage />} />
//           <Route path="/login" element={<LoginPage />} /> */}
//           <Route path="/GroupMainView" element={<GroupMainView />} />
//         </Routes>
//       </BrowserRouter>
//     );
//   };