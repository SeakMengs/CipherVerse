import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ThemeProvider } from "./components/theme-provider";
import BackLayout from "@/ui/BackLayout";
import Loading from "@/ui/Loading";
import Layout from "./ui/Layout";
import { Toaster } from "./components/ui/toaster";

const Home = lazy(() => import("@/ui/Home"));
const NoMatch = lazy(() => import("@/ui/NoMatch"));
const Text = lazy(() => import("@/ui/Text"));
const Image = lazy(() => import("@/ui/Image"));
const Video = lazy(() => import("@/ui/Video"));
const Audio = lazy(() => import("@/ui/Audio"));

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="cipher-verse-theme">
      <Layout key={crypto.randomUUID()}>
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
                <BackLayout>
                  <Text />
                </BackLayout>
              </Suspense>
            } />
            <Route path="/image" element={
              <Suspense fallback={<Loading />}>
                <BackLayout>
                  <Image />
                </BackLayout>
              </Suspense>
            } />
            <Route path="/video" element={
              <Suspense fallback={<Loading />}>
                <BackLayout>
                  <Video />
                </BackLayout>
              </Suspense>
            } />
            <Route path="/audio" element={
              <Suspense fallback={<Loading />}>
                <BackLayout>
                  <Audio />
                </BackLayout>
              </Suspense>
            } />
          </Routes>
        </Router>
      </Layout>
      <Toaster />
    </ThemeProvider>
  );
}

export default App
