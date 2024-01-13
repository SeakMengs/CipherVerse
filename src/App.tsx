import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ThemeProvider } from "./components/theme-provider";
import Layout from "@/ui/Layout";
import Loading from "@/ui/Loading";

const Home = lazy(() => import("@/ui/Home"));
const NoMatch = lazy(() => import("@/ui/NoMatch"));
const Text = lazy(() => import("@/ui/Text"));
const Image = lazy(() => import("@/ui/Image"));
const Video = lazy(() => import("@/ui/Video"));
const Audio = lazy(() => import("@/ui/Audio"));

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="cipher-verse-theme">
      <Router>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<Loading />}>
              <NoMatch />
            </Suspense>
          } />
          <Route path="/text" element={
            <Suspense fallback={<Loading />}>
              <Layout>
                <Text />
              </Layout>
            </Suspense>
          } />
          <Route path="/image" element={
            <Suspense fallback={<Loading />}>
              <Layout>
                <Image />
              </Layout>
            </Suspense>
          } />
          <Route path="/video" element={
            <Suspense fallback={<Loading />}>
              <Layout>
                <Video />
              </Layout>
            </Suspense>
          } />
          <Route path="/audio" element={
            <Suspense fallback={<Loading />}>
              <Layout>
                <Audio />
              </Layout>
            </Suspense>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App
